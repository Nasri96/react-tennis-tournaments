import React, { forwardRef } from "react";

import styles from "./TournamentMatch.module.css";

const TournamentMatch = forwardRef(({ match, matchesLiveUpdates }, ref) => {

    return (
        <div className={styles.match} ref={ref}>
            <div className={match.loser === match.p1.name ? `${styles.matchPlayer} ${styles.loser}` : styles.matchPlayer}>
                {matchesLiveUpdates &&  
                    <React.Fragment>
                    {match.winner &&
                        <React.Fragment>
                            <span className={styles.playerName}>{match.p1.name}</span> 
                            <span className={styles.playerSetsWon}>{match.matchStats.overview[0].sets}</span>
                            <span className={styles.playerGemsWon}>
                                {match.matchStats.overview[0].setGemsWon.map(gems => <span>{gems}</span>)}
                            </span>
                        </React.Fragment>
                    }
                    {!match.winner &&
                        <React.Fragment>
                            <span className={styles.playerName}>{match.p1.name}</span> 
                            {!match.rules.tiebreak &&
                                <span className={styles.playerPoints}>{match.matchStats.overview[0].point}</span>
                            }
                            {match.rules.tiebreak &&
                                <span className={styles.playerPoints}>{match.matchStats.overview[0].tiebreakPoint}</span>
                            }
                            <span className={styles.playerCurrentGems}>{match.matchStats.overview[0].gems}</span>
                            <span className={styles.playerGemsWon}>
                                {match.matchStats.overview[0].setGemsWon.map(gems => <span>{gems}</span>)}
                            </span>
                        </React.Fragment>
                    }
                    </React.Fragment>  
                }
                {!matchesLiveUpdates &&
                    <React.Fragment>
                        <span className={styles.playerName}>{match.p1.name}</span> 
                        <span className={styles.playerSetsWon}>{match.matchStats.overview[0].sets}</span>
                        <span className={styles.playerGemsWon}>
                            {match.matchStats.overview[0].setGemsWon.map(gems => <span>{gems}</span>)}
                        </span>
                    </React.Fragment>
                }
            </div>
            <div className={match.loser === match.p2.name ? `${styles.matchPlayer} ${styles.loser}` : styles.matchPlayer}>
                {matchesLiveUpdates &&  
                    <React.Fragment>
                    {match.winner &&
                        <React.Fragment>
                            <span className={styles.playerName}>{match.p2.name}</span> 
                            <span className={styles.playerSetsWon}>{match.matchStats.overview[1].sets}</span>
                            <span className={styles.playerGemsWon}>
                                {match.matchStats.overview[1].setGemsWon.map(gems => <span>{gems}</span>)}
                            </span>
                        </React.Fragment>
                    }
                    {!match.winner &&
                        <React.Fragment>
                            <span className={styles.playerName}>{match.p2.name}</span> 
                            {!match.rules.tiebreak &&
                                <span className={styles.playerPoints}>{match.matchStats.overview[1].point}</span>
                            }
                            {match.rules.tiebreak &&
                                <span className={styles.playerPoints}>{match.matchStats.overview[1].tiebreakPoint}</span>
                            }
                            <span className={styles.playerCurrentGems}>{match.matchStats.overview[1].gems}</span>
                            <span className={styles.playerGemsWon}>
                            {match.matchStats.overview[1].setGemsWon.map(gems => <span>{gems}</span>)}
                        </span>
                        </React.Fragment>
                    }
                    </React.Fragment>  
                }
                {!matchesLiveUpdates &&
                    <React.Fragment>
                        <span className={styles.playerName}>{match.p2.name}</span> 
                        <span className={styles.playerSetsWon}>{match.matchStats.overview[1].sets}</span>
                        <span className={styles.playerGemsWon}>
                            {match.matchStats.overview[1].setGemsWon.map(gems => <span>{gems}</span>)}
                        </span>
                    </React.Fragment>
                }
            </div>
        </div>
    )
})

export default TournamentMatch;