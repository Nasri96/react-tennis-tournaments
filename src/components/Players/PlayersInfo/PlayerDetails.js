import { useEffect, useState } from "react";

import styles from "./PlayerDetails.module.css";

import Match from "../../Matches/Match";
import Sort from "../../UI/Sort";
import { usePagination } from "../../../hooks/usePagination";
import PaginationPageLinks from "../../../hooks/usePagination";

// Prepare rounds sorting
const roundsStrength = {
    round1: 1,
    round2: 2,
    quarterFinals: 3,
    semiFinals: 4,
    finals: 5
}

const PlayerDetails = ({ player, isMobile }) => {
    const [sortSelected, setSortSelected] = useState("Default");
    const { paginationData, paginationPage, setPaginationPage } = usePagination(player.matches, 10);
    const [displayPlayerMatches, setDisplayPlayerMatches] = useState([...paginationPage]);

    // Sort and display new paginationPage
    useEffect(() => {
        sortPlayerMatchesHandler({target: {value: sortSelected}});
    }, [paginationPage])

    const sortPlayerMatchesHandler = e => {
        const playerMatchesCopy = [...paginationPage];

        if(e.target.value === "Default") {
            setDisplayPlayerMatches(playerMatchesCopy);
            setSortSelected("Default");
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
            {isMobile &&
                <div className={styles.playerStats}>
                    <h3>{player.name}'s stats</h3>
                    <div className={styles.playerStatsTable}>
                        <div className={styles.playerStatsTableRow}>
                            <div>Wins</div>
                            <div>Loses</div>
                            <div>Winrate</div>
                            <div title="Tournaments Won">T Won</div>
                        </div>
                        <div className={styles.playerStatsTableRow}>
                            <div>{player.wins}</div>
                            <div>{player.loses}</div>
                            <div>{player.winrate}%</div>
                            <div>{player.tournamentsWon}</div>
                        </div>
                    </div>
                </div>
            }
            <div className={styles.matchesList}>
                <h3>{player.name}'s matches</h3>
                <Sort onChangeSort={sortPlayerMatchesHandler} options={["Default", "Wins", "Loses", "Round >", "Round <", "Tournament >", "Tournament <"]} />
                {displayPlayerMatches.map(match => {
                    return (
                        <Match match={match} badge={player.name === match.winner ? "Win" : "Lost"} />
                    )
                })}
            </div>
            <PaginationPageLinks paginationData={paginationData} paginationPage={paginationPage} setPaginationPage={setPaginationPage} />
        </div>
    );
}

export default PlayerDetails;