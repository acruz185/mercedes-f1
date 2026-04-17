import { useState, useEffect } from 'react'
import { fetchRaceResults, fetchConstructorStandings } from './api'
import type { Race, ConstructorStanding } from './api'
import RaceTable from './components/RaceTable'

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
    <div id="app">
      <h1>Mercedes AMG F1</h1>
      <p>Races loaded: {races.length}</p>
      <p>Seasons loaded: {standings.length}</p>
      <RaceTable races={races} />
    </div>
  )
}

export default App