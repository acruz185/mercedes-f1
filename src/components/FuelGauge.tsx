import { useState, useEffect } from 'react'

export default function FuelGauge() {
    const [scroll, setScroll] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight
            const progress = window.scrollY / totalHeight
            setScroll(progress)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // needle angle: -50deg (empty) to 50deg (full) — sweeps left to right
    const needleAngle = -85 + scroll * 170

    return (
        <div style={{
            position: 'fixed',
            right: '20px',
            bottom: '30px',
            zIndex: 500,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            opacity: 0.7
        }}>
            {/* gauge SVG */}
            <svg width="70" height="45" viewBox="0 0 70 45">
                {/* arc track */}
                <path
                    d="M 8 40 A 27 27 0 0 1 62 40"
                    fill="none"
                    stroke="#333"
                    strokeWidth="3"
                    strokeLinecap="round"
                />
                {/* filled arc — grows with scroll */}
                <path
                    d="M 8 40 A 27 27 0 0 1 62 40"
                    fill="none"
                    stroke="#00A19C"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="85"
                    strokeDashoffset={85 - scroll * 85}
                    style={{ transition: 'stroke-dashoffset 0.1s ease' }}
                />
                {/* needle */}
                <line
                    x1="35"
                    y1="40"
                    x2="35"
                    y2="18"
                    stroke="#E8E8E8"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    style={{
                        transformOrigin: '35px 40px',
                        transform: `rotate(${needleAngle}deg)`,
                        transition: 'transform 0.1s ease'
                    }}
                />
                {/* center dot */}
                <circle cx="35" cy="40" r="3" fill="#80142B" />
                {/* E label */}
                <text x="4" y="44" fill="#8b8b8b" fontSize="8" fontFamily="var(--font-body)">E</text>
                {/* F label */}
                <text x="60" y="44" fill="#8b8b8b" fontSize="8" fontFamily="var(--font-body)">F</text>
            </svg>

            {/* fuel label */}
            <p style={{
                fontSize: '8px',
                color: '#444',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-body)'
            }}>
                Fuel
            </p>
        </div>
    )
}