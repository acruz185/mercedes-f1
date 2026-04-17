import { useState } from 'react'
import type { Race, RaceRow } from '../api'

type Props = {
    races: Race[]
}

//long function to create a table with all the race data..
export default function RaceTable({ races }: Props) { //grabs races directly out of the props object to avoid repetition in block
    //sets all 3 variables to variables that will change based on their respective function
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(20)
    const [searchQuery, setSearchQuery] = useState("")

    //flatten races into individual rows
    const allRows: RaceRow[] = []
    races.forEach(race => {
        race.Results.forEach(result => {
            allRows.push({ race, result })
        })
    })

    //filter by search
    const filteredRows = allRows.filter(item => {
        const text = `
            ${item.race.season}
            ${item.race.raceName}
            ${item.race.Circuit.circuitName}
            ${item.race.date}
            ${item.result.Driver.givenName}
            ${item.result.Driver.familyName}
        `.toLowerCase()
        return text.includes(searchQuery.toLowerCase())
    })

    const totalPages = Math.ceil(filteredRows.length / rowsPerPage)
    const start = (currentPage - 1) * rowsPerPage
    const pageRows = filteredRows.slice(start, start + rowsPerPage)

    return (
        <div id="table-section">
            <div id="table-controls">
                <input
                    type="text"
                    placeholder="Search races..."
                    value={searchQuery}
                    onChange={e => {
                        setSearchQuery(e.target.value)
                        setCurrentPage(1)
                    }}
                />
                <select
                    value={rowsPerPage}
                    onChange={e => {
                        setRowsPerPage(parseInt(e.target.value))
                        setCurrentPage(1)
                    }}
                >
                    <option value={10}>10 rows</option>
                    <option value={20}>20 rows</option>
                    <option value={50}>50 rows</option>
                </select>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>Grand Prix</th>
                        <th>Circuit</th>
                        <th>Date</th>
                        <th>Driver</th>
                        <th>Position</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {pageRows.map((item, index) => (
                        <tr key={index}>
                            <td>{item.race.season}</td>
                            <td>{item.race.raceName}</td>
                            <td>{item.race.Circuit.circuitName}</td>
                            <td>{item.race.date}</td>
                            <td>{item.result.Driver.givenName} {item.result.Driver.familyName}</td>
                            <td>{item.result.position}</td>
                            <td>{item.result.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div id="pagination">
                <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>«</button>
                <button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1}>Previous</button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages}>Next</button>
                <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>»</button>
            </div>
        </div>
    )
}

