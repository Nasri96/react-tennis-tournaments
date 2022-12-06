import { useState, useEffect } from "react";

import AppContext from "./app-context";

// tournament simulation files
import { players } from "../simulation/player";
import { Tournament as TournamentConstructor } from "../simulation/tournament";

const AppProvider = props => {
    const [tournaments, setTournaments] = useState([]); 
    const [activeTournament, setActiveTournament] = useState(false);

    // After tournament is finished, save finished tournament
    useEffect(() => {
        let timer;
        if(activeTournament) {
            timer = setInterval(() => {
                console.log("Checking winner!");
                if(activeTournament.winner) {
                    setActiveTournament(false);
                    setTournaments(tournaments => {
                        return [...tournaments, activeTournament];
                    })
                }
            }, 500)
        }

        return () => {
            clearInterval(timer);
        }

    }, [activeTournament.winner, activeTournament, setActiveTournament, setTournaments])

    const context = {
        tournaments,
        setTournaments,
        activeTournament,
        setActiveTournament,
        players,
        TournamentConstructor
    }

    return (
        <AppContext.Provider value={context}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppProvider;