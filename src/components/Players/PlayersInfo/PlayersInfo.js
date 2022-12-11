import React from "react";

import styles from "./PlayersInfo.module.css";

import PlayerList from "./PlayerList";


const PlayersInfo = ({ players }) => {
    return (
        <React.Fragment>
            <div className={styles.playersInfo}>
                <PlayerList players={players} />
            </div>
        </React.Fragment>
        
    )
}

export default PlayersInfo;