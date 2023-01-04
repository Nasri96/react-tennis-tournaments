import React from "react";

import styles from "./PlayersInfo.module.css";

import PlayerList from "./PlayerList";

const PlayersInfo = ({ players }) => {
    return (
            <React.Fragment>
                <PlayerList players={players} />
            </React.Fragment>
    )
}

export default PlayersInfo;