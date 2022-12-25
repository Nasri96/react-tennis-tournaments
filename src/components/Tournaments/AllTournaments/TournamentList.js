import React, { useState, useContext, useEffect } from "react";

import TournamentItem from "../TournamentItem/TournamentItem";
import TournamentCard from "./TournamentCard";
import AppContext from "../../../store/app-context";
import Sort from "../../UI/Sort";
import { usePagination } from "../../../hooks/usePagination";
import PaginationPageLinks from "../../../hooks/usePagination";
import { useFilter } from "../../../hooks/useFilter";
import Filter from "../../UI/Filter";

import styles from "./TournamentList.module.css";

const TournamentList = () => {
    const { tournaments } = useContext(AppContext);
    const [displayTournament, setDisplayTournament] = useState(false);
    const [sortSelected, setSortSelected] = useState("Default");
    const { paginationData, paginationPage, setPaginationPage } = usePagination(tournaments, 5);
    const [displayTournaments, setDisplayTournaments] = useState([]);
    const { filterValues, getCheckboxValuesHandler, filterHandler } = useFilter();

    // Sort and display new paginationPage
    useEffect(() => {
        const filteredMatches = filterHandler([...paginationPage]);
        console.log(filteredMatches);
        sortTournamentsHandler({target: {value: sortSelected}}, filteredMatches);
    }, [paginationPage, filterValues])

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
    const sortTournamentsHandler = (e, filteredPlayers=[...paginationPage]) => {
        const tournamentsCopy = filteredPlayers;

        if(e.target.value === "Default") {
            setDisplayTournaments(tournamentsCopy);   
            setSortSelected("Default");
        }
        
        if(e.target.value === "Name >") {
            tournamentsCopy.sort((a, b) => {
                if(a.name.toLowerCase() > b.name.toLowerCase()) {
                    return 1;
                }
                if(a.name.toLowerCase() < b.name.toLowerCase()) {
                    return -1;
                }

                return 0;
            })

            setDisplayTournaments(tournamentsCopy); 
            setSortSelected("Name >");
        }

        if(e.target.value === "Name <") {
            tournamentsCopy.sort((a, b) => {
                if(a.name.toLowerCase() > b.name.toLowerCase()) {
                    return -1;
                }
                if(a.name.toLowerCase() < b.name.toLowerCase()) {
                    return 1;
                }

                return 0;
            })

            setDisplayTournaments(tournamentsCopy); 
            setSortSelected("Name <");
        }

        if(e.target.value === "Series >") {
            tournamentsCopy.sort((a, b) => {
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

            setDisplayTournaments(tournamentsCopy); 
            setSortSelected("Series >");
        }

        if(e.target.value === "Series <") {
            tournamentsCopy.sort((a, b) => {
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

            setDisplayTournaments(tournamentsCopy); 
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
                    <Filter
                        filters={
                            [
                                { filterName: "Tournament Series", filterKey: "series", checkboxNames: ["250", "500", "1000", "Super"] }
                            ]
                        }
                        onGetCheckboxValues={getCheckboxValuesHandler}
                    />
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