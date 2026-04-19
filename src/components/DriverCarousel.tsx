import { useState } from 'react'
import { DRIVERS } from '../driverData'

export default function DriverCarousel() {
    const [activeIndex, setActiveIndex] = useState(0)
    const [flipped, setFlipped] = useState(false)

    const handlePrev = () => {
        setFlipped(false)
        setActiveIndex(i => (i - 1 + DRIVERS.length) % DRIVERS.length)
    }

    const handleNext = () => {
        setFlipped(false)
        setActiveIndex(i => (i + 1) % DRIVERS.length)
    }

    return (
        <section className="py-5 px-6 max-w-7xl mx-auto">
            <h2 className="text-4xl font-display text-mercedes-primary mb-2 font-black">
                The Drivers
            </h2>
            <p className="text-mercedes-light text-sm mb-8">
                Mercedes AMG F1 drivers from 2010 to 2025: click a card to flip it
            </p>

            <div className="flex items-center justify-center gap-8">
                <button
                    onClick={handlePrev}
                    style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        border: '1px solid rgba(255,255,255,0.1)',
                        background: 'transparent',
                        color: '#C6C6C6',
                        fontSize: '20px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'border-color 0.2s, background 0.2s',
                        flexShrink: 0
                    }}
                onMouseEnter={e => {
                    (e.target as HTMLButtonElement).style.borderColor = '#C6C6C6'
                    ;(e.target as HTMLButtonElement).style.background = 'rgba(165, 165, 165, 0.1)'
                }}
                onMouseLeave={e => {
                    (e.target as HTMLButtonElement).style.borderColor = 'rgba(165, 165, 165, 0.1)'
                    ;(e.target as HTMLButtonElement).style.background = 'transparent'
                }}
            >
                ‹
                </button>

                <div style={{
                    width: '580px',
                    height: '420px',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>                    
                    {DRIVERS.map((driver, index) => {
                        const offset = index - activeIndex
                        const isActive = offset === 0
                        const isAdjacent = Math.abs(offset) === 1

                        if (!isActive && !isAdjacent) return null

                        return (
                            <div
                                key={driver.id}
                                onClick={isActive ? () => setFlipped(f => !f) : undefined}
                                style={{
                                    position: 'absolute',
                                    width: isActive ? '280px' : '160px',
                                    opacity: isActive ? 1 : 0.4,
                                    filter: isActive ? 'none' : 'blur(1px)',
                                    cursor: isActive ? 'pointer' : 'default',
                                    perspective: '1000px',
                                    left: isActive 
                                        ? '50%' 
                                        : offset < 0 
                                        ? '50px' 
                                        : 'auto',
                                    right: offset > 0 ? '50px' : 'auto',
                                    transform: isActive 
                                        ? 'translateX(-50%)' 
                                        : offset < 0 
                                        ? 'translateX(0)' 
                                        : 'translateX(0)',
                                    transition: 'all 0.5s ease',
                                    zIndex: isActive ? 10 : 5
                                }}
                            >
                                <div
                                    style={{
                                        position: 'relative',
                                        width: '100%',
                                        paddingBottom: '140%',
                                        transformStyle: 'preserve-3d',
                                        transition: 'transform 0.6s ease',
                                        transform: isActive && flipped
                                            ? 'rotateY(180deg)'
                                            : 'rotateY(0deg)',
                                        boxShadow: isActive ? '0 0 30px rgba(151, 151, 151, 0.3)' : 'none'
                                    }}
                                >
                                    <img
                                        src={driver.frontCard}
                                        alt="card front"
                                        style={{
                                            position: 'absolute',
                                            inset: 0,
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            borderRadius: '12px',
                                            backfaceVisibility: 'hidden'
                                        }}
                                    />
                                    <img
                                        src={driver.backCard}
                                        alt="card back"
                                        style={{
                                            position: 'absolute',
                                            inset: 0,
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            borderRadius: '12px',
                                            backfaceVisibility: 'hidden',
                                            transform: 'rotateY(180deg)'
                                        }}
                                    />
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        borderRadius: '12px',
                                        background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.4) 100%)',
                                        pointerEvents: 'none'
                                    }} />
                                    {isActive && !flipped && (
                                        <div style={{
                                            position: 'absolute',
                                            bottom: '12px',
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            fontSize: '10px',
                                            color: 'rgba(255,255,255,0.5)',
                                            letterSpacing: '0.15em',
                                            textTransform: 'uppercase',
                                            pointerEvents: 'none',
                                            whiteSpace: 'nowrap'
                                        }}>
                                            click to flip
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>

                <button
                    onClick={handleNext}
                    style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        border: '1px solid rgba(255,255,255,0.1)',
                        background: 'transparent',
                        color: '#C6C6C6',
                        fontSize: '20px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'border-color 0.2s, background 0.2s',
                        flexShrink: 0
                    }}
                    onMouseEnter={e => {
                        (e.target as HTMLButtonElement).style.borderColor = '#C6C6C6'
                        ;(e.target as HTMLButtonElement).style.background = 'rgba(165, 165, 165, 0.1)'
                    }}
                    onMouseLeave={e => {
                        (e.target as HTMLButtonElement).style.borderColor = 'rgba(165, 165, 165, 0.1)'
                        ;(e.target as HTMLButtonElement).style.background = 'transparent'
                    }}
                >
                    ›
                </button>
            </div>

            {/* dot indicators */}
            <div className="flex justify-center gap-2 mt-8">
                {DRIVERS.map((_, index) => (
                    <div
                        key={index}
                        onClick={() => {
                            setFlipped(false)
                            setActiveIndex(index)
                        }}
                        className="cursor-pointer transition-all duration-300"
                        style={{
                            width: index === activeIndex ? '24px' : '8px',
                            height: '8px',
                            borderRadius: '4px',
                            background: index === activeIndex ? '#80142B' : '#666'
                        }}
                    />
                ))}
            </div>
        </section>
    )
}