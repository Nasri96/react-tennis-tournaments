import { createContext } from "react";

export const AppContext = createContext({
    players : [],
    tournaments: [],
    matches: [],
    setTournaments: () => {},
    activeTournament: Boolean, 
    setActiveTournament: () => {},
    TournamentConstructor: () => {},
})

export default AppContext;