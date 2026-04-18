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
        <div id="chart-section">
            <h2>Constructor Points by Season</h2>
            <div id="chart-container" style={{height: '400px', position: 'relative'}}>
                <Line data={data} options={options} />
            </div>
        </div>
    )
}