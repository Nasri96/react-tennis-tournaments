import { useContext, useEffect, useState } from "react";
import { usePagination } from "../../hooks/usePagination";
import { useFilter } from "../../hooks/useFilter";

import AppContext from "../../store/app-context";

import styles from "./MatchesList.module.css";

import Match from "./Match";
import Card from "../UI/Card";
import PaginationLinks from "../UI/PaginationLinks";
import Sort from "../UI/Sort";
import Filter from "../UI/Filter";


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
    const { paginationData, paginationPage, setPaginationPage } = usePagination(matches, 100);
    const [displayMatches, setDisplayMatches] = useState([...paginationPage]);
    const { filterValues, getCheckboxValuesHandler, filterHandler } = useFilter();
    console.log(displayMatches);
    // Display and filter/sort new pagination page
    useEffect(() => {
        const filteredMatches = filterHandler([...paginationPage]);
        sortMatchesHandler({target: {value: sortSelected}}, filteredMatches);
    }, [paginationPage, sortSelected, filterValues]);

    // Sorting handler
    const sortMatchesHandler = (e, filteredMatches=[...paginationPage]) => {
        const paginationPageCopy = filteredMatches;

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
            <Filter 
                filters={
                    [
                        { filterName: "Tournament Round", filterKey: "round", checkboxNames: ["round1", "round2", "quarterFinals", "semiFinals", "finals"] },
                        { filterName: "Tournament Series", filterKey: "tournamentSeries", checkboxNames: ["250", "500", "1000", "Super"] } 
                    ]
                }
                onGetCheckboxValues={getCheckboxValuesHandler}
            />
            <div className={styles.matchesList}>
                {displayMatches.map(match => {
                    return (
                        <Match match={match} />
                    )
                })}
            </div>
            <PaginationLinks paginationData={paginationData} paginationPage={paginationPage} setPaginationPage={setPaginationPage} />
        </Card>
    )
}

export default MatchesList;