import { NextResponse } from 'next/server'
import { MetaItem } from '../../types'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const meta = searchParams.get('meta')
  const includeNsfw = searchParams.get('includeNsfw') === 'true'
  const page = parseInt(searchParams.get('page') || '1', 10)
  const pageSize = 20 // Number of results per page

  if (!meta) {
    return NextResponse.json({ error: 'Meta parameter is required' }, { status: 400 })
  }

  try {
    const res = await fetch(`https://frontend-api.pump.fun/metas/search?meta=${encodeURIComponent(meta)}&includeNsfw=${includeNsfw}`)
    if (!res.ok) {
      const errorText = await res.text()
      console.error('API error:', errorText)
      throw new Error('Failed to fetch search results')
    }
    const data = await res.json()
    
    // Validate and transform the response
    const validatedData: MetaItem[] = data.map((item: any) => ({
      word: String(item.name || ''),
      word_with_strength: String(item.symbol || ''),
      score: typeof item.market_cap === 'number' ? item.market_cap : 0,
      mint: String(item.mint || ''),
      nsfw: Boolean(item.nsfw)
    }))

    const totalResults = validatedData.length
    const totalPages = Math.ceil(totalResults / pageSize)
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedResults = validatedData.slice(startIndex, endIndex)

    return NextResponse.json({
      results: paginatedResults,
      currentPage: page,
      totalPages: totalPages,
      totalResults: totalResults
    })
  } catch (error) {
    console.error('Error searching metas:', error)
    return NextResponse.json({ error: 'An error occurred while searching metas' }, { status: 500 })
  }
}

