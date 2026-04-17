//defines the shape of the API data first, defining types and components
export type Driver = {
    givenName: string
    familyName: string
}

export type Result = {
    position: string
    points: string
    Driver: Driver
}

export type Circuit = {
    circuitName: string
}

export type Race = {
    season: string
    raceName: string
    date: string
    Circuit: Circuit
    Results: Result[] //array
}

export type ConstructorStanding = {
    year: number
    points: number
    position: number
}

export type RaceRow = {
    race: Race
    result: Result
}