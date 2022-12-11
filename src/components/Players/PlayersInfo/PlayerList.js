import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";

import styles from "./PlayerList.module.css";

import PlayerItem from "./PlayerItem";
import PlayerDetails from "./PlayerDetails";
import Sort from "../../UI/Sort";

const PlayersList = ({ players }) => {
    const [playerDetails, setPlayerDetails] = useState(false);
    const [displayPlayers, setDisplayPlayers] = useState(players);
    const isMobile = useMediaQuery({
        query: "(max-width: 768px)"
    });

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

        if(e.target.value === "Winrate >") {
            originalPlayers.sort((a, b) => a.winrate - b.winrate);
            setDisplayPlayers(originalPlayers);
        }

        if(e.target.value === "Winrate <") {
            originalPlayers.sort((a, b) => b.winrate - a.winrate);
            setDisplayPlayers(originalPlayers);
        }

        if(e.target.value === "Tournaments Won >") {
            originalPlayers.sort((a, b) => a.tournamentsWon - b.tournamentsWon);
            setDisplayPlayers(originalPlayers);
        }

        if(e.target.value === "Tournaments Won <") {
            originalPlayers.sort((a, b) => b.tournamentsWon - a.tournamentsWon);
            setDisplayPlayers(originalPlayers);
        }
    }

    const showPlayerMatchesHandler = player => {
        if(playerDetails) {
            setPlayerDetails(false);
        } 
        else {
            setPlayerDetails(player);
        }
    }
    
    const playersJSX = displayPlayers.map(player => {
        return (
            <PlayerItem 
                player={player}
                onShowPlayerMatches={showPlayerMatchesHandler}
                isMobile={isMobile}
            />
        )
    })

    return (
        <React.Fragment>
            {!playerDetails &&  
                <Sort onChangeSort={sortPlayersHandler} options={["Default", "Name >", "Name <", "Rank >", "Rank <", 
                                                                "Wins >", "Wins <", "Loses >", "Loses <", "Winrate >", 
                                                                "Winrate <", "Tournaments Won >", "Tournaments Won <"
                                                                ]} 
                />
            }
            <table className={styles.playersTable}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Rank</th>
                        <th>Points</th>
                        <th>Wins</th>
                        <th>Loses</th>
                        <th>Winrate</th>
                        <th title="Tournaments Won">T Won</th>
                    </tr>
                </thead>
                <tbody>
                    {!playerDetails &&
                        <React.Fragment>
                            {playersJSX}
                        </React.Fragment>
                    }
                    {playerDetails &&
                        <PlayerItem 
                            player={playerDetails}
                            onShowPlayerMatches={showPlayerMatchesHandler}
                            matchesAreShown={true}
                            isMobile={isMobile}
                        />
                    }
                </tbody>
            </table>
            {playerDetails &&
                <PlayerDetails player={playerDetails} isMobile={isMobile} />
            }
        </React.Fragment>
    )
}

export default PlayersList;