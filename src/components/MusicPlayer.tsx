import { useState, useRef } from 'react'
import { asset } from '../utils'

export default function MusicPlayer() {
    const [playing, setPlaying] = useState(false)
    const audioRef = useRef<HTMLAudioElement>(null)

    const toggle = () => {
        if (!audioRef.current) return
        if (playing) {
            audioRef.current.pause()
        } else {
            audioRef.current.play()
        }
        setPlaying(p => !p)
    }

    return (
        <>
            <audio ref={audioRef} src={asset('music.mp3')} loop />
            <button
                onClick={toggle}
                style={{
                    position: 'fixed',
                    bottom: '90px',
                    right: '20px',
                    zIndex: 500,
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: '1px solid rgba(161, 161, 161, 0.2)',
                    background: playing ? 'rgba(161, 161, 161, 0.2)' : 'transparent',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s',
                    color: playing ? '#a2a2a2' : '#666'
                }}
                title={playing ? 'Pause music' : 'Play music'}
            >
                {playing ? '♫' : '♫'}
            </button>
        </>
    )
}