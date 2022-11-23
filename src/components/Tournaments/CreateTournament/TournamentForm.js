import React, { useState } from "react";

import { Tournament as TournamentConstructor } from "../../../simulation/tournament";
import { players } from "../../../simulation/player";

import styles from "./TournamentForm.module.css";

const TournamentForm = ({ tournament, onCreateTournament, onSwitchTab}) => {
    const [tournamentName, setTournamentName] = useState("");
    const [tournamentNameError, setTournamentNameError] = useState(true);
    const [tournamentNameIsTouched, setTournamentNameIsTouched] = useState(false);
    const [tournamentSeries, setTournamentSeries] = useState("250");

    const tournamentNameIsInvalid = tournamentNameIsTouched && tournamentNameError;
    let formIsValid = false;

    const resetInputs = () => {
        setTournamentName("");
        setTournamentNameError(true);
        setTournamentNameIsTouched(false);
        setTournamentSeries("250");
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

        // handle success form
        onSwitchTab(e, "playtournament");
        const newTournament = new TournamentConstructor(tournamentName, players, tournamentSeries);
        onCreateTournament(newTournament);
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

    let inputNameClass;
    if(!tournamentNameIsTouched) {
        inputNameClass = "";
    } 
    else {
        if(tournamentNameIsInvalid) {
            inputNameClass = styles.inputInvalid;
        } 
        else {
            inputNameClass = styles.inputValid;
        }
    }
    
    // Render conditions
    let formJSX;
    if(tournament && !tournament.winner) {
        formJSX =   <div className={styles.formContainer}>
                        <div>You already created tournament. Finish tournament before creating new one.</div>
                    </div>
    } else if(!tournament || tournament.winner) {
        formJSX = <div className={styles.formContainer}>
                    <form onSubmit={submitFormHandler}>
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
                        <div className={styles.buttonContainer}>
                            <button type="submit">Create</button>
                        </div>
                    </form>
                </div>
    }

    return (
        <React.Fragment>
            {formJSX}
        </React.Fragment>
    )
}

export default TournamentForm;