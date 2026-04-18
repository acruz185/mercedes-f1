import { SPONSORS } from '../sponsorData'

export default function SponsorTicker() {
    // duplicate sponsors for seamless loop
    const doubled = [...SPONSORS, ...SPONSORS]

    return (
        <div className="py-12 border-t border-white/5">
            <p className="text-center text-xs text-mercedes-light mb-8 tracking-widest uppercase">
                Partners & Sponsors
            </p>

            <div style={{ position: 'relative', overflow: 'hidden' }}>
                {/* left fade */}
                <div style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '120px',
                    background: 'linear-gradient(to right, #111111, transparent)',
                    zIndex: 10,
                    pointerEvents: 'none'
                }} />

                {/* right fade */}
                <div style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    bottom: 0,
                    width: '120px',
                    background: 'linear-gradient(to left, #111111, transparent)',
                    zIndex: 10,
                    pointerEvents: 'none'
                }} />

                {/* scrolling track */}
                <div style={{
                    display: 'flex',
                    gap: '60px',
                    alignItems: 'center',
                    animation: 'ticker 30s linear infinite',
                    width: 'max-content'
                }}>
                    {doubled.map((sponsor, index) => (
                        <div
                            key={index}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                flexShrink: 0,
                                width: '120px'
                            }}
                        >
                            <div style={{
                                width:'100px',
                                height: '40px',  // fixed height container
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <img
                                    src={sponsor.logo}
                                    alt={sponsor.name}
                                    style={{
                                        maxWidth: '100px',
                                        maxHeight: '40px',
                                        height: 'auto',
                                        width: 'auto',
                                        objectFit: 'contain',
                                        opacity: 0.7
                                    }}
                                    onError={e => {
                                        // fallback to text if logo fails to load
                                        const target = e.target as HTMLImageElement
                                        target.style.display = 'none'
                                    }}
                                />
                            </div>
                            <span style={{
                                fontSize: '10px',
                                color: '#444',
                                whiteSpace: 'nowrap',
                                fontFamily: 'var(--font-body)'
                            }}>
                                {sponsor.category}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}