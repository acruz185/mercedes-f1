import { useEffect, useState } from 'react'
import { asset } from '../utils'

type Props = {
    onComplete: () => void
}

export default function IntroAnimation({ onComplete }: Props) {
    const [phase, setPhase] = useState<'loading' | 'fadeout'>('loading')
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        // simulate progress bar filling
        const interval = setInterval(() => {
            setProgress(p => {
                if (p >= 100) {
                    clearInterval(interval)
                    return 100
                }
                return p + 2
            })
        }, 60)

        // start fadeout when progress hits 100
        const fadeout = setTimeout(() => {
            setPhase('fadeout')
        }, 3200)

        const complete = setTimeout(() => {
            onComplete()
        }, 4000)

        return () => {
            clearInterval(interval)
            clearTimeout(fadeout)
            clearTimeout(complete)
        }
    }, [])

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            background: '#111111',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '40px',
            opacity: phase === 'fadeout' ? 0 : 1,
            transition: phase === 'fadeout' ? 'opacity 0.8s ease' : 'none'
        }}>
            {/* spinning logo */}
            <div style={{
                width: '180px',
                height: '180px',
                animation: 'logospin 1.5s linear infinite'
            }}>
                <img
                    src={asset('mercedes-logo.png')}
                    alt="Mercedes logo"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain'
                    }}
                />
            </div>

            {/* loading text */}
            <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: '14px',
                letterSpacing: '0.3em',
                color: '#666',
                textTransform: 'uppercase'
            }}>
                Loading Mercedes Data
            </p>

            {/* progress bar container */}
            <div style={{
                width: '280px',
                height: '2px',
                background: '#222',
                borderRadius: '2px',
                overflow: 'hidden'
            }}>
                <div style={{
                    height: '100%',
                    width: `${progress}%`,
                    background: '#00A19C',
                    borderRadius: '2px',
                    transition: 'width 0.06s linear'
                }} />
            </div>

            {/* percentage */}
            <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: '12px',
                color: '#444',
                letterSpacing: '0.2em',
                marginTop: '-24px'
            }}>
                {progress}%
            </p>
        </div>
    )
}