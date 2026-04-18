import { useState, useEffect, useRef } from 'react'
import { CIRCUITS } from '../trackData'
import type { CircuitData } from '../trackData'
import { COLORS } from '../constants'

export default function TrackSection() {
    const [selected, setSelected] = useState<CircuitData>(CIRCUITS[0])
    const [isDrawing, setIsDrawing] = useState(true)
    const pathRef = useRef<SVGPathElement>(null)
    const [pathLength, setPathLength] = useState(0)
    const [dotPos, setDotPos] = useState({ x: 0, y: 0 })
    const animFrameRef = useRef<number>(0)
    const startTimeRef = useRef<number>(0)

    useEffect(() => {
    cancelAnimationFrame(animFrameRef.current)
    setIsDrawing(true)

    const measureTimeout = setTimeout(() => {
        if (!pathRef.current) return
        const length = pathRef.current.getTotalLength()

        // set initial hidden state directly
        pathRef.current.style.transition = 'none'
        pathRef.current.style.strokeDasharray = `${length}`
        pathRef.current.style.strokeDashoffset = `${length}`

        // force reflow
        pathRef.current.getBoundingClientRect()

        // now animate to visible
        pathRef.current.style.transition = 'stroke-dashoffset 3s ease-in-out'
        pathRef.current.style.strokeDashoffset = '0'

        setPathLength(length)

        const dotTimeout = setTimeout(() => {
            setIsDrawing(false)
            startTimeRef.current = performance.now()
            const lapDuration = 8000

            const animateDot = (time: number) => {
                if (!pathRef.current) return
                const elapsed = (time - startTimeRef.current) % lapDuration
                const progress = elapsed / lapDuration
                const point = pathRef.current.getPointAtLength(progress * length)
                setDotPos({ x: point.x, y: point.y })
                animFrameRef.current = requestAnimationFrame(animateDot)
            }

            animFrameRef.current = requestAnimationFrame(animateDot)
        }, 3200)

        return () => clearTimeout(dotTimeout)
    }, 50)

    return () => {
        clearTimeout(measureTimeout)
        cancelAnimationFrame(animFrameRef.current)
    }
}, [selected])


    return (
        <section className="py-20 px-6 max-w-7xl mx-auto">
            <h2 className="text-4xl font-display text-mercedes-teal mb-2">
                Iconic Circuits
            </h2>
            <p className="text-mercedes-silver mb-8 text-sm">
                Select a circuit to explore Mercedes' legacy
            </p>

            <select
                value={selected.id}
                onChange={e => {
                    const circuit = CIRCUITS.find(c => c.id === e.target.value)
                    if (circuit) setSelected(circuit)
                }}
                className="bg-mercedes-card text-mercedes-text border border-mercedes-silver/20 rounded px-4 py-2 mb-10 font-body"
            >
                {CIRCUITS.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                ))}
            </select>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* SVG Track */}
                <div className="bg-mercedes-card rounded-xl p-6 border border-white/5">
                    <svg
                        viewBox="0 0 1450 900"
                        width="100%"
                        className="overflow-visible"
                    >
                        {/* base track — faint */}
                        <path
                            d={selected.svgPath}
                            fill="none"
                            stroke="#555555"
                            strokeWidth="18"
                            strokeLinecap="round"
                        />
                        {/* animated drawing path */}
                        <path
                            ref={pathRef}
                            d={selected.svgPath}
                            fill="none"
                            stroke={COLORS.primary}
                            strokeWidth="18"
                            strokeLinecap="round"
                            className="track-path-animated"
                        />
                        {/* start/finish line */}
                        <rect
                            x={selected.startX - 4}
                            y={selected.startY - 20}
                            width="8"
                            height="40"
                            fill="white"
                            opacity="0.9"
                        />
                        {!isDrawing && (
                            <circle
                                cx={dotPos.x}
                                cy={dotPos.y}
                                r="15"
                                fill="#f6f6f6"
                            />
                        )}
                    </svg>
                </div>

                {/* Stats Panel */}
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                        <img 
                            src={selected.countryFlag} 
                            alt={selected.country}
                            className="w-8 h-auto rounded-sm"
                        />
                        <h3 className="text-3xl font-display text-mercedes-text">
                            {selected.name}
                        </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-mercedes-card rounded-lg p-4 border border-white/5">
                            <p className="text-xs text-mercedes-silver mb-1">Best Lap</p>
                            <p className="text-2xl font-display text-mercedes-teal">
                                {selected.bestLap}
                            </p>
                            <p className="text-xs text-mercedes-silver mt-1">
                                {selected.bestLapDriver} · {selected.bestLapYear}
                            </p>
                        </div>
                        <div className="bg-mercedes-card rounded-lg p-4 border border-white/5">
                            <p className="text-xs text-mercedes-silver mb-1">Mercedes Wins</p>
                            <p className="text-2xl font-display text-mercedes-teal">
                                {selected.mercedesWins}
                            </p>
                            <p className="text-xs text-mercedes-silver mt-1">
                                2010 — 2025
                            </p>
                        </div>
                    </div>

                    <div className="bg-mercedes-card rounded-lg p-4 border border-white/5">
                        <p className="text-xs text-mercedes-silver mb-2">Iconic Moment</p>
                        <p className="text-mercedes-text text-sm leading-relaxed">
                            {selected.famousMoment}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

