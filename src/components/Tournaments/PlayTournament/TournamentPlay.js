import React, { useState, useEffect } from "react";

import styles from "./TournamentPlay.module.css";

import TournamentItem from "../TournamentItem";

const TournamentPlay = ({ tournament, setTournament }) => {
    const [currentRound, setCurrentRound] = useState(tournament ? tournament.rounds[tournament.currentRound] : null);
    const [tournamentIsFinished, setTournamentIsFinished] = useState(tournament.winner ?  true : false);
    const [tournamentSimulationSpeed, setTournamentSimulationSpeed] = useState("instant");

    const tournamentSimulationSpeedHandler = e => {
        setTournamentSimulationSpeed(e.target.value);
    }

    const simulateRoundHandler = e => {
        if(tournamentSimulationSpeed === "instant") {
            tournament.simulateMatches(currentRound, "instant");
            setCurrentRound(tournament.rounds[tournament.currentRound]);
            if(tournament.winner) {
                setTournamentIsFinished(true);
            }
        }
        if(tournamentSimulationSpeed === "slow") {
            // slow tournament simulation => 
        }
        
    }

    return (
            <div className={styles.playContainer}>
                {tournament &&
                    <TournamentItem onSimulateRoundHandler={simulateRoundHandler} tournament={tournament} setTournament={setTournament} currentRound={currentRound} tournamentIsFinished={tournamentIsFinished} tournamentSimulationSpeed={tournamentSimulationSpeed} onTournamentSimulationSpeedHandler={tournamentSimulationSpeedHandler} />
                }
                {!tournament &&
                    <p>You need to create tournament in order to play tournament. Go to Create Tournament tab and create tournament.</p>
                }
            </div> 
    );
}

export default TournamentPlay;