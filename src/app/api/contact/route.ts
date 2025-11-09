import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Use public client instead of admin for less restrictive access
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

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

    // Create public client (less restrictive than admin)
    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    // Try to insert data - if RLS blocks it, we'll handle the error
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
      
      // If it's an RLS error, try alternative approach
      if (error.message.includes('policy') || error.message.includes('RLS')) {
        console.log('RLS blocking insert, trying alternative approach...')
        
        // Try with a more basic insert
        const { data: altData, error: altError } = await supabase
          .from('leads')
          .insert({
            name,
            email,
            phone: phone || null,
            message
          })

        if (altError) {
          console.error('Alternative insert also failed:', altError)
          return NextResponse.json(
            { error: 'Erro ao salvar contato. Verifique as políticas RLS do banco.' },
            { status: 500 }
          )
        }

        return NextResponse.json(
          { message: 'Contato enviado com sucesso!', data: altData },
          { status: 200 }
        )
      }

      return NextResponse.json(
        { error: 'Erro ao enviar contato: ' + error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Contato enviado com sucesso!', data },
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