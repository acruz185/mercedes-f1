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
    const [searchA, setSearchA] = useState("")
    const [searchB, setSearchB] = useState("")
    const [boolMode, setBoolMode] = useState<"AND" | "OR">("AND")
    const [regexMode, setRegexMode] = useState(false)

    //flatten races into individual rows
    const allRows: RaceRow[] = []
    races.forEach(race => {
        race.Results.forEach(result => {
            allRows.push({ race, result })
        })
    })

    let hasRegexError = false
    if (regexMode && (searchA || searchB)) {
        try { new RegExp(searchA) } catch { hasRegexError = true }
        try { new RegExp(searchB) } catch { hasRegexError = true }
    }
    
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
        
        const matchA = (query: string) => {
            if (!query) return true
            try {
                const result = regexMode
                    ? new RegExp(query, 'i').test(text)
                    : text.includes(query.toLowerCase())
                return result
            } catch {
                return text.includes(query.toLowerCase())
            }
        }

        if (boolMode === "AND") {
            return matchA(searchA) && matchA(searchB)
        } else {
            return matchA(searchA) || matchA(searchB)
        }
    })

    const totalPages = Math.ceil(filteredRows.length / rowsPerPage)
    const start = (currentPage - 1) * rowsPerPage
    const pageRows = filteredRows.slice(start, start + rowsPerPage)

    return (
    <div className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-display text-mercedes-primary mb-2 font-black">Race Results</h2>
        <p className="text-mercedes-light text-sm mb-8 tracking-widest uppercase">
        2010 — 2025 · <span className="text-mercedes-accent">All Circuits</span>
        </p>
        {/* controls */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
            <input
                type="text"
                placeholder="Search..."
                value={searchA}
                onChange={e => { setSearchA(e.target.value); setCurrentPage(1) }}
                className="bg-mercedes-card border border-white/10 text-mercedes-text placeholder-white/20 rounded px-4 py-2 text-sm focus:outline-none focus:border-mercedes-primary transition-colors"
            />
            <select
                value={boolMode}
                onChange={e => setBoolMode(e.target.value as "AND" | "OR")}
                className="bg-mercedes-card border border-white/10 text-mercedes-accent rounded px-3 py-2 text-sm focus:outline-none"
            >
                <option value="AND">AND</option>
                <option value="OR">OR</option>
            </select>
            <input
                type="text"
                placeholder="Search..."
                value={searchB}
                onChange={e => { setSearchB(e.target.value); setCurrentPage(1) }}
                className="bg-mercedes-card border border-white/10 text-mercedes-text placeholder-white/20 rounded px-4 py-2 text-sm focus:outline-none focus:border-mercedes-primary transition-colors"
            />
            <button
                onClick={() => {
                    setRegexMode(r => !r)
                    setCurrentPage(1)
                }}
                className={`px-4 py-2 rounded text-sm border transition-colors ${
                    regexMode
                        ? 'border-mercedes-primary text-mercedes-primary bg-mercedes-primary/10'
                        : 'border-white/10 text-white/40 hover:border-white/30'
                }`}
            >
                .*  Regex
            </button>
            <select
                value={rowsPerPage}
                onChange={e => { setRowsPerPage(parseInt(e.target.value)); setCurrentPage(1) }}
                className="bg-mercedes-card border border-white/10 text-mercedes-light rounded px-3 py-2 text-sm focus:outline-none ml-auto"
            >
                <option value={10}>10 rows</option>
                <option value={20}>20 rows</option>
                <option value={50}>50 rows</option>
            </select>
        </div>

        {hasRegexError && (
            <p className="text-red-400 text-xs mb-4">Invalid regex — using plain text search</p>
        )}

        {/* table */}
        <div className="rounded-xl border border-white/5 overflow-hidden">
            <table className="w-full text-sm">
                <thead>
                    <tr className="bg-mercedes-card border-b border-white/10">
                        <th className="text-left px-4 py-3 text-xs text-mercedes-primary font-display tracking-widest">Year</th>
                        <th className="text-left px-4 py-3 text-xs text-mercedes-primary font-display tracking-widest">Grand Prix</th>
                        <th className="text-left px-4 py-3 text-xs text-mercedes-primary font-display tracking-widest">Circuit</th>
                        <th className="text-left px-4 py-3 text-xs text-mercedes-primary font-display tracking-widest">Date</th>
                        <th className="text-left px-4 py-3 text-xs text-mercedes-primary font-display tracking-widest">Driver</th>
                        <th className="text-left px-4 py-3 text-xs text-mercedes-primary font-display tracking-widest">Pos</th>
                        <th className="text-left px-4 py-3 text-xs text-mercedes-primary font-display tracking-widest">Pts</th>
                    </tr>
                </thead>
                <tbody>
                    {pageRows.map((item, index) => (
                        <tr
                            key={index}
                            style={{
                              background: index % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent'  
                            }}
                            className="border-b border-white/5 hover:bg-white/5 transition-colors"
                        >
                            <td className="px-4 py-3 text-mercedes-primary font-display text-base">{item.race.season}</td>
                            <td className="px-4 py-3 text-mercedes-light text-xs">{item.race.raceName}</td>
                            <td className="px-4 py-3 text-mercedes-light text-xs">{item.race.Circuit.circuitName}</td>
                            <td className="px-4 py-3 text-mercedes-light text-xs">{item.race.date}</td>
                            <td className="px-4 py-3 text-mercedes-light text-xs">{item.result.Driver.givenName} {item.result.Driver.familyName}</td>
                            <td className="px-4 py-3">
                                <span style={{
                                    padding: '2px 8px',
                                    borderRadius: '4px',
                                    fontSize: '12px',
                                    fontFamily: 'var(--font-display)',
                                    background: item.result.position === '1'
                                        ? 'rgba(0, 161, 156, 0.2)'
                                        : item.result.position === '2' || item.result.position === '3'
                                        ? 'rgba(255,255,255,0.1)'
                                        : 'transparent',
                                    color: item.result.position === '1'
                                        ? '#00A19C'
                                        : item.result.position === '2' || item.result.position === '3'
                                        ? 'white'
                                        : '#C6C6C6'
                                }}>
                                    {item.result.position}
                                </span>
                            </td>
                            <td className="px-4 py-3 text-mercedes-light text-xs">{item.result.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* pagination */}
        <div className="flex items-center justify-center gap-3 mt-6">
            <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded border border-white/10 text-mercedes-light hover:border-mercedes-primary hover:text-mercedes-primary disabled:opacity-20 disabled:cursor-not-allowed transition-colors text-sm"
            >
                «
            </button>
            <button
                onClick={() => setCurrentPage(p => p - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded border border-white/10 text-mercedes-light hover:border-mercedes-primary hover:text-mercedes-primary disabled:opacity-20 disabled:cursor-not-allowed transition-colors text-sm"
            >
                Previous
            </button>
            <span className="text-mercedes-light text-sm px-4">
                Page <span className="text-mercedes-primary font-display text-lg">{currentPage}</span> of {totalPages}
            </span>
            <button
                onClick={() => setCurrentPage(p => p + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded border border-white/10 text-mercedes-light hover:border-mercedes-primary hover:text-mercedes-primary disabled:opacity-20 disabled:cursor-not-allowed transition-colors text-sm"
            >
                Next
            </button>
            <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded border border-white/10 text-mercedes-light hover:border-mercedes-primary hover:text-mercedes-primary disabled:opacity-20 disabled:cursor-not-allowed transition-colors text-sm"
            >
                »
            </button>
        </div>
    </div>
)
}
