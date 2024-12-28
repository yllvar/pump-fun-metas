import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await fetch('https://frontend-api.pump.fun/coins/for-you?limit=10&offset=1&includeNsfw=true')
    if (!response.ok) {
      throw new Error('Failed to fetch coins')
    }
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching coins:', error)
    return NextResponse.json({ error: 'An error occurred while fetching coins' }, { status: 500 })
  }
}

