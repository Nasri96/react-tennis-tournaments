import React, { useState, useContext, useEffect } from "react";

import TournamentItem from "../TournamentItem/TournamentItem";
import TournamentCard from "./TournamentCard";
import AppContext from "../../../store/app-context";
import Sort from "../../UI/Sort";
import { usePagination } from "../../../hooks/usePagination";
import PaginationPageLinks from "../../../hooks/usePagination";

import styles from "./TournamentList.module.css";

const TournamentList = () => {
    const { tournaments } = useContext(AppContext);
    const [displayTournament, setDisplayTournament] = useState(false);
    const [sortSelected, setSortSelected] = useState("Default");
    const { paginationData, paginationPage, setPaginationPage } = usePagination(tournaments, 5);
    const [displayTournaments, setDisplayTournaments] = useState([...paginationPage]);

    // Sort and display new paginationPage
    useEffect(() => {
        sortTournamentsHandler({target: {value: sortSelected}});
    }, [paginationPage])

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
        const paginationPageCopy = [...paginationPage];

        if(e.target.value === "Default") {
            setDisplayTournaments(paginationPageCopy);   
            setSortSelected("Default");
        }
        
        if(e.target.value === "Name >") {
            paginationPageCopy.sort((a, b) => {
                if(a.name.toLowerCase() > b.name.toLowerCase()) {
                    return 1;
                }
                if(a.name.toLowerCase() < b.name.toLowerCase()) {
                    return -1;
                }

                return 0;
            })

            setDisplayTournaments(paginationPageCopy); 
            setSortSelected("Name >");
        }

        if(e.target.value === "Name <") {
            paginationPageCopy.sort((a, b) => {
                if(a.name.toLowerCase() > b.name.toLowerCase()) {
                    return -1;
                }
                if(a.name.toLowerCase() < b.name.toLowerCase()) {
                    return 1;
                }

                return 0;
            })

            setDisplayTournaments(paginationPageCopy); 
            setSortSelected("Name <");
        }

        if(e.target.value === "Series >") {
            paginationPageCopy.sort((a, b) => {
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

            setDisplayTournaments(paginationPageCopy); 
            setSortSelected("Series >");
        }

        if(e.target.value === "Series <") {
            paginationPageCopy.sort((a, b) => {
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

            setDisplayTournaments(paginationPageCopy); 
            setSortSelected("Series <");
        }
    }

    return (
        <div>
            {tournaments.length === 0 &&
                <p>Looks like you didn't create any tournament yet. Go to Create New Tournament tab and start creating tournaments.</p>
            }
            {tournaments.length !== 0 && !displayTournament &&
                <React.Fragment>
                    <Sort onChangeSort={sortTournamentsHandler} options={["Default", "Name >", "Name <", "Series >", "Series <"]} selected={sortSelected} />
                    <div className={styles.tournamentList}>
                        {displayTournaments.map(tournament => {
                                return ( 
                                    <TournamentCard tournament={tournament} onSetDisplayTournament={setDisplayTournamentHandler} />
                                )
                        })}
                    </div>
                    <PaginationPageLinks paginationData={paginationData} paginationPage={paginationPage} setPaginationPage={setPaginationPage} />
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