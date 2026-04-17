//imports a react component that creates a line chart
import { Line } from 'react-chartjs-2'

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