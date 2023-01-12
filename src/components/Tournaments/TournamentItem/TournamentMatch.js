import React, { forwardRef } from "react";

import styles from "./TournamentMatch.module.css";

import { nanoid } from "nanoid";

const TournamentMatch = forwardRef(({ match, matchesLiveUpdates }, ref) => {
    const players = [match.p1, match.p2];
    
    return (
        <div className={styles.match} ref={ref}>
            {players.map(player => {
                return (
                    <div key={nanoid()} className={match.loser === player.name ? `${styles.matchPlayer} ${styles.loser}` : styles.matchPlayer} >
                        {matchesLiveUpdates &&  
                            <React.Fragment>
                            {match.winner &&
                                <React.Fragment>
                                    <span className={styles.playerName}>{player.name}</span> 
                                    <span className={styles.playerSetsWon}>{player.matchStats.setsWon}</span>
                                    <span className={styles.playerGemsWon}>
                                        {player.matchStats.gemsInIndividualSetsWon.map(gems => <span key={nanoid()}>{gems}</span>)}
                                    </span>
                                </React.Fragment>
                            }
                            {!match.winner &&
                                <React.Fragment>
                                    <span className={styles.playerName}>{player.name}</span> 
                                    {!match.rules.tiebreak &&
                                        <span className={styles.playerPoints}>{player.matchStats.currentPoints}</span>
                                    }
                                    {match.rules.tiebreak &&
                                        <span className={styles.playerPoints}>{player.matchStats.currentTiebreakPoints}</span>
                                    }
                                    <span className={styles.playerCurrentGems}>{player.matchStats.gemsInCurrentSetWon}</span>
                                    <span className={styles.playerGemsWon}>
                                        {player.matchStats.gemsInIndividualSetsWon.map(gems => <span key={nanoid()}>{gems}</span>)}
                                    </span>
                                </React.Fragment>
                            }
                            </React.Fragment>  
                        }
                        {!matchesLiveUpdates &&
                            <React.Fragment>
                                <span className={styles.playerName}>{player.name}</span> 
                                <span className={styles.playerSetsWon}>{player.matchStats.setsWon}</span>
                                <span className={styles.playerGemsWon}>
                                    {player.matchStats.gemsInIndividualSetsWon.map(gems => <span key={nanoid()}>{gems}</span>)}
                                </span>
                            </React.Fragment>
                        }
                    </div>
                )
            })}
        </div>
    )
})

export default TournamentMatch;