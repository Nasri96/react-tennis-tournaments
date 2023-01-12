import React, { forwardRef, useRef } from "react";

import styles from "./TournamentBrackets.module.css";

import TournamentMatch from "./TournamentMatch";

import { nanoid } from "nanoid";

const TournamentBrackets = forwardRef(({ activeTournament, tournamentIsFinished, matchesLiveUpdates, transformText }, ref) => {
    const scrollContainer = useRef("");
    /* SCROLL EFFECT */
    let isDraggingLeftClick = false;
    let startX, scrollLeft;

    const mousedownHandler = e => {
        isDraggingLeftClick = true;
        startX = e.pageX - scrollContainer.current.offsetLeft;
        scrollLeft = scrollContainer.current.scrollLeft;
    }

    const mouseupHandler = e => {
        isDraggingLeftClick = false;
    }

    const mousemoveHandler = e => {
        if(isDraggingLeftClick) {
            const x = e.pageX - scrollContainer.current.offsetLeft;
            const scroll = x - startX;
            scrollContainer.current.scrollLeft = scrollLeft - scroll;
        }
    }

    const getPlayedRounds = () => {
        const playedRounds = Object.keys(activeTournament.matches).filter(round => {
            return activeTournament.matches[round].length > 0;
        })

        return playedRounds;
    }

    return (
        <React.Fragment>
            <p className={styles.text}>BRACKETS</p>
            <div className={styles.brackets} onMouseMove={mousemoveHandler} onMouseDown={mousedownHandler} onMouseUp={mouseupHandler} ref={scrollContainer}>
                <div className={styles.roundContainer}>
                    {getPlayedRounds().map(round => {
                        return (
                                <h4 key={nanoid()} className={`${styles.round} ${styles.roundHeading}`}>{transformText(round)}</h4>
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
                            <div key={nanoid()} className={styles.round}>
                                {activeTournament.matches[round].map(match => {
                                    return (
                                        <TournamentMatch key={nanoid()} match={match} matchesLiveUpdates={matchesLiveUpdates} />
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
                                    <TournamentMatch key={nanoid()} ref={i === 0 ? ref : null} match={match} matchesLiveUpdates={matchesLiveUpdates} />
                                )
                            })}
                        </div>
                    }
                </div>
                <div className={styles.roundContainer}>
                    {getPlayedRounds().map(round => {
                        return (
                                <h4 key={nanoid()} className={`${styles.round} ${styles.roundHeading}`}>{transformText(round)}</h4>
                        )
                    })}
                    {!tournamentIsFinished &&
                        <h4 className={`${styles.round} ${styles.roundHeading}`}>{transformText(activeTournament.rounds[activeTournament.currentRound])}</h4>
                    }
                </div>
            </div>
        </React.Fragment>
    )
})

export default TournamentBrackets;