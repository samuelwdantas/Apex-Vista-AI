import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Use public client for less restrictive access
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function GET() {
  try {
    // Create public client
    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    // Try to fetch leads
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Erro ao buscar leads: ' + error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ data }, { status: 200 })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Nome, email e mensagem são obrigatórios' },
        { status: 400 }
      )
    }

    // Create public client
    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    // Try to insert data
    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          name,
          email,
          phone: phone || null,
          message,
          created_at: new Date().toISOString()
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Erro ao salvar lead: ' + error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Lead salvo com sucesso!', data },
      { status: 200 }
    )

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}