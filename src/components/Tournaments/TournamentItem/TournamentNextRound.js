import React from "react";

import styles from "./TournamentNextRound.module.css";

import TournamentPreviewMatch from "./TournamentPreviewMatch";

const TournamentNextRound = ({ tournament, tournamentIsFinished, transformText, currentRound }) => {
    return (
        <React.Fragment>
        {!tournamentIsFinished && 
        <div className={styles.nextRoundContainer}>
            <p className={styles.textHeadings}>NEXT ROUND</p>
            <h4 className={styles.nextRoundHeading}>{transformText(currentRound)}</h4>
                {tournament.nextRoundMatches.map(match => <TournamentPreviewMatch match={match} /> )}
        </div>
        }
        </React.Fragment>
    )
}

export default TournamentNextRound;