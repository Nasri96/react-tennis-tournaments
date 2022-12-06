import { createContext } from "react";

export const AppContext = createContext({
    tournaments: [],
    setTournaments: () => {},
    activeTournament: Boolean, 
    setActiveTournament: () => {}
})

export default AppContext;