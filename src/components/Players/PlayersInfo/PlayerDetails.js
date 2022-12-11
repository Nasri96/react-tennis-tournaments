import styles from "./PlayerDetails.module.css";

import Match from "../../Matches/Match";
import Sort from "../../UI/Sort";
import { useState } from "react";

const PlayerDetails = ({ player, isMobile }) => {
    const [displayMatches, setDisplayMatches] = useState(player.matches);

    // Prepare rounds sorting
    const roundsStrength = {
        round1: 1,
        round2: 2,
        quarterFinals: 3,
        semiFinals: 4,
        finals: 5
    }

    const sortPlayerMatchesHandler = e => {
        const originalMatches = player.matches.slice();

        if(e.target.value === "Default") {
            setDisplayMatches(originalMatches);
        }

        if(e.target.value === "Wins") {
            const wins = originalMatches.filter(match => {
                return match.winner === player.name;
            })

            const loses = originalMatches.filter(match => {
                return match.winner !== player.name;
            })

            setDisplayMatches([...wins, ...loses]);
        }

        if(e.target.value === "Loses") {
            const wins = originalMatches.filter(match => {
                return match.winner === player.name;
            })

            const loses = originalMatches.filter(match => {
                return match.winner !== player.name;
            })

            setDisplayMatches([...loses, ...wins]);
        }

        if(e.target.value === "Round >") {
            originalMatches.sort((a, b) => roundsStrength[a.round] - roundsStrength[b.round]);

            setDisplayMatches(originalMatches);
        }

        if(e.target.value === "Round <") {
            originalMatches.sort((a, b) => roundsStrength[b.round] - roundsStrength[a.round]);

            setDisplayMatches(originalMatches);
        }

        if(e.target.value === "Tournament >") {
            originalMatches.sort((a, b) => {
                if(a.tournamentName.toLowerCase() > b.tournamentName.toLowerCase()) {
                    return 1;
                } 
                if(a.tournamentName.toLowerCase() < b.tournamentName.toLowerCase()) {
                    return -1;
                }

                return 0;
            })

            setDisplayMatches(originalMatches);
        }

        if(e.target.value === "Tournament <") {
            originalMatches.sort((a, b) => {
                if(a.tournamentName.toLowerCase() > b.tournamentName.toLowerCase()) {
                    return -1;
                } 
                if(a.tournamentName.toLowerCase() < b.tournamentName.toLowerCase()) {
                    return 1;
                }

                return 0;
            })

            setDisplayMatches(originalMatches);
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
                {displayMatches.map(match => {
                    return (
                        <Match match={match} badge={player.name === match.winner ? "Win" : "Lost"} />
                    )
                })}
            </div>
        </div>
    );
}

export default PlayerDetails;