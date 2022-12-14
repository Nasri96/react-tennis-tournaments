import { useContext, useState } from "react";

import styles from "./MatchesList.module.css";

import Card from "../UI/Card";
import AppContext from "../../store/app-context";
import Sort from "../UI/Sort";
import Match from "./Match";

const MatchesList = () => {
    const { matches } = useContext(AppContext);
    const [displayMatches, setDisplayMatches] = useState(matches);
    console.log(displayMatches);
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

    return (
        <Card>
            <h3 className={styles.heading}>Matches</h3>
            <Sort onChangeSort={sortMatchesHandler} options={["Default", "Round >", "Round <", "Tournament >", "Tournament <"]} />
            <div className={styles.matchesList}>
                {displayMatches.map(match => {
                    return (
                        <Match match={match} />
                    )
                })}
            </div>
        </Card>
    )
}

export default MatchesList;