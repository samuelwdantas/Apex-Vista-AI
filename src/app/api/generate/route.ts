import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    // Get current user session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    
    if (sessionError || !session) {
      return NextResponse.json(
        { error: 'Unauthorized - Please login first' },
        { status: 401 }
      )
    }
    
    const userId = session.user.id
    const { userInput, outputType } = await request.json()
    
    if (!userInput || !outputType) {
      return NextResponse.json(
        { error: 'Missing required fields: userInput and outputType' },
        { status: 400 }
      )
    }
    
    // Check user subscription status
    const { data: user } = await supabase
      .from('users')
      .select('subscription_status')
      .eq('id', userId)
      .single()
    
    if (!user || user.subscription_status !== 'active') {
      return NextResponse.json(
        { error: 'Active subscription required. Please upgrade your plan.' },
        { status: 403 }
      )
    }
    
    // Check current month usage
    const currentMonth = new Date().toISOString().slice(0, 7) // YYYY-MM
    
    let { data: usage } = await supabase
      .from('usage')
      .select('asset_count')
      .eq('user_id', userId)
      .eq('month_year', currentMonth)
      .single()
    
    // Create usage record if doesn't exist
    if (!usage) {
      const { data: newUsage, error: usageError } = await supabase
        .from('usage')
        .insert({
          user_id: userId,
          month_year: currentMonth,
          asset_count: 0
        })
        .select()
        .single()
      
      if (usageError) {
        console.error('Error creating usage record:', usageError)
        return NextResponse.json(
          { error: 'Failed to track usage' },
          { status: 500 }
        )
      }
      
      usage = newUsage
    }
    
    // Check if user has reached monthly limit (50 for $29 plan)
    if (usage.asset_count >= 50) {
      return NextResponse.json(
        { 
          error: 'Monthly limit reached (50/50). Upgrade to unlimited plan or wait for next billing cycle.',
          currentUsage: usage.asset_count,
          limit: 50
        },
        { status: 429 }
      )
    }
    
    // Generate content based on outputType
    let generatedContent = ''
    
    switch (outputType) {
      case 'caption':
        generatedContent = generateCaption(userInput)
        break
      case 'summary':
        generatedContent = generateSummary(userInput)
        break
      case 'hashtags':
        generatedContent = generateHashtags(userInput)
        break
      case 'blog_post':
        generatedContent = generateBlogPost(userInput)
        break
      default:
        return NextResponse.json(
          { error: 'Invalid outputType. Supported: caption, summary, hashtags, blog_post' },
          { status: 400 }
        )
    }
    
    // Save generated content
    const { error: contentError } = await supabase
      .from('generated_content')
      .insert({
        user_id: userId,
        input_text: userInput,
        output_type: outputType,
        generated_content: generatedContent
      })
    
    if (contentError) {
      console.error('Error saving content:', contentError)
    }
    
    // Increment usage count
    const { error: updateError } = await supabase
      .from('usage')
      .update({ 
        asset_count: usage.asset_count + 1,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId)
      .eq('month_year', currentMonth)
    
    if (updateError) {
      console.error('Error updating usage:', updateError)
      return NextResponse.json(
        { error: 'Failed to update usage count' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      success: true,
      content: generatedContent,
      usage: {
        current: usage.asset_count + 1,
        limit: 50,
        remaining: 49 - usage.asset_count
      }
    })
    
  } catch (error) {
    console.error('Generation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Content generation functions (placeholder implementations)
function generateCaption(input: string): string {
  const captions = [
    `🚀 ${input} - Taking your brand to the next level!`,
    `✨ Discover the power of ${input} and transform your business today!`,
    `💡 ${input} - Innovation meets excellence. Ready to make an impact?`,
    `🎯 ${input} - Your success story starts here!`,
    `🌟 ${input} - Where dreams become reality!`
  ]
  
  return captions[Math.floor(Math.random() * captions.length)]
}

function generateSummary(input: string): string {
  return `Summary: ${input}\n\nThis content focuses on delivering value through strategic messaging and engaging storytelling. Key benefits include increased brand awareness, improved customer engagement, and measurable business growth. The approach combines proven marketing principles with innovative digital strategies to maximize impact and ROI.`
}

function generateHashtags(input: string): string {
  const baseHashtags = ['#business', '#marketing', '#growth', '#success', '#innovation', '#digital', '#strategy', '#branding', '#entrepreneur', '#leadership']
  const inputWords = input.toLowerCase().split(' ').filter(word => word.length > 3)
  const customHashtags = inputWords.slice(0, 5).map(word => `#${word.replace(/[^a-zA-Z0-9]/g, '')}`)
  
  return [...customHashtags, ...baseHashtags.slice(0, 10 - customHashtags.length)].join(' ')
}

function generateBlogPost(input: string): string {
  return `# ${input}: A Comprehensive Guide

## Introduction

In today's competitive landscape, ${input} has become more crucial than ever. This comprehensive guide will walk you through everything you need to know to succeed.

## Key Benefits

- **Increased Efficiency**: Streamline your processes and save valuable time
- **Better Results**: Achieve measurable improvements in performance
- **Cost Savings**: Optimize your budget while maximizing impact
- **Competitive Advantage**: Stay ahead of the competition

## Implementation Strategy

1. **Assessment**: Evaluate your current situation
2. **Planning**: Develop a strategic roadmap
3. **Execution**: Implement with precision
4. **Optimization**: Continuously improve and adapt

## Conclusion

${input} represents a significant opportunity for growth and success. By following the strategies outlined in this guide, you'll be well-positioned to achieve your goals and drive meaningful results.

Ready to get started? Take action today and transform your business!`
}