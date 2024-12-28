'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface Coin {
  mint: string
  name: string
  symbol: string
  image_uri: string
  usd_market_cap: number
}

export default function CoinsForYou() {
  const [coins, setCoins] = useState<Coin[]>([])

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch('/api/coins-for-you')
        if (!response.ok) {
          throw new Error('Failed to fetch coins')
        }
        const data = await response.json()
        setCoins(data)
      } catch (error) {
        console.error('Error fetching coins:', error)
      }
    }

    fetchCoins()
    const interval = setInterval(fetchCoins, 10000) // Fetch every 10 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-96 overflow-hidden relative">
      <div className="absolute inset-0 overflow-y-scroll scrollbar-hide">
        <div className="animate-marquee-vertical">
          {coins.map((coin, index) => (
            <div key={`${coin.mint}-${index}`} className="flex items-center space-x-4 p-4 border-b border-gray-700">
              <Image
                src={coin.image_uri}
                alt={coin.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <a
                  href={`https://pump.fun/coin/${coin.mint}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-green-400 hover:underline"
                >
                  {coin.symbol}
                </a>
                <p className="text-sm text-gray-300">{coin.name}</p>
              </div>
              <p className="ml-auto text-gray-300">${coin.usd_market_cap.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
            </div>
          ))}
          {/* Duplicate content for seamless loop */}
          {coins.map((coin, index) => (
            <div key={`${coin.mint}-${index}-duplicate`} className="flex items-center space-x-4 p-4 border-b border-gray-700">
              <Image
                src={coin.image_uri}
                alt={coin.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <a
                  href={`https://pump.fun/coin/${coin.mint}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-green-400 hover:underline"
                >
                  {coin.symbol}
                </a>
                <p className="text-sm text-gray-300">{coin.name}</p>
              </div>
              <p className="ml-auto text-gray-300">${coin.usd_market_cap.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
