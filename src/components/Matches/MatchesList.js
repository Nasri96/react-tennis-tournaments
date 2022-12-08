import { useContext, useEffect, useState } from "react";

import styles from "./MatchesList.module.css";

import Card from "../UI/Card";
import AppContext from "../../store/app-context";
import TournamentMatch from "../Tournaments/TournamentItem/TournamentMatch";
import Sort from "../UI/Sort";

const MatchesList = () => {
    const { matches } = useContext(AppContext);
    const [displayMatches, setDisplayMatches] = useState(matches);

    // Prepare rounds sorting
    const roundsStrength = {
        round1: 1,
        round2: 2,
        quarterFinals: 3,
        semiFinals: 4,
        finals: 5
    }

    const sortMatchesHandler = e => {
        const originalMatches = matches.slice();

        if(e.target.value === "Default") {
            setDisplayMatches(matches);
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

        if(e.target.value === "Round >") {
            originalMatches.sort((a, b) => roundsStrength[a.round] - roundsStrength[b.round]);

            setDisplayMatches(originalMatches);
        }

        if(e.target.value === "Round <") {
            originalMatches.sort((a, b) => roundsStrength[b.round] - roundsStrength[a.round]);

            setDisplayMatches(originalMatches);
        }
    }

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

    return (
        <Card>
            <h3 className={styles.heading}>Matches</h3>
            <Sort onChangeSort={sortMatchesHandler} options={["Default", "Round >", "Round <", "Tournament >", "Tournament <"]} />
            <div className={styles.matchesList}>
                {displayMatches.map(match => {
                    return (
                        <div className={styles.matchContainer}>
                            <div className={styles.match}>
                                <TournamentMatch match={match.match} matchesLiveUpdates={false} ref={null} />
                            </div>
                            <div className={styles.round}>
                                <p>{transformText(match.round)}</p>
                            </div>
                            <div className={styles.tournamentName}>
                                <p>{match.tournamentName}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Card>
    )
}

export default MatchesList;