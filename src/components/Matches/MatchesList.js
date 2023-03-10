import { useContext, useEffect, useState, useRef } from "react";
import { usePagination } from "../../hooks/usePagination";
import { useFilter } from "../../hooks/useFilter";

import AppContext from "../../store/app-context";

import styles from "./MatchesList.module.css";
import containerStyles from "../UI/Container.module.css";

import Match from "./Match";
import Container from "../UI/Container";
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
    const [sortSelected, setSortSelected] = useState("Latest");
    const { paginationData, paginationPage, setPaginationPage } = usePagination(matches, 200);
    const [displayMatches, setDisplayMatches] = useState([...paginationPage]);
    const { filters, addFilterHandler, removeFilterHandler, filterHandler } = useFilter();
    const matchesRef = useRef();

    // Scroll after pagination page is clicked
    const scrollToContainerHandler = e => {
        matchesRef.current.scrollIntoView({
            behavior: "smooth"
        })
    }

    // Display and filter/sort new pagination page
    useEffect(() => {
        const filteredMatches = filterHandler([...paginationPage]);
        sortMatchesHandler({target: {value: sortSelected}}, filteredMatches);
    }, [paginationPage, sortSelected, filters]);

    // Sorting handler
    const sortMatchesHandler = (e, filteredMatches=[...paginationPage]) => {
        const paginationPageCopy = filteredMatches;

        if(e.target.value === "Latest") {
            setDisplayMatches(paginationPageCopy);
            setSortSelected("Latest");
        }

        if(e.target.value === "Oldest") {
            setDisplayMatches(paginationPageCopy.reverse());
            setSortSelected("Oldest");
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
        <Container type="sidebarContainer">
            <div className={containerStyles.sidebarContent}>
            <div className={styles.sortFilterContainer}>
                <div className={styles.positionSticky}>
                    <h3 className={styles.heading}>Sort and Filter Matches</h3>
                        <Sort onChangeSort={sortMatchesHandler} options={["Latest", "Oldest", "Round >", "Round <", "Tournament >", "Tournament <"]} />
                        <Filter 
                            config={
                                [
                                    { groupName: "Tournament Round", propertyToFilter: "round", valuesToFilter: ["round1", "round2", "quarterFinals", "semiFinals", "finals"] },
                                    { groupName: "Tournament Series", propertyToFilter: "tournamentSeries", valuesToFilter: ["250", "500", "1000", "Super"] },
                                    { groupName: "Tournament Surface", propertyToFilter: "tournamentSurface", valuesToFilter: ["Clay", "Grass", "Hard"] }
                                ]
                            }
                            onAddFilter={addFilterHandler}
                            onRemoveFilter={removeFilterHandler}
                        />
                </div>
                
            </div>
            <div ref={matchesRef} className={styles.matchesContainer}>
                <h3 className={styles.heading}>Matches</h3>
                <div className={styles.matchesList}>
                    {displayMatches.map(match => {
                        return (
                            <Match key={match.id} match={match} />
                        )
                    })}
                </div>
                <PaginationLinks onScroll={scrollToContainerHandler} paginationData={paginationData} paginationPage={paginationPage} setPaginationPage={setPaginationPage} />
            </div>
            
                
            </div>
        </Container>
        
    )
}

export default MatchesList;