'use client'

import { useEffect, useState } from 'react'

interface Token {
  mint: string
  symbol: string
  name: string
}

export default function TokenTicker() {
  const [tokens, setTokens] = useState<Token[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchLatestTokens() {
      try {
        console.log('Fetching latest tokens...')
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 seconds timeout

        const res = await fetch('/api/latest-tokens', {
          signal: controller.signal,
        })
        
        clearTimeout(timeoutId)

        console.log('Response status:', res.status)
        console.log('Response headers:', Object.fromEntries(res.headers.entries()))

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        
        const contentType = res.headers.get("content-type")
        console.log('Content-Type:', contentType)

        const responseData = await res.json()
        console.log('API Response (JSON):', JSON.stringify(responseData, null, 2))

        let tokenArray: Token[] = []
        if (Array.isArray(responseData)) {
          tokenArray = responseData
        } else if (typeof responseData === 'object' && responseData !== null) {
          // Handle single token object
          if (responseData.mint && responseData.symbol && responseData.name) {
            tokenArray = [responseData as Token]
          } else if (responseData.tokens && Array.isArray(responseData.tokens)) {
            tokenArray = responseData.tokens
          }
        }

        console.log('Processed token array:', tokenArray)

        if (tokenArray.length > 0) {
          setTokens(tokenArray)
        } else {
          throw new Error('No valid tokens found in the API response')
        }
      } catch (err) {
        if (err instanceof Error) {
          console.error('Error fetching tokens:', err.message, err.stack)
          setError(`Failed to load latest tokens: ${err.message}`)
        } else {
          console.error('Unknown error fetching tokens:', err)
          setError('An unknown error occurred while fetching tokens')
        }
      }
    }

    fetchLatestTokens()
    // Refresh data every 5 minutes
    const interval = setInterval(fetchLatestTokens, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  if (error) {
    return (
      <div className="bg-red-800 text-white p-2 text-center">
        {error}
      </div>
    )
  }

  if (tokens.length === 0) return null // Don't show empty ticker

  return (
    <div className="bg-gray-800 overflow-hidden whitespace-nowrap py-2 border-b border-gray-700">
      <div className="animate-marquee inline-block">
        {tokens.map((token, i) => (
          <a
            key={`${token.mint}-${i}`}
            href={`https://pump.fun/coin/${token.mint}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mx-4 text-green-400 hover:text-green-300 transition-colors"
          >
            {token.symbol}: {token.name.trim()}
          </a>
        ))}
      </div>
      {/* Duplicate content for seamless loop */}
      <div className="animate-marquee2 inline-block">
        {tokens.map((token, i) => (
          <a
            key={`${token.mint}-${i}-duplicate`}
            href={`https://pump.fun/coin/${token.mint}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mx-4 text-green-400 hover:text-green-300 transition-colors"
          >
            {token.symbol}: {token.name.trim()}
          </a>
        ))}
      </div>
    </div>
  )
}

