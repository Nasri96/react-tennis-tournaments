import { useContext, useEffect, useState } from "react";

import styles from "./MatchesList.module.css";

import Card from "../UI/Card";
import AppContext from "../../store/app-context";
import Sort from "../UI/Sort";
import Match from "./Match";
import { usePagination } from "../../hooks/usePagination";
import PaginationPageLinks from "../../hooks/usePagination";

// Prepare rounds sorting
const roundsStrength = {
    round1: 1,
    round2: 2,
    quarterFinals: 3,
    semiFinals: 4,
    finals: 5
}

const MatchesList = () => {
    const { matches } = useContext(AppContext);
    const [sortSelected, setSortSelected] = useState("Default");
    const { paginationData, paginationPage, setPaginationPage } = usePagination(matches, 10);
    const [displayMatches, setDisplayMatches] = useState([...paginationPage]);

    // Display new paginationPage
    useEffect(() => {
        sortMatchesHandler({target: {value: sortSelected}});
    }, [paginationPage, sortSelected]);
 
    // Sorting handler
    const sortMatchesHandler = e => {
        const paginationPageCopy = [...paginationPage];

        if(e.target.value === "Default") {
            setDisplayMatches(paginationPageCopy);
            setSortSelected("Default");
        }

        if(e.target.value === "Tournament >") {
            paginationPageCopy.sort((a, b) => {
                if(a.tournamentName.toLowerCase() > b.tournamentName.toLowerCase()) {
                    return 1;
                } 
                if(a.tournamentName.toLowerCase() < b.tournamentName.toLowerCase()) {
                    return -1;
                }

                return 0;
            })

            setDisplayMatches(paginationPageCopy);
            setSortSelected("Tournament >");
        }

        if(e.target.value === "Tournament <") {
            paginationPageCopy.sort((a, b) => {
                if(a.tournamentName.toLowerCase() > b.tournamentName.toLowerCase()) {
                    return -1;
                } 
                if(a.tournamentName.toLowerCase() < b.tournamentName.toLowerCase()) {
                    return 1;
                }

                return 0;
            })

            setDisplayMatches(paginationPageCopy);
            setSortSelected("Tournament <");
        }

        if(e.target.value === "Round >") {
            paginationPageCopy.sort((a, b) => roundsStrength[a.round] - roundsStrength[b.round]);

            setDisplayMatches(paginationPageCopy);
            setSortSelected("Round >");
        }

        if(e.target.value === "Round <") {
            paginationPageCopy.sort((a, b) => roundsStrength[b.round] - roundsStrength[a.round]);

            setDisplayMatches(paginationPageCopy);
            setSortSelected("Round <");
        }
    }

    return (
        <Card>
            <h3 className={styles.heading}>Matches</h3>
            <Sort onChangeSort={sortMatchesHandler} options={["Default", "Round >", "Round <", "Tournament >", "Tournament <"]} />
            <div className={styles.matchesList}>
                {displayMatches.map(match => {
                    return (
                        <Match match={match} />
                    )
                })}
            </div>
            <PaginationPageLinks paginationData={paginationData} paginationPage={paginationPage} setPaginationPage={setPaginationPage} />
        </Card>
    )
}

export default MatchesList;