import React, { useState } from "react";

import styles from "./PlayersInfo.module.css";

import PlayerList from "./PlayerList";
import Sort from "../../UI/Sort";


const PlayersInfo = ({ players }) => {
    const [displayPlayers, setDisplayPlayers] = useState(players);

    const sortPlayersHandler = e => {
        const originalPlayers = players.slice();

        if(e.target.value === "Default") {
            setDisplayPlayers(players);
        }
        if(e.target.value === "Name >") {
            originalPlayers.sort((a, b) => {
                if(a.name.toLowerCase() > b.name.toLowerCase()) {
                    return -1;
                }
                if(a.name.toLowerCase() < b.name.toLowerCase()) {
                    return 1;
                }
                return 0;
            });
            setDisplayPlayers(originalPlayers);
        }

        if(e.target.value === "Name <") {
            originalPlayers.sort((a, b) => {
                if(a.name.toLowerCase() > b.name.toLowerCase()) {
                    return 1;
                }
                if(a.name.toLowerCase() < b.name.toLowerCase()) {
                    return -1;
                }
                return 0;
            });
            setDisplayPlayers(originalPlayers);
        }

        if(e.target.value === "Rank >") { 
            originalPlayers.sort((a, b) => a.rank - b.rank);
            setDisplayPlayers(originalPlayers);
        }

        if(e.target.value === "Rank <") {
            originalPlayers.sort((a, b) => b.rank - a.rank);
            setDisplayPlayers(originalPlayers);
        }

        if(e.target.value === "Wins >") {
            originalPlayers.sort((a, b) => a.wins - b.wins);
            setDisplayPlayers(originalPlayers);
        }

        if(e.target.value === "Wins <") {
            originalPlayers.sort((a, b) => b.wins - a.wins);
            setDisplayPlayers(originalPlayers);
        }

        if(e.target.value === "Loses >") {
            originalPlayers.sort((a, b) => a.loses - b.loses);
            setDisplayPlayers(originalPlayers);
        }
        
        if(e.target.value === "Loses <") {
            originalPlayers.sort((a, b) => b.loses - a.loses);
            setDisplayPlayers(originalPlayers);
        }
    }

    return (
        <React.Fragment>
            <Sort onChangeSort={sortPlayersHandler} options={["Default", "Name >", "Name <", "Rank >", "Rank <", "Wins >", "Wins <", "Loses >", "Loses <"]} />
            <div className={styles.playersInfo}>
                <PlayerList  players={displayPlayers} />
            </div>
        </React.Fragment>
        
    )
}

export default PlayersInfo;