import { useState, useEffect } from 'react'
import { fetchRaceResults, fetchConstructorStandings } from './api'
import type { Race, ConstructorStanding } from './api'
import RaceTable from './components/RaceTable'
import StandingsChart from './components/StandingsChart'


function App() {
  const [races, setRaces] = useState<Race[]>([])
  const [standings, setStandings] = useState<ConstructorStanding[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      const raceData = await fetchRaceResults()
      setRaces(raceData)
      const standingsData = await fetchConstructorStandings()
      setStandings(standingsData)
      setLoading(false)
    }
    loadData()
  }, [])

  if (loading) {
    return <div id="loading">Loading Mercedes data...</div>
  }

  return (
    <div className="min-h-screen bg-mercedes-dark text-mercedes-text">
      <main className="max-w-7x1 mx-auto px-6">
        <h1 className="text-6x1 font-display text-mercedes-primary">
            Mercedes AMG F1
          </h1>
          <RaceTable races={races} />
          <StandingsChart standings={standings} />
      </main>
    </div>
  )
}

export default App