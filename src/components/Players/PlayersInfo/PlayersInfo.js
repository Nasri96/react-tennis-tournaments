import React from "react";

import styles from "./PlayersInfo.module.css";

import PlayerList from "./PlayerList";

const PlayersInfo = ({ players }) => {
    return (
            <PlayerList players={players} />
    )
}

export default PlayersInfo;