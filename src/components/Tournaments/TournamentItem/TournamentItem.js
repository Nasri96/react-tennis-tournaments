import React, { forwardRef } from "react";

import styles from "./TournamentItem.module.css";

import TournamentInfo from "./TournamentInfo";
import TournamentNextRound from "./TournamentNextRound";
import TournamentBrackets from "./TournamentBrackets";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

const TournamentItem = forwardRef(({ 
    activeTournament, displayTournament, onSetDisplayTournament, currentRound,
    tournamentIsFinished, matchesLiveUpdates, onTournamentSimulateRound,
    tournamentSimulationSpeed, onTournamentSimulationSpeed,
    }, ref) => {
        
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

    const iconStyles = { marginRight: "10px" };

    return (
        <React.Fragment>
                {displayTournament &&
                    <div className={styles.backContainer}>
                        <button onClick={onSetDisplayTournament}><BsFillArrowLeftCircleFill style={iconStyles} /> Back to All Tournaments</button>
                    </div>
                }
                <TournamentInfo activeTournament={activeTournament} tournamentIsFinished={tournamentIsFinished} />
                {!matchesLiveUpdates && !tournamentIsFinished &&
                    <div className={styles.controls}>
                        <p>Simulation Speed</p>
                        <select onChange={onTournamentSimulationSpeed} value={tournamentSimulationSpeed}>
                            <option value="slow">Slow</option>
                            <option value="instant">Instant</option>
                        </select>
                        <button onClick={onTournamentSimulateRound}>Play Next Round</button>
                    </div>
                }
                <TournamentNextRound 
                    activeTournament={activeTournament}
                    tournamentIsFinished={tournamentIsFinished}
                    currentRound={currentRound}
                    transformText={transformText} 
                />
                <TournamentBrackets 
                    activeTournament={activeTournament}
                    tournamentIsFinished={tournamentIsFinished}
                    matchesLiveUpdates={matchesLiveUpdates}
                    ref={ref} 
                    transformText={transformText} />
        </React.Fragment>
    )
})

export default TournamentItem;