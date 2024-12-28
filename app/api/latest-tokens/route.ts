import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const res = await fetch('https://frontend-api.pump.fun/coins/latest', {
      headers: {
        'User-Agent': 'YourAppName/1.0',
      },
    })

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching latest tokens:', error)
    return NextResponse.json({ error: 'Failed to fetch latest tokens' }, { status: 500 })
  }
}

