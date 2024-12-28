import { useState, useEffect } from 'react'
import { MetaItem } from '../types'

interface GlobalParams {
  timestamp: number
  metas: MetaItem[]
}

async function getCurrentMetas(): Promise<MetaItem[]> {
  const res = await fetch('https://frontend-api.pump.fun/metas/current', { next: { revalidate: 60 } })
  if (!res.ok) throw new Error('Failed to fetch current metas')
  return res.json()
}

async function getGlobalParams(timestamp: number): Promise<GlobalParams> {
  const res = await fetch(`https://frontend-api.pump.fun/global-params/${timestamp}`)
  if (!res.ok) throw new Error('Failed to fetch global params')
  return res.json()
}

export default function MetaTrendAnalysis() {
  const [currentMetas, setCurrentMetas] = useState<MetaItem[]>([])
  const [previousMetas, setPreviousMetas] = useState<MetaItem[]>([])

  useEffect(() => {
    getCurrentMetas().then(setCurrentMetas)
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000
    getGlobalParams(oneDayAgo).then(data => setPreviousMetas(data.metas))
  }, [])

  const getTrend = (current: MetaItem, previous: MetaItem | undefined) => {
    if (!previous) return 'New'
    const diff = current.score - previous.score
    if (diff > 0) return 'Up'
    if (diff < 0) return 'Down'
    return 'Stable'
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-gray-700 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-800">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Rank</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Meta</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">Score</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-300">24h Trend</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {currentMetas.map((meta, index) => {
              const previousMeta = previousMetas.find(m => m.word === meta.word)
              const trend = getTrend(meta, previousMeta)
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
                  <td className="px-4 py-3 text-sm text-center whitespace-nowrap">
                    {trend === 'Up' && <span className="text-green-500">↑</span>}
                    {trend === 'Down' && <span className="text-red-500">↓</span>}
                    {trend === 'Stable' && <span className="text-yellow-500">→</span>}
                    {trend === 'New' && <span className="text-blue-500">New</span>}
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

