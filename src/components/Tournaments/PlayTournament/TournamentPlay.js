import React, { useState, useEffect, useRef, useContext } from "react";

import styles from "./TournamentPlay.module.css";

import TournamentItem from "../TournamentItem/TournamentItem";
import AppContext from "../../../store/app-context";

const TournamentPlay = () => {
    const { activeTournament } = useContext(AppContext);
    const [currentRound, setCurrentRound] = useState(activeTournament ? activeTournament.rounds[activeTournament.currentRound] : false);
    const [tournamentIsFinished, setTournamentIsFinished] = useState(activeTournament ? activeTournament.winner ? true : false : false);
    const [tournamentSimulationSpeed, setTournamentSimulationSpeed] = useState(activeTournament ? activeTournament.simulationSpeed : false);
    const [matchesLiveUpdates, setMatchesLiveUpdates] = useState(activeTournament ? activeTournament.matchesLiveUpdates : false);
    const firstLiveMatchRef = useRef();

    const displayTournament = false;

    // Make tournament disappear after it is finished, after 10 seconds
    // useEffect(() => {
    //     return () => {
    //         if(tournamentIsFinished) {
    //             console.log("UNMOUNTED!");
    //             setActiveTournament(false);
    //         }
    //     }
    // }, [tournamentIsFinished, setActiveTournament])

    // Live Matches Update
    useEffect(() => {
        let timer;
        if(matchesLiveUpdates) {
            timer = setInterval(() => {
                setMatchesLiveUpdates(Math.random());
                console.log(activeTournament.roundIsDone);
                if(activeTournament.roundIsDone) {
                    clearInterval(timer);
                    setMatchesLiveUpdates(false);
                    setCurrentRound(activeTournament.rounds[activeTournament.currentRound]);
                    if(activeTournament.winner) {
                        setTournamentIsFinished(true);
                    }
                }
            }, 200)
        }

        return () => {
            clearInterval(timer);
        }
    }, [matchesLiveUpdates, activeTournament.roundIsDone, activeTournament.currentRound, activeTournament.rounds, activeTournament.winner])

    const tournamentSimulationSpeedHandler = e => {
        setTournamentSimulationSpeed(e.target.value);
    }

    const simulateRoundHandler = e => {
        if(tournamentSimulationSpeed === "instant") {
            activeTournament.simulateMatches(currentRound, "instant");
            setCurrentRound(activeTournament.rounds[activeTournament.currentRound]);
            if(activeTournament.winner) {
                setTournamentIsFinished(true);
            }
        }
        if(tournamentSimulationSpeed === "slow") {
            activeTournament.simulateMatches(currentRound, "slow");
            setMatchesLiveUpdates(true);
            firstLiveMatchRef.current.scrollIntoView({
                block: "center",
                behavior: "smooth"
            })
        }
    }

    return (
            <div className={styles.playContainer}>
                {activeTournament && !displayTournament &&
                    <TournamentItem 
                        activeTournament={activeTournament}
                        displayTournament={displayTournament}
                        onSetDisplayTournament={null}
                        currentRound={currentRound}
                        tournamentIsFinished={tournamentIsFinished}
                        matchesLiveUpdates={matchesLiveUpdates}
                        onTournamentSimulateRound={simulateRoundHandler}
                        tournamentSimulationSpeed={tournamentSimulationSpeed}
                        onTournamentSimulationSpeed={tournamentSimulationSpeedHandler}
                        ref={firstLiveMatchRef}
                    />
                }
                {!activeTournament &&
                    <p>You need to create tournament in order to play tournament. Go to Create Tournament tab and create tournament.</p>
                }
                {activeTournament && displayTournament &&
                    <p>You need to create tournament in order to play tournament. Go to Create Tournament tab and create tournament.</p>
                }
            </div> 
    );
}

export default TournamentPlay;