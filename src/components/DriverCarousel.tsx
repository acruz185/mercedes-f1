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
        <section className="py-20 px-6 max-w-7xl mx-auto">
            <h2 className="text-4xl font-display text-mercedes-primary mb-2">
                The Drivers
            </h2>
            <p className="text-mercedes-light text-sm mb-12">
                Click a card to flip it
            </p>

            <div className="flex items-center justify-center gap-8">
                <button
                    onClick={handlePrev}
                    className="text-mercedes-light text-4xl font-display hover:opacity-70 transition-opacity"
                >
                    ‹
                </button>

                <div className="flex items-center justify-center gap-4">
                    {DRIVERS.map((driver, index) => {
                        const offset = index - activeIndex
                        const isActive = offset === 0

                        if (Math.abs(offset) > 1) return null

                        return (
                            <div
                                key={driver.id}
                                onClick={isActive ? () => setFlipped(f => !f) : undefined}
                                className="transition-all duration-500"
                                style={{
                                    width: isActive ? '280px' : '180px',
                                    opacity: isActive ? 1 : 0.4,
                                    transform: isActive
                                        ? 'scale(1)'
                                        : `scale(0.85) translateX(${offset * 20}px)`,
                                    filter: isActive ? 'none' : 'blur(1px)',    
                                    cursor: isActive ? 'pointer' : 'default',
                                    perspective: '1000px',
                                    flexShrink: 0
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
                                </div>
                            </div>
                        )
                    })}
                </div>

                <button
                    onClick={handleNext}
                    className="text-mercedes-light text-4xl font-display hover:opacity-70 transition-opacity"
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
                            background: index === activeIndex ? '#00A19C' : '#666'
                        }}
                    />
                ))}
            </div>
        </section>
    )
}