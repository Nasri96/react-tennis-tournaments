import React, { useEffect } from "react";

import styles from "./TournamentItem.module.css";

import TournamentInfo from "./TournamentInfo";
import TournamentNextRound from "./TournamentNextRound";
import TournamentBrackets from "./TournamentBrackets";

const TournamentItem = ({ onSimulateRoundHandler: simulateRoundHandler, tournament, setTournament, currentRound, tournamentIsFinished, tournamentSimulationSpeed, onTournamentSimulationSpeedHandler, matchesLiveUpdates }) => {
    // Make tournament disappear after it is finished, after 10 seconds
    useEffect(() => {
        if(tournamentIsFinished) {
            setTimeout(() => {
                setTournament(false);
            }, 100000);
        }
    }, [tournamentIsFinished, setTournament])

    // transform text rounds => round1 to Round 1, quarterFinals to Quarter Finals
    const transformText = string => {
        if(string.indexOf("round") !== -1) {
            const begginingStr = string.substring(0, 1).toUpperCase();
            const middleStr = string.substring(1, string.length - 1);
            const endStr = string.substring(string.length - 1);
    
            const newStr = begginingStr.concat(middleStr, " ", endStr);
    
            return newStr;
        } 
        else if(string.toLowerCase().indexOf("finals") !== -1) {
            const finalsIndex = string.toLowerCase().indexOf("finals");
            const begginingStr = `${string[0].toUpperCase()}${string.substring(1, finalsIndex)}`;
            const endStr = string.substring(finalsIndex, string.length);

            const newStr = begginingStr.concat(" ", endStr);

            if(string.toLowerCase() === "finals") {
                return "Finals";
            }
            return newStr;
        } 
        else {
            return string;
        }
        
    }

    return (
        <React.Fragment>
                <TournamentInfo tournament={tournament} tournamentIsFinished={tournamentIsFinished} />
                <TournamentNextRound 
                    tournament={tournament} 
                    tournamentIsFinished={tournamentIsFinished} 
                    transformText={transformText} 
                    currentRound={currentRound} 
                    onTournamentSimulationSpeedHandler={onTournamentSimulationSpeedHandler} 
                    tournamentSimulationSpeed={tournamentSimulationSpeed} 
                    simulateRoundHandler={simulateRoundHandler}
                />
                {!matchesLiveUpdates && !tournamentIsFinished &&
                    <div className={styles.controls}>
                        <p>Simulation Speed</p>
                        <select onChange={onTournamentSimulationSpeedHandler} value={tournamentSimulationSpeed}>
                            <option value="slow">Slow</option>
                            <option value="instant">Instant</option>
                        </select>
                        <button onClick={simulateRoundHandler}>Play Next Round</button>
                    </div>
                }
                <TournamentBrackets tournament={tournament} tournamentIsFinished={tournamentIsFinished} matchesLiveUpdates={matchesLiveUpdates} transformText={transformText} />
        </React.Fragment>
    )
}

export default TournamentItem;