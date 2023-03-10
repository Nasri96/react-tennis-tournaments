import React, { useState, useContext } from "react";

import AppContext from "../../../store/app-context";

import styles from "./TournamentForm.module.css";
import containerStyles from "./../../UI/Container.module.css";

const TournamentForm = ({ onSwitchTab }) => {
    const { activeTournament, setActiveTournament, players, TournamentConstructor } = useContext(AppContext);
    const [tournamentName, setTournamentName] = useState("");
    const [tournamentNameError, setTournamentNameError] = useState(true);
    const [tournamentNameIsTouched, setTournamentNameIsTouched] = useState(false);
    const [tournamentSeries, setTournamentSeries] = useState("250");
    const [tournamentSurface, setTournamentSurface] = useState("Clay");

    const tournamentNameIsInvalid = tournamentNameIsTouched && tournamentNameError;
    let formIsValid = false;

    const resetInputs = () => {
        setTournamentName("");
        setTournamentNameError(true);
        setTournamentNameIsTouched(false);
        setTournamentSeries("250");
        setTournamentSurface("Clay");
    }

    // tournament name validation
    const validatateName = name => {
        if(name.trim().length > 0) {
            return (name.trim()[0] === name.trim()[0].toUpperCase()) && name.trim().length > 3;
        }
        return false;
    }

    const submitFormHandler = e => {
        e.preventDefault();
        
        setTournamentNameIsTouched(true);

        if(!tournamentNameError) {
            formIsValid = true;
        }

        if(!formIsValid) {
            return;
        }

        // Setup new tournament
        const newTournament = new TournamentConstructor(tournamentName, players, tournamentSeries, tournamentSurface);
        setActiveTournament(newTournament);
        // Switch to playtournament Tab
        onSwitchTab(e, "playtournament");
        resetInputs();
    }

    const tournamentNameChangeHandler = e => {
        setTournamentName(e.target.value);
        setTournamentNameError(!validatateName(e.target.value));
    }

    const tournamentNameBlurHandler = e => {
        setTournamentNameIsTouched(true);
    }

    const tournamentSeriesChangeHandler = e => {
        setTournamentSeries(e.target.value);
    }

    const tournamentSurfaceChangeHandler = e => {
        setTournamentSurface(e.target.value);
    }

    let inputNameClass;
    if(!tournamentNameIsTouched) {
        inputNameClass = "";
    } 
    else {
        if(tournamentNameIsInvalid) {
            console.log("invalid");
            inputNameClass = styles.inputInvalid;
        } 
        else {
            inputNameClass = styles.inputValid;
        }
    }
    
    // Render conditions
    let formJSX;
    if(activeTournament && !activeTournament.winner) {
        formJSX =   <div className={styles.formContainer}>
                        <p className={styles.textNoTournament}>You already created tournament. Finish tournament before creating new one.</p>
                    </div>
    } else if(!activeTournament || activeTournament.winner) {
        formJSX = <div className={styles.formContainer}>
                    <form className={styles.createTournamentForm} onSubmit={submitFormHandler}>
                        <label>Tournament Name:</label>
                        <input className={inputNameClass} onBlur={tournamentNameBlurHandler} onChange={tournamentNameChangeHandler} type="text" value={tournamentName} />
                        {tournamentNameIsInvalid &&
                            <p className={styles.invalid}>First character must be upper case and must contain at least 4 characters.</p>
                        }
                        <label>Tournament Series:</label>
                        <select onChange={tournamentSeriesChangeHandler} value={tournamentSeries}>
                            <option>250</option>
                            <option>500</option>
                            <option>1000</option>
                            <option>Super</option>
                        </select>
                        <label>Tournament Surface:</label>
                        <select onChange={tournamentSurfaceChangeHandler} value={tournamentSurface}>
                            <option>Clay</option>
                            <option>Grass</option>
                            <option>Hard</option>
                        </select>
                        <div className={styles.buttonContainer}>
                            <button type="submit">Create</button>
                        </div>
                    </form>
                </div>
    }

    return (
        <div className={containerStyles.sidebarContent}>
            {formJSX}
        </div>
    )
}

export default TournamentForm;