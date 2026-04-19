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
import Navbar from './components/Navbar'
import FuelGauge from './components/FuelGauge'
import MusicPlayer from './components/MusicPlayer'

function App() {
  const [races, setRaces] = useState<Race[]>([])
  const [standings, setStandings] = useState<ConstructorStanding[]>([])
  const [introComplete, setIntroComplete] = useState(false)

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
      setIntroComplete(true)
  }

  return (
    <div>
      <div className="animated-bg" />
        {!introComplete && (
          <IntroAnimation onComplete={handleIntroComplete} />        )}
        <div style={{ opacity: introComplete ? 1 : 0, transition: 'opacity 0.5s ease' }}>
          <Navbar />
          <FuelGauge />
          <MusicPlayer />
          <Hero />

        <div id="performance">
          <div className="flex items-center gap-4 px-6 max-w-7xl mx-auto py-8">
            <div className="h-px flex-1 bg-white/10" />
            <p className="text-lg tracking-widest uppercase text-mercedes-light font-fancy">Performance History</p>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <StandingsChart standings={standings} />
          <RaceTable races={races} />
        </div>

        <div id="circuits">
          <div className="flex items-center gap-4 px-6 max-w-7xl mx-auto py-8">
            <div className="h-px flex-1 bg-white/10" />
            <p className="text-lg tracking-widest uppercase text-mercedes-light font-fancy">Circuit Legacy</p>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <TrackSection />
        </div>

        <div id="drivers">
          <div className="flex items-center gap-4 px-6 max-w-7xl mx-auto py-8">
            <div className="h-px flex-1 bg-white/10" />
            <p className="text-lg tracking-widest uppercase text-mercedes-light font-fancy">Meet the Team</p>
            <div className="h-px flex-1 bg-white/10" />
          </div>    
          <DriverCarousel />
        </div>

        <div id="partners">
            <SponsorTicker />
        </div>
      </div>
    </div>
  )
}

export default App