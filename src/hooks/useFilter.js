import { useState } from "react";

/* 
useFilter custom hook depends on Filter component to get filter values. 
We get those values through getCheckboxValuesHandler function that we export.
That function is then passed to onGetCheckboxValues prop on Filter component.
*/

export const useFilter = () => {
    const [filterValues, setFilterValues] = useState([]);

    // Get latest filter values
    const getCheckboxValuesHandler = checkboxValues => {
        setFilterValues(checkboxValues);
    }

    // Filter handler
    const filterHandler = arrToFilter => {
        const mapFilterKeys = filterValues.map(filterValue => {
            return filterValue.filterKey;
        })
        const mapFilterValues = filterValues.map(filterValue => {
            return filterValue.value;
        })
        let filteredKeys = [...new Set(mapFilterKeys)];
        let filteredArr = [];
        let separatedByFilterKeys = [];
        if(filterValues.length > 0) {
            filteredKeys.forEach(key => {
                let newArr = [];
                filterValues.forEach(value => {
                    if(key === value.filterKey) {
                        newArr.push(value);
                    }
                })
                separatedByFilterKeys.push(newArr);
            })
            console.log(separatedByFilterKeys);
            separatedByFilterKeys.forEach((separated, i) => {
                separated.forEach((value, valueI) => {
                    console.log(value);
                    filteredArr.push(arrToFilter.filter(match => {
                        console.log(value.value);
                        console.log(match[value.filterKey]);
                        if(match[value.filterKey] === value.value) {
                            console.log(match, "MATCH!");
                            return true;
                        } else {
                            console.log(match, "NOT MATCH!");
                            return false;
                        }
                    })) 
                })
            })
            filteredArr = filteredArr.flat();
            // filteredArr.filter(match => {
            //     filterValues.forEach(key => {
            //          return match[key.filterKey] === key.value;
            //     })
            // })
            filteredArr.forEach(match => {
                let matchesNeeded = filteredKeys.length;
                filteredKeys.forEach(key => {
                    mapFilterValues.forEach(filterValue => {
                        console.log(match[key]);
                        if(match[key] === filterValue) {
                                matchesNeeded--;
                            }
                    })
                })
                if(matchesNeeded === 0) {
                    //console.log(match, "PASSED FILTER TEST!");
                } else if(matchesNeeded > 0) {
                    //console.log(match, "DIDNT PASS FILTER TEST!");
                    filteredArr = filteredArr.filter(filterMatch => {
                        return match !== filterMatch;
                    })
                }
            })
            return [...new Set([...filteredArr])];
        } else {
            return arrToFilter;
        }

        // if(filterValues.length > 0) {
        //     const roundFilters = filterValues.filter(filter => {
        //         return filter.filterName === "Tournament Round";
        //     })
        //     const seriesFilters = filterValues.filter(filter => {
        //         return filter.filterName === "Tournament Series";
        //     })
        //     let filteredAll = [];
        //     roundFilters.forEach(filterValue => {
        //         filteredAll.push(arrToFilterCopy.filter(match => {
        //             return transformText(match.round) === filterValue.value;
        //         }))
        //     })
        //     seriesFilters.forEach(filterValue => {
        //         if(filteredAll.length < 1) {
        //             filteredAll.push(arrToFilterCopy.filter(match => {
        //                 return match.tournamentSeries === filterValue.value;
        //             }))
        //         } else {
        //             filteredAll = filteredAll.flat().filter(match => {
        //                 return match.tournamentSeries === filterValue.value;
        //             })
        //         }
        //     })
        //     filteredAll = filteredAll.flat();
        //     return filteredAll;
        // } else {
        //     return arrToFilter;
        // }
    }


    return {
        filterValues,
        getCheckboxValuesHandler,
        filterHandler
    }
}