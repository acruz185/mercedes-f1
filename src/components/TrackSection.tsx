import { useState, useEffect, useRef } from 'react'
import { CIRCUITS } from '../trackData'
import type { CircuitData } from '../trackData'
import { COLORS } from '../constants'

export default function TrackSection() {
    const [selected, setSelected] = useState<CircuitData>(CIRCUITS[0])
    const [isDrawing, setIsDrawing] = useState(true)
    const pathRef = useRef<SVGPathElement>(null)
    const [_pathLength, setPathLength] = useState(0)
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
        <section className="py-5 px-6 max-w-7xl mx-auto">
            <h2 className="text-4xl font-display text-mercedes-primary mb-2 font-black">
                Iconic Circuits
            </h2>
            <p className="text-mercedes-light mb-8 text-sm">
                Select a circuit to explore Mercedes' defining moments
            </p>

            <div className="flex items-center gap-4 mb-10">
                <p className="text-xs text-mercedes-light tracking-widest uppercase">Circuit</p>
                <select
                    value={selected.id}
                    onChange={e => {
                        const circuit = CIRCUITS.find(c => c.id === e.target.value)
                        if (circuit) setSelected(circuit)
                    }}
                    className="bg-mercedes-card text-mercedes-light border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-mercedes-primrary transition-colors"
                >
                    {CIRCUITS.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* SVG Track */}
                <div className="bg-mercedes-card rounded-xl p-6 border border-white/5 relative overflow-hidden">
                    <p className="absolute top-4 left-4 text-xs text-mercedes-silver tracking-widest uppercase opacity-40">
                        {selected.name}
                    </p>
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
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <img 
                                src={selected.countryFlag} 
                                alt={selected.country}
                                className="w-8 h-auto rounded-sm"
                            />
                            <h3 className="text-3xl font-display text-mercedes-light">
                                {selected.name}
                            </h3>
                        </div>
                        <p className="text-mercedes-light text-xs tracking-widest uppercase ml-11">
                            {selected.country}
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-mercedes-card rounded-lg p-4 border border-white/5">
                            <p className="text-xs text-mercedes-light mb-1 tracking-widest uppercase">Best Lap</p>
                            <p className="text-2xl font-display text-mercedes-accent">
                                {selected.bestLap}
                            </p>
                            <p className="text-xs text-mercedes-light mt-1">
                                {selected.bestLapDriver} · {selected.bestLapYear}
                            </p>
                        </div>
                        <div className="bg-mercedes-card rounded-lg p-4 border border-white/5">
                            <p className="text-xs text-mercedes-light mb-1 tracking-widest uppercase">Mercedes Wins</p>
                            <p className="text-2xl font-display text-mercedes-accent">
                                {selected.mercedesWins}
                            </p>
                            <p className="text-xs text-mercedes-light mt-1">
                                2010 — 2025
                            </p>
                        </div>
                    </div>

                    <div className="bg-mercedes-card rounded-lg p-4 border border-white/5"
                        style={{ borderLeftColor: COLORS.primaryAccent }}>
                        <p className="text-xs text-mercedes-light mb-2 tracking-widest uppercase">Iconic Moment</p>
                        <p className="text-mercedes-text text-sm leading-relaxed">
                            {selected.famousMoment}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

