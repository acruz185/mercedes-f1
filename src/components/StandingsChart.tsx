//imports a react component that creates a line chart
import { Line } from 'react-chartjs-2'
import { COLORS } from '../constants'

//pulling tools from chart.js that i need to create charts
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler
} from 'chart.js'

import type { ConstructorStanding } from '../api'

//takes the modules i imported, and sort of just activates them so i can use them later in my code
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler)

//type defines standings as an array of CosntructorStanding objects
type Props = {
    standings: ConstructorStanding[]
}

export default function Standings({ standings }: Props) {
    const data = {
        labels: standings.map(s => s.year),
        datasets: [{ 
            label: 'Constructor Points',
            data: standings.map(s => s.points),
            borderColor: COLORS.primary,
            borderWidth: 2,
            pointBackgroundColor: COLORS.primaryLight,
            pointRadius: 4,
            fill: true,
            tension: 0.3,
            
            backgroundColor: (context: any) => {
                const chart = context.chart
                const { ctx, chartArea } = chart

                if (!chartArea) return

                const gradient = ctx.createLinearGradient(
                    0,
                    chartArea.top,
                    0,
                    chartArea.bottom
                )

                gradient.addColorStop(0, COLORS.primary)
                gradient.addColorStop(1, COLORS.primaryDark)

                return gradient
            }
        }]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false }
        },
        scales: {
            x: {
                ticks: { color: COLORS.text },
                grid: { color: COLORS.grid }
            },
            y: { 
                ticks: { color: COLORS.text },
                grid: { color: COLORS.grid }
            }
        }
    }

    return (
        <div className="py-2 px-6 max-w-7xl mx-auto">
            <h2 className='text-4xl font-display text-mercedes-accent mb-2 font-black'>Constructor Points by Season</h2>
            <p className="text-mercedes-light text-sm mb-10">
                Mercedes AMG F1 constructor championship points — 2010 to 2025
            </p>
            <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-mercedes-card rounded-xl p-4 border border-white/5">
                    <p className="text-xs text-mercedes-light mb-1 tracking-widest uppercase">Peak Season</p>
                    <p className="text-3xl font-display text-mercedes-accent">2016</p>
                    <p className="text-xs text-mercedes-light mt-1">765 points</p>
                </div>
                <div className="bg-mercedes-card rounded-xl p-4 border border-white/5">
                    <p className="text-xs text-mercedes-light mb-1 tracking-widest uppercase">Championships</p>
                    <p className="text-3xl font-display text-mercedes-accent">8</p>
                    <p className="text-xs text-mercedes-light mt-1">2014 — 2021</p>
                </div>
                <div className="bg-mercedes-card rounded-xl p-4 border border-white/5">
                    <p className="text-xs text-mercedes-light mb-1 tracking-widest uppercase">Seasons</p>
                    <p className="text-3xl font-display text-mercedes-accent">16</p>
                    <p className="text-xs text-mercedes-light mt-1">2010 — 2025</p>
                </div>
            </div>
            <div className="color-mercedes-card rounded-xl border border-white/5 p-6">
                <div style={{ height: '400px', position: 'relative' }}>
                    <Line data={data} options={options} />
                </div>
            </div>
        </div>
    )
}