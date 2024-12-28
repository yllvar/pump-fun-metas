import { MetaItem } from '../types'

async function getCurrentMetas(): Promise<MetaItem[]> {
  const res = await fetch('https://frontend-api.pump.fun/metas/current', { next: { revalidate: 60 } })
  if (!res.ok) throw new Error('Failed to fetch current metas')
  return res.json()
}

export default async function CurrentMetas() {
  const metas = await getCurrentMetas()

  return (
    <div className="rounded-lg border border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

