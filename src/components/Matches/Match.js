import styles from "./Match.module.css";

import TournamentMatch from "../Tournaments/TournamentItem/TournamentMatch";

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

const Match = ({ match, badge }) => {
    
    return (
        <div className={styles.matchContainer}>
            <div className={styles.leftSide}>
                <div className={styles.match}>
                    <TournamentMatch match={match} matchesLiveUpdates={false} ref={null} />
                </div>
            </div>
            <div className={styles.rightSide}>
                <div className={styles.rightSideLeftSide}>
                    {badge && 
                    <div className={`${styles.badge} ${styles[badge]}`}>
                        <p>{badge}</p>
                    </div>
                    }
                    <div className={styles.round}>
                        <p>{transformText(match.round)}</p>
                    </div>
                </div>
                <div className={styles.rightSideRightSide}>
                    <div className={styles.tournamentName}>
                        <p>{match.tournamentName}</p>
                    </div>
                    <div className={styles.tournamentSeries}>
                        <p>Series: {match.tournamentSeries}</p>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Match;