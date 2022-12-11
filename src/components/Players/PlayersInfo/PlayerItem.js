import React, { useState } from "react";

import styles from "./PlayerItem.module.css";

const PlayerItem = ({ player, onShowPlayerMatches, matchesAreShown, isMobile}) => {
    const { name, rank, points, wins, loses, winrate, tournamentsWon } = player; 
    const [matchesIcon, setMatchesIcon] = useState(false);
    const showMatchesIconHandler = e => {
        setMatchesIcon(true);
    }

    const hideMatchesIconHandler = e => {
        setMatchesIcon(false);
    }

    return (
            <React.Fragment>
                <tr>
                    <td>{name}</td>
                    <td>{rank}</td>
                    <td>{points}</td>
                    <td>{wins}</td>
                    <td>{loses}</td>
                    <td>{winrate}%</td>
                    <td>{tournamentsWon}</td>
                    <td>
                        <button 
                            className={styles.matchesButton} 
                            onClick={onShowPlayerMatches.bind(null, player)} 
                            onMouseEnter={showMatchesIconHandler} 
                            onMouseLeave={hideMatchesIconHandler}>
                        {!isMobile &&
                            <React.Fragment>
                                {!matchesAreShown ? "Matches" : "Back"} {matchesIcon ? <span className={styles.icon}>{">"}</span> :  <span className={styles.icon}>{""}</span>}
                            </React.Fragment>
                        }
                        {isMobile &&
                            <React.Fragment>
                                {!matchesAreShown ? "Details" : "Back"} {matchesIcon ? <span className={styles.icon}>{">"}</span> :  <span className={styles.icon}>{""}</span>}
                            </React.Fragment>
                        }
                        </button>
                    </td>
                </tr>
            </React.Fragment>
    )
            
}

export default PlayerItem;