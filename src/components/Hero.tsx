import { asset } from '../utils'
export default function Hero() {
    return (
        <section style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
            {/* video background */}
            <video
                autoPlay
                muted
                loop
                playsInline
                style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                }}
            >
                <source src={asset("hero.mp4")} type="video/mp4" />
            </video>

            {/* dark overlay so text is readable */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.5)'
            }} />

            {/* content */}
            <div style={{
                position: 'relative',
                zIndex: 10,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                gap: '16px'
            }}>
                <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    letterSpacing: '0.4em',
                    color: 'var(--color-mercedes-primary)',
                    textTransform: 'uppercase',
                    fontWeight: 'bold',

                }}>
                    Mercedes-AMG Petronas F1 Team
                </p>

                <h1 style={{
                    fontFamily: 'var(--font-fancy)',
                    fontSize: 'clamp(4rem, 12vw, 10rem)',
                    color: 'white',
                    lineHeight: 1,
                    margin: 0,
                    fontWeight: 'bolder',
                }}>
                    EST. 1954
                </h1>

                <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    color: 'var(--color-mercedes-accent',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                }}>
                    The Best or Nothing
                </p>
                <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '10px',
                    color: '#C6C6C6',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    fontStyle: 'italic'
                }}>
                    Das Beste oder nichts
                </p>

                {/* scroll indicator */}
                <div style={{
                    position: 'absolute',
                    bottom: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    animation: 'bounce 2s infinite'
                }}>
                    <p style={{
                        fontSize: '11px',
                        letterSpacing: '0.3em',
                        color: '#666',
                        textTransform: 'uppercase'
                    }}>
                        Scroll
                    </p>
                    <div style={{
                        width: '1px',
                        height: '40px',
                        background: 'linear-gradient(to bottom, #00A19C, transparent)'
                    }} />
                </div>
            </div>
        </section>
    )
}