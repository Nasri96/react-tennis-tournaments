import React from "react";

import styles from  "./PlayersRanks.module.css";

const PlayersRanks = ({ players }) => {

    const playersJSX = players.map(player => {
        return (
            <div className={styles.rankRanks}>
                <span>{player.name}</span>
                <span>{player.rank}</span>
                <span>{player.points}</span>
            </div>
        )
    })
    
    return (
        <div className={styles.playersRanks}>
            <div className={styles.rankHeaders}>
                <span>Player</span>
                <span>Rank</span>
                <span>Points</span>
            </div>
                {playersJSX}
        </div>
    )
}

export default PlayersRanks;