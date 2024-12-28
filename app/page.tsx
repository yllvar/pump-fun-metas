import { Suspense } from 'react'
import Image from 'next/image'
import CurrentMetas from './components/CurrentMetas'
import MetaSearch from './components/MetaSearch'
import TokenTicker from './components/TokenTicker'
import CoinsForYou from './components/CoinsForYou'
import CurrentlyLiveCoins from './components/CurrentlyLiveCoins'

export default function Home() {
  return (
    <>
      <TokenTicker />
      <main className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-green-400">Ape This Pump Fun</h1>
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ape%20This%20(1)-IzMsYOurHK15d86Vnm0Ju6g6nIGzi6.png"
              alt="Ape This Mascot"
              width={120}
              height={120}
              className="select-none"
              priority
              unoptimized
            />
          </div>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-gray-100 mb-4">Search Metas</h2>
              <MetaSearch />
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-100 mb-4">Current Metas</h2>
              <Suspense fallback={
                <div className="text-gray-400 animate-pulse">Loading current metas...</div>
              }>
                <CurrentMetas />
              </Suspense>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold text-gray-100 mb-4">Coins For You</h2>
                <CoinsForYou />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-100 mb-4">Currently Live Coins</h2>
                <CurrentlyLiveCoins />
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  )
}

