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
export async function fetchRaceResults(): Promise<Race[]> { //returns an array of race objects
    //fetches data from API and saves to localStorage TO AVOID RATE LIMITS >:(
    const cached = localStorage.getItem("mercedesRaceData")
    if (cached) {
        console.log("using cached race data")
            return JSON.parse(cached)
    }

    const allResults: Race[] = [] //explicit type definition as array of race objects

    for (let year = 2010; year <= 2025; year++) { //starts at 2010, ends at 2025 inclusive and adds one after each iteration
        const response = await fetch(`https://api.jolpi.ca/ergast/f1/${year}/constructors/mercedes/results.json?limit=100`) //await means 'dont move on to next line until this line completes'
        const data = await response.json() //stores whatever is fetched from the line above into a const data variable
        const races: Race[] = data.MRData.RaceTable.Races as Race[] //from data, specifically goes through the API paths to grab races for that year
        allResults.push(...races) //pushes individual race objects to the empty all results array
        console.log(`Fetched ${year}, got ${races.length} races`)
    }

    localStorage.setItem("mercedesRaceData", JSON.stringify(allResults))
    return allResults
}

//fetches constructor standings data and returns an array of constructor standings for each year
export async function fetchConstructorStandings(): Promise<ConstructorStanding[]> {
    const cached = localStorage.getItem("mercedesStandingsData")
    if (cached) {
        console.log("using cached standings data")
        return JSON.parse(cached)
    }

    const standingsData: ConstructorStanding[] = []

    for (let year = 2010; year <= 2025; year++) { //i iteratively fetched rather than all at once to avoid hitting th erate limit on my API
        const response = await fetch(`https://api.jolpi.ca/ergast/f1/${year}/constructors/mercedes/constructorStandings.json`)
        const data = await response.json()
        const standings = data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0]
        standingsData.push({
            year: year,
            points: parseFloat(standings.points),
            position: parseInt(standings.position)
        }) //pushes these three variables to the array, parsing points and position into floating numbers and integers to enable addition
        console.log(`Fetched standings for ${year}`)
    }

    localStorage.setItem("mercedesStandingsData", JSON.stringify(standingsData))
    return standingsData
}