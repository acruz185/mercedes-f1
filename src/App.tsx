import { useState, useEffect } from 'react'
import { fetchRaceResults, fetchConstructorStandings } from './api'
import type { Race, ConstructorStanding } from './api'
import RaceTable from './components/RaceTable'
import StandingsChart from './components/StandingsChart'
import TrackSection from './components/TrackSection'
import DriverCarousel from './components/DriverCarousel'
import SponsorTicker from './components/SponsorTicker'
import IntroAnimation from './components/IntroAnimation'
import Hero from './components/Hero'

function App() {
  const [races, setRaces] = useState<Race[]>([])
  const [standings, setStandings] = useState<ConstructorStanding[]>([])
  const [introComplete, setIntroComplete] = useState(
    () => localStorage.getItem('introSeen') === 'true'
  )

  useEffect(() => {
    async function loadData() {
      const raceData = await fetchRaceResults()
      setRaces(raceData)
      const standingsData = await fetchConstructorStandings()
      setStandings(standingsData)
    }
    loadData()
  }, [])

  const handleIntroComplete = () => {
      localStorage.setItem('introSeen', 'true')
      setIntroComplete(true)
  }

  return (
    <div>
        {!introComplete && (
          <IntroAnimation onComplete={handleIntroComplete} />        )}
        <div style={{ opacity: introComplete ? 1 : 0, transition: 'opacity 0.5s ease' }}>
        <Hero />
      <div className="min-h-screen bg-mercedes-dark text-mercedes-text">
        <main className="max-w-7xl mx-auto px-6">
            <RaceTable races={races} />
            <StandingsChart standings={standings} />
            <TrackSection />
            <DriverCarousel />
            <SponsorTicker />
        </main>
      </div>
    </div>
  </div>
  )
}

export default App