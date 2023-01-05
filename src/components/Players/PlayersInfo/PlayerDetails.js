import React from "react";
import { useEffect, useState } from "react";
import { usePagination } from "../../../hooks/usePagination";
import { useFilter } from "../../../hooks/useFilter";

import styles from "./PlayerDetails.module.css";

import Match from "../../Matches/Match";
import Sort from "../../UI/Sort";
import PaginationLinks from "../../UI/PaginationLinks";
import Filter from "../../UI/Filter";

// Prepare rounds sorting
const roundsStrength = {
    round1: 1,
    round2: 2,
    quarterFinals: 3,
    semiFinals: 4,
    finals: 5
}

const PlayerDetails = ({ player, onShowPlayerMatches }) => {
    const [sortSelected, setSortSelected] = useState("Latest");
    const { paginationData, paginationPage, setPaginationPage } = usePagination(player.matches, 10);
    const [displayPlayerMatches, setDisplayPlayerMatches] = useState([...paginationPage]);
    const { filters, addFilterHandler, removeFilterHandler, filterHandler } = useFilter();
    const [matchesIcon, setMatchesIcon] = useState(false);
    
    const showMatchesIconHandler = e => {
        setMatchesIcon(true);
    }

    const hideMatchesIconHandler = e => {
        setMatchesIcon(false);
    }

    // Sort and display new paginationPage
    useEffect(() => {
        const filteredMatches = filterHandler([...paginationPage]);
        sortPlayerMatchesHandler({target: {value: sortSelected}}, filteredMatches);
    }, [paginationPage, sortSelected, filters])

    const sortPlayerMatchesHandler = (e, filteredMatches=[...paginationPage]) => {
        const playerMatchesCopy = filteredMatches;

        if(e.target.value === "Latest") {
            setDisplayPlayerMatches(playerMatchesCopy);
            setSortSelected("Latest");
        }

        if(e.target.value === "Oldest") {
            setDisplayPlayerMatches(playerMatchesCopy.reverse());
            setSortSelected("Oldest");
        }

        if(e.target.value === "Wins") {
            const wins = playerMatchesCopy.filter(match => {
                return match.winner === player.name;
            })

            const loses = playerMatchesCopy.filter(match => {
                return match.winner !== player.name;
            })

            setDisplayPlayerMatches([...wins, ...loses]);
            setSortSelected("Wins");
        }

        if(e.target.value === "Loses") {
            const wins = playerMatchesCopy.filter(match => {
                return match.winner === player.name;
            })

            const loses = playerMatchesCopy.filter(match => {
                return match.winner !== player.name;
            })

            setDisplayPlayerMatches([...loses, ...wins]);
            setSortSelected("Loses");
        }

        if(e.target.value === "Round >") {
            playerMatchesCopy.sort((a, b) => roundsStrength[a.round] - roundsStrength[b.round]);

            setDisplayPlayerMatches(playerMatchesCopy);
            setSortSelected("Round >");
        }

        if(e.target.value === "Round <") {
            playerMatchesCopy.sort((a, b) => roundsStrength[b.round] - roundsStrength[a.round]);

            setDisplayPlayerMatches(playerMatchesCopy);
            setSortSelected("Round <");
        }

        if(e.target.value === "Tournament >") {
            playerMatchesCopy.sort((a, b) => {
                if(a.tournamentName.toLowerCase() > b.tournamentName.toLowerCase()) {
                    return 1;
                } 
                if(a.tournamentName.toLowerCase() < b.tournamentName.toLowerCase()) {
                    return -1;
                }

                return 0;
            })

            setDisplayPlayerMatches(playerMatchesCopy);
            setSortSelected("Tournament >");
        }

        if(e.target.value === "Tournament <") {
            playerMatchesCopy.sort((a, b) => {
                if(a.tournamentName.toLowerCase() > b.tournamentName.toLowerCase()) {
                    return -1;
                } 
                if(a.tournamentName.toLowerCase() < b.tournamentName.toLowerCase()) {
                    return 1;
                }

                return 0;
            })

            setDisplayPlayerMatches(playerMatchesCopy);
            setSortSelected("Tournament <");
        }
    }

    return (
        <div className={styles.playerDetails}>
                <div className={styles.playerStats}>
                    <button 
                        className={styles.matchesButton} 
                        onClick={onShowPlayerMatches.bind(null, player)} 
                        onMouseEnter={showMatchesIconHandler} 
                        onMouseLeave={hideMatchesIconHandler}>
                        {matchesIcon ? <span className={styles.icon}>{"<"}</span> :  <span className={styles.icon}>{""}</span>}
                        {" Back"}
                    </button>
                    <h3>{player.name}'s stats</h3>
                    <div className={styles.playerStatsTable}>
                        <div className={styles.playerStatsTableRow}>
                            <div>Rank</div>
                            <div>Points</div>
                            <div title="Tournaments Won">T Won</div>
                        </div>
                        <div className={styles.playerStatsTableRow}>
                            <div>{player.rank}</div>
                            <div>{player.points}</div>
                            <div>{player.tournamentsWon}</div>
                        </div>
                        <div className={styles.playerStatsTableRow}>
                            <div>Wins</div>
                            <div>Loses</div>
                            <div>Winrate</div>
                        </div>
                        <div className={styles.playerStatsTableRow}>
                            <div>{player.wins}</div>
                            <div>{player.loses}</div>
                            <div>{player.winrate}%</div>
                        </div>
                    </div>
                </div>
                <div className={styles.sortFilterMatchesContainer}>
                    <div className={styles.sortFilterContainer}>
                        <div className={styles.positionSticky}>
                            <h3>Sort and Filter {player.name}'s matches</h3>
                            <Sort onChangeSort={sortPlayerMatchesHandler} options={["Latest", "Oldest", "Wins", "Loses", "Round >", "Round <", "Tournament >", "Tournament <"]} />
                            <Filter 
                                config={
                                    [
                                        { groupName: "Tournament Round", propertyToFilter: "round", valuesToFilter: ["round1", "round2", "quarterFinals", "semiFinals", "finals"] },
                                        { groupName: "Tournament Series", propertyToFilter: "tournamentSeries", valuesToFilter: ["250", "500", "1000", "Super"] },
                                        { groupName: "Match Outcome", propertyToFilter: "matchOutcome", valuesToFilter: ["Win", "Lost"] }
                                    ]
                                }
                                onAddFilter={addFilterHandler}
                                onRemoveFilter={removeFilterHandler}
                            />
                        </div>
                    </div>
                    <div className={styles.matchesContainer}>
                        <div className={styles.matchesList}>
                            <h3>{player.name}'s matches</h3>
                            
                            {displayPlayerMatches.map(match => {
                                return (
                                    <Match match={match} badge={player.name === match.winner ? "Win" : "Lost"} />
                                )
                            })}
                        </div> 
                        <PaginationLinks paginationData={paginationData} paginationPage={paginationPage} setPaginationPage={setPaginationPage} />
                    </div>
                    
                </div>  
        </div>
    );
}

export default PlayerDetails;