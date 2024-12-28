import React from 'react'
import Image from 'next/image'

interface CoinPopupProps {
  coin: any
  onClose: () => void
}

export default function CoinPopup({ coin, onClose }: CoinPopupProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-green-400">{coin.name} ({coin.symbol})</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            &times;
          </button>
        </div>
        {coin.image_uri && (
          <div className="mb-4">
            <Image src={coin.image_uri} alt={coin.name} width={200} height={200} className="rounded-lg" />
          </div>
        )}
        <div className="space-y-2">
          <p><strong>Description:</strong> {coin.description}</p>
          <p><strong>Mint:</strong> {coin.mint}</p>
          <p><strong>Market Cap:</strong> ${coin.usd_market_cap.toFixed(2)}</p>
          <p><strong>Total Supply:</strong> {coin.total_supply.toLocaleString()}</p>
          <p><strong>Created:</strong> {new Date(coin.created_timestamp).toLocaleString()}</p>
          {coin.twitter && <p><strong>Twitter:</strong> <a href={coin.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{coin.twitter}</a></p>}
          {coin.telegram && <p><strong>Telegram:</strong> <a href={coin.telegram} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{coin.telegram}</a></p>}
          {coin.website && <p><strong>Website:</strong> <a href={coin.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{coin.website}</a></p>}
        </div>
      </div>
    </div>
  )
}

