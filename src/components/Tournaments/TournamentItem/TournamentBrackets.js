import React, { forwardRef } from "react";

import TournamentMatch from "./TournamentMatch";

import styles from "./TournamentBrackets.module.css";

const TournamentBrackets = forwardRef(({ activeTournament, tournamentIsFinished, matchesLiveUpdates, transformText }, ref) => {
    const getPlayedRounds = () => {
        const playedRounds = Object.keys(activeTournament.matches).filter(round => {
            return activeTournament.matches[round].length > 0;
        })

        return playedRounds;
    }

    return (
        <React.Fragment>
            <p className={styles.text}>BRACKETS</p>
            <div className={styles.brackets}>
                <div className={styles.roundContainer}>
                    {getPlayedRounds().map(round => {
                        return (
                                <h4 className={`${styles.round} ${styles.roundHeading}`}>{transformText(round)}</h4>
                        )
                    })}
                    {!tournamentIsFinished &&
                        <h4 className={`${styles.round} ${styles.roundHeading}`}>{transformText(activeTournament.rounds[activeTournament.currentRound])}</h4>
                    }
                </div>
                <div className={styles.roundContainer}>
                    {activeTournament.matches.round1.length > 0 && 
                    <React.Fragment>
                        {getPlayedRounds().map(round => {
                        return (
                            <div className={styles.round}>
                                {activeTournament.matches[round].map(match => {
                                    return (
                                        <TournamentMatch match={match} matchesLiveUpdates={matchesLiveUpdates} />
                                    )
                                })}
                            </div>
                        )
                    })}
                    </React.Fragment>
                    }
                    {!tournamentIsFinished &&
                        <div className={styles.round}>
                            {activeTournament.nextRoundMatches.map((match, i) => {
                                return (
                                    <TournamentMatch ref={i === 0 ? ref : null} match={match} matchesLiveUpdates={matchesLiveUpdates} />
                                )
                            })}
                        </div>
                    }
                </div>
            </div>
        </React.Fragment>
    )
})

export default TournamentBrackets;