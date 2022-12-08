import React, { useState, useContext, useEffect } from "react";

import TournamentItem from "../TournamentItem/TournamentItem";
import TournamentCard from "./TournamentCard";
import AppContext from "../../../store/app-context";
import Sort from "../../UI/Sort";

import styles from "./TournamentList.module.css";

const TournamentList = () => {
    const { tournaments } = useContext(AppContext);
    const [displayTournament, setDisplayTournament] = useState(false);
    const [displayTournaments, setDisplayTournaments] = useState(tournaments);

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

    // Sort tournaments handler
    const sortTournamentsHandler = e => {
        const originalTournaments = tournaments.slice();

        if(e.target.value === "Default") {
            setDisplayTournaments(originalTournaments);   
        }
        
        if(e.target.value === "Name >") {
            originalTournaments.sort((a, b) => {
                if(a.name.toLowerCase() > b.name.toLowerCase()) {
                    return 1;
                }
                if(a.name.toLowerCase() < b.name.toLowerCase()) {
                    return -1;
                }

                return 0;
            })

            setDisplayTournaments(originalTournaments); 
        }

        if(e.target.value === "Name <") {
            originalTournaments.sort((a, b) => {
                if(a.name.toLowerCase() > b.name.toLowerCase()) {
                    return -1;
                }
                if(a.name.toLowerCase() < b.name.toLowerCase()) {
                    return 1;
                }

                return 0;
            })

            setDisplayTournaments(originalTournaments); 
        }

        if(e.target.value === "Series >") {
            originalTournaments.sort((a, b) => {
                let seriesA = parseInt(a.series);
                let seriesB = parseInt(b.series);
                if(isNaN(seriesA)) {
                    seriesA = 1000000000;
                }
                if(isNaN(seriesB)) {
                    seriesB = 1000000000;
                }

                return seriesA - seriesB;
            })

            setDisplayTournaments(originalTournaments); 
        }

        if(e.target.value === "Series <") {
            originalTournaments.sort((a, b) => {
                let seriesA = parseInt(a.series);
                let seriesB = parseInt(b.series);
                if(isNaN(seriesA)) {
                    seriesA = 1000000000;
                }
                if(isNaN(seriesB)) {
                    seriesB = 1000000000;
                }

                return seriesB - seriesA;
            })

            setDisplayTournaments(originalTournaments); 
        }
    }

    return (
        <div>
            {tournaments.length === 0 &&
                <p>Looks like you didn't create any tournament yet. Go to Create New Tournament tab and start creating tournaments.</p>
            }
            {tournaments.length !== 0 && !displayTournament &&
                <React.Fragment>
                    <Sort onChangeSort={sortTournamentsHandler} options={["Default", "Name >", "Name <", "Series >", "Series <"]} />
                    <div className={styles.tournamentList}>
                        {displayTournaments.map(tournament => {
                                return ( 
                                    <TournamentCard tournament={tournament} onSetDisplayTournament={setDisplayTournamentHandler} />
                                )
                        })}
                    </div>
                </React.Fragment>
                
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