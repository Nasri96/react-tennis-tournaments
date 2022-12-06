import { useContext, useEffect, useState } from "react";

import styles from "./MatchesList.module.css";

import Card from "../UI/Card";
import AppContext from "../../store/app-context";
import TournamentMatch from "../Tournaments/TournamentItem/TournamentMatch";

const MatchesList = () => {
    const { matches } = useContext(AppContext);
    console.log(matches);

    return (
        <Card>
            <h3 className={styles.heading}>Matches</h3>
            <div className={styles.matchesList}>
                {matches.map(match => {
                    return (
                        <div className={styles.matchContainer}>
                            <div className={styles.match}>
                                <TournamentMatch match={match.match} matchesLiveUpdates={false} ref={null} />
                            </div>
                            <div className={styles.round}>
                                <p>{match.round}</p>
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