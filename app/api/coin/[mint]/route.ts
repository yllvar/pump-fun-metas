import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { mint: string } }
) {
  const mint = params.mint

  try {
    const res = await fetch(`https://frontend-api.pump.fun/coins/${mint}`)
    if (!res.ok) {
      throw new Error('Failed to fetch coin data')
    }
    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching coin data:', error)
    return NextResponse.json({ error: 'An error occurred while fetching coin data' }, { status: 500 })
  }
}

