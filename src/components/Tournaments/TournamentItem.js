import React, { useEffect } from "react";

import styles from "./TournamentItem.module.css";

const TournamentItem = ({ onSimulateRoundHandler: simulateRoundHandler, tournament, setTournament, currentRound, tournamentIsFinished, tournamentSimulationSpeed, onTournamentSimulationSpeedHandler }) => {
    // Make tournament disappear after it is finished, after 10 seconds
    useEffect(() => {
        if(tournamentIsFinished) {
            setTimeout(() => {
                setTournament(false);
            }, 10000);
        }
    }, [tournamentIsFinished, setTournament])

    // transform text rounds => round1 to Round 1, quarterFinals to Quarter Finals
    const transformText = string => {
        if(string.indexOf("round") !== -1) {
            const begginingStr = string.substring(0, 1).toUpperCase();
            const middleStr = string.substring(1, string.length - 1);
            const endStr = string.substring(string.length - 1);
    
            const newStr = begginingStr.concat(middleStr, " ", endStr);
    
            return newStr;
        } 
        else if(string.toLowerCase().indexOf("finals") !== -1) {
            const finalsIndex = string.toLowerCase().indexOf("finals");
            const begginingStr = `${string[0].toUpperCase()}${string.substring(1, finalsIndex)}`;
            const endStr = string.substring(finalsIndex, string.length);

            const newStr = begginingStr.concat(" ", endStr);

            if(string.toLowerCase() === "finals") {
                return "Finals";
            }
            return newStr;
        } 
        else {
            return string;
        }
        
    }

    return(
        <div className={styles.playContainer}>
            <div className={styles.matchesContainer}>
                <div className={styles.tournamentInfo}>
                    <p className={styles.tournamentName}>{tournament.name}</p>
                    <p className={styles.tournamentSeries}>Series: {tournament.series}</p>
                    {tournamentIsFinished && 
                    <p className={styles.tournamentSeries}>Winner: {tournament.winner}</p>
                    }
                </div>
                {!tournamentIsFinished && 
                <div className={styles.nextRoundContainer}>
                    <p className={styles.textHeadings}>NEXT ROUND</p>
                    <h4 className={styles.nextRoundHeading}>{transformText(currentRound)}</h4>
                        {tournament.nextRoundMatches.map(match => <div className={styles.nextRoundMatch}><span>{match.p1.name}</span><span>vs</span><span>{match.p2.name}</span></div>)}
                        <select onChange={onTournamentSimulationSpeedHandler} value={tournamentSimulationSpeed}>
                            <option value="slow">Slow</option>
                            <option value="instant">Instant</option>
                        </select>
                        <button onClick={simulateRoundHandler}>Play Next Round</button>
                </div>
                }
            </div>
            {currentRound !== "round1" &&
                <div className={styles.matchesContainer}>
                    <p className={styles.textHeadings}>MATCHES</p>
                    <div className={styles.roundContainer}>
                    {Object.keys(tournament.matches).map(round => {
                        if(tournament.matches[round].length > 0) {
                            return (
                                <h4 className={`${styles.round} ${styles.roundHeading}`}>{transformText(round)}</h4>
                            )
                        }
                    })}
                    </div>
                    <div className={styles.roundContainer}>
                    {Object.keys(tournament.matches).map(round => {
                        if(tournament.matches[round].length > 0) {
                            return (
                                <div className={styles.round}>
                                    {tournament.matches[round].map(match => {
                                        return (
                                            <div className={styles.match}>
                                                <div className={match.loser === match.p1.name ? `${styles.matchPlayer} ${styles.loser}` : styles.matchPlayer}>
                                                    <span>{match.p1.name}</span> 
                                                    <span>{match.matchStats.overview[0].sets}</span>
                                                    <span>
                                                        {match.matchStats.overview[0].setGemsWon.map(gems => <span>{gems}</span>)}
                                                    </span>
                                                </div>
                                                <div className={match.loser === match.p2.name ? `${styles.matchPlayer} ${styles.loser}` : styles.matchPlayer}>
                                                    <span>{match.p2.name}</span> 
                                                    <span>{match.matchStats.overview[1].sets}</span>
                                                    <span>
                                                        {match.matchStats.overview[1].setGemsWon.map(gems => <span>{gems}</span>)}
                                                    </span>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        }
                        return (
                            <div></div>
                        )
                    })}
                    </div>
                </div>
            }
        </div>
    )
}

export default TournamentItem;