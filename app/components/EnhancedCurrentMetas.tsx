import { useState, useEffect } from 'react'
import { MetaItem } from '../types'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

async function getCurrentMetas(): Promise<MetaItem[]> {
  const res = await fetch('https://frontend-api.pump.fun/metas/current', { next: { revalidate: 60 } })
  if (!res.ok) throw new Error('Failed to fetch current metas')
  return res.json()
}

async function getCandlesticks(mint: string): Promise<any[]> {
  const res = await fetch(`https://frontend-api.pump.fun/candlesticks/${mint}`)
  if (!res.ok) throw new Error('Failed to fetch candlesticks')
  return res.json()
}

export default function EnhancedCurrentMetas() {
  const [metas, setMetas] = useState<MetaItem[]>([])
  const [selectedMeta, setSelectedMeta] = useState<MetaItem | null>(null)
  const [candlesticks, setCandlesticks] = useState<any[]>([])

  useEffect(() => {
    getCurrentMetas().then(setMetas)
  }, [])

  useEffect(() => {
    if (selectedMeta) {
      getCandlesticks(selectedMeta.mint).then(setCandlesticks)
    }
  }, [selectedMeta])

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-gray-700 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-800">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Rank</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Meta</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {metas.map((meta, index) => (
              <tr 
                key={index} 
                className="hover:bg-gray-800/50 cursor-pointer"
                onClick={() => setSelectedMeta(meta)}
              >
                <td className="px-4 py-3 text-sm text-gray-300 whitespace-nowrap">
                  #{index + 1}
                </td>
                <td className="px-4 py-3 text-sm text-green-400 whitespace-nowrap">
                  {meta.word_with_strength}
                </td>
                <td className="px-4 py-3 text-sm text-right text-gray-300 whitespace-nowrap">
                  {meta.score.toFixed(3)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedMeta && (
        <div className="mt-6 p-4 bg-gray-800 rounded-lg">
          <h3 className="text-xl font-semibold text-green-400 mb-4">{selectedMeta.word_with_strength} Details</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={candlesticks}>
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="close" stroke="#4ade80" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}

