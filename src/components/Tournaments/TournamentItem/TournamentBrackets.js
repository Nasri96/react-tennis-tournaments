import React from "react";

import TournamentMatch from "./TournamentMatch";

import styles from "./TournamentBrackets.module.css";

const TournamentBrackets = ({ tournament, tournamentIsFinished, matchesLiveUpdates, transformText }) => {
    const getPlayedRounds = () => {
        const playedRounds = Object.keys(tournament.matches).filter(round => {
            return tournament.matches[round].length > 0;
        })

        return playedRounds;
    }

    return (
        <React.Fragment>
            <p className={styles.text}>MATCHES</p>
            <div className={styles.brackets}>
                <div className={styles.roundContainer}>
                    {getPlayedRounds().map(round => {
                        return (
                                <h4 className={`${styles.round} ${styles.roundHeading}`}>{transformText(round)}</h4>
                        )
                    })}
                    {!tournamentIsFinished &&
                        <h4 className={`${styles.round} ${styles.roundHeading}`}>{transformText(tournament.rounds[tournament.currentRound])}</h4>
                    }
                </div>
                <div className={styles.roundContainer}>
                {tournament.matches.round1.length > 0 && 
                <React.Fragment>
                    {getPlayedRounds().map(round => {
                    return (
                        <div className={styles.round}>
                            {tournament.matches[round].map(match => {
                                return (
                                    <TournamentMatch match={match} />
                                )
                            })}
                        </div>
                    )
                })}
                </React.Fragment>
                }
                {!tournamentIsFinished &&
                    <div className={styles.round}>
                        {tournament.nextRoundMatches.map(match => {
                            return (
                                <TournamentMatch match={match} matchesLiveUpdates={matchesLiveUpdates} />
                            )
                        })}
                    </div>
                }
            </div>
            </div>
            
        </React.Fragment>
        
    )
}

export default TournamentBrackets;