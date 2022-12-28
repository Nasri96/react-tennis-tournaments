import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useFilter } from "../../../hooks/useFilter";

import styles from "./PlayerList.module.css";

import PlayerItem from "./PlayerItem";
import PlayerDetails from "./PlayerDetails";
import Sort from "../../UI/Sort";
import Filter from "../../UI/Filter";

const PlayersList = ({ players }) => {
    const [sortSelected, setSortSelected] = useState("Default");
    const [playerDetails, setPlayerDetails] = useState(false);
    const [displayPlayers, setDisplayPlayers] = useState(players);
    const { filters, addFilterHandler, removeFilterHandler, filterHandler } = useFilter();

    const isMobile = useMediaQuery({
        query: "(max-width: 768px)"
    });

    // Sort and display new paginationPage
    useEffect(() => {
        const filteredPlayers = filterHandler([...players]);
        console.log(filteredPlayers);
        sortPlayersHandler({target: {value: sortSelected}}, filteredPlayers);
    }, [sortSelected, filters, players]);

    const sortPlayersHandler = (e, filteredPlayers=[...players]) => {
        const originalPlayerCopy = filteredPlayers;

        if(e.target.value === "Default") {
            setDisplayPlayers(originalPlayerCopy);
            setSortSelected("Default");
        }
        if(e.target.value === "Name >") {
            originalPlayerCopy.sort((a, b) => {
                if(a.name.toLowerCase() > b.name.toLowerCase()) {
                    return -1;
                }
                if(a.name.toLowerCase() < b.name.toLowerCase()) {
                    return 1;
                }
                return 0;
            });
            setDisplayPlayers(originalPlayerCopy);
            setSortSelected("Name >");
        }

        if(e.target.value === "Name <") {
            originalPlayerCopy.sort((a, b) => {
                if(a.name.toLowerCase() > b.name.toLowerCase()) {
                    return 1;
                }
                if(a.name.toLowerCase() < b.name.toLowerCase()) {
                    return -1;
                }
                return 0;
            });
            setDisplayPlayers(originalPlayerCopy);
            setSortSelected("Name <");
        }

        if(e.target.value === "Rank >") { 
            originalPlayerCopy.sort((a, b) => a.rank - b.rank);
            setDisplayPlayers(originalPlayerCopy);
            setSortSelected("Rank >");
        }

        if(e.target.value === "Rank <") {
            originalPlayerCopy.sort((a, b) => b.rank - a.rank);
            setDisplayPlayers(originalPlayerCopy);
            setSortSelected("Rank <");
        }

        if(e.target.value === "Wins >") {
            originalPlayerCopy.sort((a, b) => a.wins - b.wins);
            setDisplayPlayers(originalPlayerCopy);
            setSortSelected("Wins >");
        }

        if(e.target.value === "Wins <") {
            originalPlayerCopy.sort((a, b) => b.wins - a.wins);
            setDisplayPlayers(originalPlayerCopy);
            setSortSelected("Wins <");
        }

        if(e.target.value === "Loses >") {
            originalPlayerCopy.sort((a, b) => a.loses - b.loses);
            setDisplayPlayers(originalPlayerCopy);
            setSortSelected("Loses >");
        }
        
        if(e.target.value === "Loses <") {
            originalPlayerCopy.sort((a, b) => b.loses - a.loses);
            setDisplayPlayers(originalPlayerCopy);
            setSortSelected("Loses <");
        }

        if(e.target.value === "Winrate >") {
            originalPlayerCopy.sort((a, b) => a.winrate - b.winrate);
            setDisplayPlayers(originalPlayerCopy);
            setSortSelected("Winrate >");
        }

        if(e.target.value === "Winrate <") {
            originalPlayerCopy.sort((a, b) => b.winrate - a.winrate);
            setDisplayPlayers(originalPlayerCopy);
            setSortSelected("Winrate <");
        }

        if(e.target.value === "Tournaments Won >") {
            originalPlayerCopy.sort((a, b) => a.tournamentsWon - b.tournamentsWon);
            setDisplayPlayers(originalPlayerCopy);
            setSortSelected("Tournaments Won >");
        }

        if(e.target.value === "Tournaments Won <") {
            originalPlayerCopy.sort((a, b) => b.tournamentsWon - a.tournamentsWon);
            setDisplayPlayers(originalPlayerCopy);
            setSortSelected("Tournaments Won <");
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
            <React.Fragment>
                <Sort onChangeSort={sortPlayersHandler} options={["Default", "Name >", "Name <", "Rank >", "Rank <", 
                                                                "Wins >", "Wins <", "Loses >", "Loses <", "Winrate >", 
                                                                "Winrate <", "Tournaments Won >", "Tournaments Won <"
                                                                ]} 
                />
                <Filter 
                    config={
                        [
                            { groupName: "Tournaments Won", propertyToFilter: "filterTournamentsWon", valuesToFilter: ["> 0", "0"] },
                            { groupName: "Winrate", propertyToFilter: "filterWinrate", valuesToFilter: ["< 50%", "> 50%"] }
                        ]
                    }
                    onAddFilter={addFilterHandler}
                    onRemoveFilter={removeFilterHandler}
                />
            </React.Fragment>

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