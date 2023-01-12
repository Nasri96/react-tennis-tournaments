import React, { useState, useContext, useEffect } from "react";
import { usePagination } from "../../../hooks/usePagination";
import { useFilter } from "../../../hooks/useFilter";

import { useRef } from "react";

import AppContext from "../../../store/app-context";

import styles from "./TournamentList.module.css";
import containerStyles from "./../../UI/Container.module.css";

import TournamentItem from "../TournamentItem/TournamentItem";
import TournamentCard from "./TournamentCard";
import Sort from "../../UI/Sort";
import Filter from "../../UI/Filter";
import PaginationLinks from "../../UI/PaginationLinks";


const TournamentList = () => {
    const { tournaments } = useContext(AppContext);
    const [displayTournament, setDisplayTournament] = useState(false);
    const [sortSelected, setSortSelected] = useState("Latest");
    const { paginationData, paginationPage, setPaginationPage } = usePagination(tournaments, 12);
    const [displayTournaments, setDisplayTournaments] = useState([]);
    const { filters, addFilterHandler, removeFilterHandler, filterHandler } = useFilter();
    const tournamentsRef = useRef();

    // Scroll after pagination page is clicked
    const scrollToContainerHandler = e => {
        tournamentsRef.current.scrollIntoView({
            behavior: "smooth"
        })
    }

    // Sort and display new paginationPage
    useEffect(() => {
        const filteredMatches = filterHandler([...paginationPage]);
        // console.log(filteredMatches);
        sortTournamentsHandler({target: {value: sortSelected}}, filteredMatches);
    }, [paginationPage, sortSelected, filters])

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

        if(e.target.value === "Latest") {
            setDisplayTournaments(tournamentsCopy);   
            setSortSelected("Latest");
        }

        if(e.target.value === "Oldest") {
            setDisplayTournaments(tournamentsCopy.reverse());   
            setSortSelected("Oldest");
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
        <div className={containerStyles.sidebarContent}>
            {tournaments.length === 0 &&
                <div className={styles.tournamentContainer}>
                    <p className={styles.textNoTournament}>Looks like you didn't create any tournament yet. Go to Create New Tournament tab and start creating tournaments.</p>
                </div>
            }
            {tournaments.length !== 0 && !displayTournament &&
                <React.Fragment>
                    <div className={styles.sortFilterContainer}>
                        <Sort onChangeSort={sortTournamentsHandler} options={["Latest", "Oldest", "Name >", "Name <", "Series >", "Series <"]} selected={sortSelected} />
                        <Filter
                            config={
                                [
                                    { groupName: "Tournament Series", propertyToFilter: "series", valuesToFilter: ["250", "500", "1000", "Super"] },
                                    { groupName: "Tournament Surface", propertyToFilter: "surface", valuesToFilter: ["Clay", "Grass", "Hard"] }
                                ]
                            }
                            onAddFilter={addFilterHandler}
                            onRemoveFilter={removeFilterHandler}
                        />
                    </div>
                    <div ref={tournamentsRef} className={styles.tournamentListContainer}>
                        <h3 className={styles.heading}>Tournaments</h3>
                        <div className={styles.tournamentList}>
                            {displayTournaments.map(tournament => {
                                    return ( 
                                        <TournamentCard key={tournament.id} tournament={tournament} onSetDisplayTournament={setDisplayTournamentHandler} />
                                    )
                            })}
                        </div>

                        <PaginationLinks onScroll={scrollToContainerHandler} paginationData={paginationData} paginationPage={paginationPage} setPaginationPage={setPaginationPage} />
                    </div>
                </React.Fragment>
            }
            {tournaments.length !== 0 && displayTournament &&
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
            }
        </div>
    );
}

export default TournamentList;