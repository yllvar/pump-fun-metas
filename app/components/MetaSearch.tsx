'use client'

import { useState, useEffect } from 'react'
import { MetaItem } from '../types'
import { Search } from 'lucide-react'
import CoinPopup from './CoinPopup'
import { Button } from "@/components/ui/button"

export default function MetaSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<MetaItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [includeNsfw, setIncludeNsfw] = useState(false)
  const [selectedCoin, setSelectedCoin] = useState<any | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const handleSearch = async (e: React.FormEvent, page: number = 1) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch(`/api/search-metas?meta=${encodeURIComponent(searchTerm)}&includeNsfw=${includeNsfw}&page=${page}`)
      if (!res.ok) throw new Error('Failed to search metas')
      const data = await res.json()
      if (Array.isArray(data.results)) {
        setSearchResults(data.results)
        setCurrentPage(data.currentPage)
        setTotalPages(data.totalPages)
      } else {
        console.error('Unexpected API response:', data)
        setError('Received unexpected data format from the server.')
        setSearchResults([])
      }
    } catch (err) {
      setError('An error occurred while searching. Please try again.')
      console.error(err)
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setSearchTerm('')
    setSearchResults([])
    setError(null)
    setIncludeNsfw(false)
    setCurrentPage(1)
    setTotalPages(1)
  }

  const handleCoinClick = async (mint: string) => {
    try {
      const res = await fetch(`/api/coin/${mint}`)
      if (!res.ok) throw new Error('Failed to fetch coin data')
      const data = await res.json()
      setSelectedCoin(data)
    } catch (err) {
      console.error('Error fetching coin data:', err)
      setError('Failed to fetch coin details')
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={(e) => handleSearch(e)} className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a meta..."
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
          />
        </div>
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2 text-sm text-gray-300">
            <input
              type="checkbox"
              checked={includeNsfw}
              onChange={(e) => setIncludeNsfw(e.target.checked)}
              className="form-checkbox h-4 w-4 text-green-500 rounded focus:ring-green-500 border-gray-600 bg-gray-700"
            />
            <span>Include NSFW content</span>
          </label>
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-green-500 text-gray-900 font-medium py-2 rounded-lg hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:bg-gray-600 disabled:text-gray-400 transition-colors"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 bg-gray-700 text-gray-300 font-medium rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors"
          >
            Reset
          </button>
        </div>
      </form>

      {error && (
        <div className="p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-400">
          {error}
        </div>
      )}

      {searchResults.length > 0 && (
        <div className="rounded-lg border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-800">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Rank</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Symbol</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">Market Cap (USD)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {searchResults.map((meta, index) => (
                  <tr key={index} className="hover:bg-gray-800/50">
                    <td className="px-4 py-3 text-sm text-gray-300 whitespace-nowrap">
                      #{index + 1}
                    </td>
                    <td className="px-4 py-3 text-sm text-green-400 whitespace-nowrap">
                      <a
                        href={`https://pump.fun/coin/${meta.mint}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {meta.word}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-300 whitespace-nowrap">
                      <button
                        onClick={() => handleCoinClick(meta.mint)}
                        className="text-blue-400 hover:underline"
                      >
                        {meta.word_with_strength}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-sm text-right text-gray-300 whitespace-nowrap">
                      ${meta.score.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {searchResults.length > 0 && (
        <div className="mt-4 flex justify-center space-x-2">
          <Button
            onClick={(e) => handleSearch(e, currentPage - 1)}
            disabled={currentPage === 1 || isLoading}
          >
            Previous
          </Button>
          <span className="self-center">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={(e) => handleSearch(e, currentPage + 1)}
            disabled={currentPage === totalPages || isLoading}
          >
            Next
          </Button>
        </div>
      )}

      {selectedCoin && (
        <CoinPopup coin={selectedCoin} onClose={() => setSelectedCoin(null)} />
      )}
    </div>
  )
}

