import { useState, useEffect } from 'react'
import { MetaItem } from '../types'

interface Trade {
  mint: string
  price: number
  timestamp: number
}

async function getCurrentMetas(): Promise<MetaItem[]> {
  const res = await fetch('https://frontend-api.pump.fun/metas/current', { next: { revalidate: 60 } })
  if (!res.ok) throw new Error('Failed to fetch current metas')
  return res.json()
}

async function getLatestTrades(): Promise<Trade[]> {
  const res = await fetch('https://frontend-api.pump.fun/trades/latest')
  if (!res.ok) throw new Error('Failed to fetch latest trades')
  return res.json()
}

export default function RealtimeMetaTrades() {
  const [metas, setMetas] = useState<MetaItem[]>([])
  const [latestTrades, setLatestTrades] = useState<Trade[]>([])

  useEffect(() => {
    getCurrentMetas().then(setMetas)
    const interval = setInterval(() => {
      getLatestTrades().then(setLatestTrades)
    }, 5000) // Update every 5 seconds
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-gray-700 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-800">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Rank</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Meta</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">Score</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">Latest Trade</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {metas.map((meta, index) => {
              const latestTrade = latestTrades.find(trade => trade.mint === meta.mint)
              return (
                <tr key={index} className="hover:bg-gray-800/50">
                  <td className="px-4 py-3 text-sm text-gray-300 whitespace-nowrap">
                    #{index + 1}
                  </td>
                  <td className="px-4 py-3 text-sm text-green-400 whitespace-nowrap">
                    {meta.word_with_strength}
                  </td>
                  <td className="px-4 py-3 text-sm text-right text-gray-300 whitespace-nowrap">
                    {meta.score.toFixed(3)}
                  </td>
                  <td className="px-4 py-3 text-sm text-right text-gray-300 whitespace-nowrap">
                    {latestTrade ? `$${latestTrade.price.toFixed(2)}` : 'N/A'}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

