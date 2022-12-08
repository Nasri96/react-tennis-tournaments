import React from "react";

import PlayerItem from "./PlayerItem";

const PlayersList = ({ players }) => {
    const playersJSX = players.map(player => {
        return (
            <PlayerItem name={player.name} rank={player.rank} points={player.points} wins={player.wins} loses={player.loses} />
        )
    })

    return (
        <React.Fragment>
            {playersJSX}
        </React.Fragment>
    )
}

export default PlayersList;