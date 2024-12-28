import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await fetch('https://frontend-api.pump.fun/coins/currently-live?limit=10&offset=0&includeNsfw=true')
    if (!response.ok) {
      throw new Error('Failed to fetch currently live coins')
    }
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching currently live coins:', error)
    return NextResponse.json({ error: 'An error occurred while fetching currently live coins' }, { status: 500 })
  }
}

