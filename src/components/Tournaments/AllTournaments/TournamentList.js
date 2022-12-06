import React, { useState, useContext, useEffect } from "react";

import TournamentItem from "../TournamentItem/TournamentItem";
import TournamentCard from "./TournamentCard";
import AppContext from "../../../store/app-context";

import styles from "./TournamentList.module.css";

const TournamentList = () => {
    const { tournaments } = useContext(AppContext);
    const [displayTournament, setDisplayTournament] = useState(false);

    // reset display tournament state when component unmounts
    useEffect(() => {
        return () => {
            setDisplayTournament(false);
        }
    }, [])

    // Set/unset tournament for <TournamentItem /> component
    const setDisplayTournamentHandler = tournament => {
        if(!displayTournament) {
            setDisplayTournament(tournament);
        } else {
            setDisplayTournament(false);
        }
    }

    return (
        <div>
            {tournaments.length === 0 &&
                <p>Looks like you didn't create any tournament yet. Go to Create New Tournament tab and start creating tournaments.</p>
            }
            {tournaments.length !== 0 && !displayTournament &&
                <div className={styles.tournamentList}>
                    {tournaments.map(tournament => {
                            return ( 
                                <TournamentCard tournament={tournament} onSetDisplayTournament={setDisplayTournamentHandler} />
                            )
                    })}
                </div>
            }
            {tournaments.length !== 0 && displayTournament &&
            <React.Fragment>
                <div className={styles.tournamentContainer}>
                    <TournamentItem 
                        activeTournament={displayTournament}
                        displayTournament={displayTournament}
                        onSetDisplayTournament={setDisplayTournamentHandler}
                        currentRound={displayTournament.rounds[displayTournament.currentRound]}
                        tournamentIsFinished={true}
                        matchesLiveUpdates={false}
                        onTournamentSimulateRound={null}
                        tournamentSimulationSpeed={null}
                        onTournamentSimulationSpeed={null}
                        ref={null}
                    />
                </div>
            </React.Fragment>
                
            }
        </div>
    );
}

export default TournamentList;