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

//fetches race result data from the api for each year, using type literals to iterate through the years 2014-2025, and grabs race data and assigns it to a const race
export async function fetchRaceResults(): Promise<Race[]> {
    const allResults: Race[] = []

    for (let year = 2010; year <= 2025; year++) {
        const response = await fetch(`https://api.jolpi.ca/ergast/f1/${year}/constructors/mercedes/results.json?limit=100`)
        const data = await response.json()
        const races: Race[] = data.MRData.RaceTable.races
        allResults.push(...races)
        console.log(`fetched ${year}, got ${races.length} races`)
    }

    return allResults
}