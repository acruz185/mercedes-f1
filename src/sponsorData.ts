import { asset } from './utils'
export type Sponsor = {
    name: string
    logo: string
    category: string
}

export const SPONSORS: Sponsor[] = [
    { name: "Petronas", logo: asset("sponsors/petronas.png"), category: "Title Sponsor" },
    { name: "INEOS", logo: asset("sponsors/ineos.png"), category: "Co-Title Sponsor" },
    { name: "Tommy Hilfiger", logo: asset("sponsors/tommy.png"), category: "Official Partner" },
    { name: "AMD", logo: asset("sponsors/amd.png"), category: "Official Partner" },
    { name: "SAP", logo: asset("sponsors/sap.png"), category: "Official Partner" },
    { name: "IWC Schaffhausen", logo: asset("sponsors/iwc.png"), category: "Official Partner" },
    { name: "Crowdstrike", logo: asset("sponsors/crowdstrike.png"), category: "Official Partner" },
    { name: "Qualcomm", logo: asset("sponsors/qualcomm.png"), category: "Official Partner" }
]