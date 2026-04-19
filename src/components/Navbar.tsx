import { asset } from '../utils'
export default function Navbar() {
    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <nav style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            height: '60px',
            background: 'rgba(17, 17, 17, 0.85)',
            backdropFilter: 'blur(12px)',
            borderBottom: '0.5px solid rgba(255,255,255,0.06)'
        }}>
            {/* logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img
                    src={asset('mercedes-logo.png')}
                    alt="Mercedes"
                    style={{ height: '28px', width: 'auto' }}
                />
                <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '18px',
                    color: '#E8E8E8',
                    letterSpacing: '0.1em'
                }}>
                    AMG F1
                </span>
            </div>

            {/* nav links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                {[
                    { label: 'Performance', id: 'performance' },
                    { label: 'Circuits', id: 'circuits' },
                    { label: 'Drivers', id: 'drivers' },
                    { label: 'Partners', id: 'partners' }
                ].map(link => (
                    <button
                        key={link.id}
                        onClick={() => scrollTo(link.id)}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#666',
                            fontFamily: 'var(--font-body)',
                            fontSize: '12px',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            cursor: 'pointer',
                            transition: 'color 0.2s'
                        }}
                        onMouseEnter={e => (e.target as HTMLButtonElement).style.color = '#00A19C'}
                        onMouseLeave={e => (e.target as HTMLButtonElement).style.color = '#666'}
                    >
                        {link.label}
                    </button>
                ))}
            </div>
        </nav>
    )
}