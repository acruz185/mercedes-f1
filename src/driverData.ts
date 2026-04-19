import { asset } from './utils'
export type DriverData = {
    id: string
    frontCard: string
    backCard: string
}

export const DRIVERS: DriverData[] = [
    {
        id: "schumacher",
        frontCard: asset("drivers/schumacher-front.png"),
        backCard: asset("drivers/schumacher-back.png")
    },
    {
        id: "rosberg",
        frontCard: asset("drivers/rosberg-front.png"),
        backCard: asset("drivers/rosberg-back.png")
    },
    {
        id: "hamilton",
        frontCard: asset("drivers/hamilton-front.png"),
        backCard: asset("drivers/hamilton-back.png")
    },
    {
        id: "bottas",
        frontCard: asset("drivers/bottas-front.png"),
        backCard: asset("drivers/bottas-back.png")
    },
    {
        id: "russell",
        frontCard: asset("drivers/russell-front.png"),
        backCard: asset("drivers/russell-back.png")
    },
    {
        id: "antonelli",
        frontCard: asset("drivers/antonelli-front.png"),
        backCard: asset("drivers/antonelli-back.png")
    },
]