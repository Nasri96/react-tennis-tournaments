import { useState, useEffect } from "react";

import AppContext from "./app-context";

// tournament simulation stuff
import { Player } from "../simulation/player";
import { Tournament as TournamentConstructor } from "../simulation/tournament";
const { players } = Player;

const AppProvider = props => {
    const [tournaments, setTournaments] = useState([]); 
    const [matches, setMatches] = useState([]);
    const [activeTournament, setActiveTournament] = useState(false);

    // Save matches played at tournament
    const saveTournamentMatches = tournament => {
        for(let round in tournament.matches) {
            tournament.matches[round].forEach(match => {
                setMatches(matches => {
                    return [match, ...matches];
                })
            })
        }
    }

    // Tournament finished stuff
    useEffect(() => {
        let timer;
        if(activeTournament) {
            timer = setInterval(() => {
                console.log("Checking winner!");
                if(activeTournament.winner) {
                    setActiveTournament(false);
                    setTournaments(tournaments => {
                        return [activeTournament, ...tournaments];
                    })
                    saveTournamentMatches(activeTournament);
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
        TournamentConstructor,
        matches
    }

    return (
        <AppContext.Provider value={context}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppProvider;