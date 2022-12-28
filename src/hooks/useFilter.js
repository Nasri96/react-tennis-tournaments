import { useState } from "react";

/* 
useFilter custom hook depends on Filter component to get properties and values of items that will be filtered.
We get these properties and values through addFilterHandler function that we export.
That function is then passed to onAddFilter prop on Filter component.
Filter handler function is responsible for actual filtering of array that we pass to that function.
*/

export const useFilter = () => {
    const [filters, setFilters] = useState([]);
    // console.log(filters);
    
    const addFilterHandler = value => {
        setFilters(values => {
            return [...values, value];
        })
    }

    const removeFilterHandler = checkbox => {
        setFilters(checkboxes => {
            return checkboxes.filter(checkboxValue => {
                return checkboxValue.valueToFilter !== checkbox.valueToFilter;
            })
        })
    }

    // Filter handler
    const filterHandler = arrToFilter => {
        if(filters.length > 0) {
            // map all values needed for filtering
            const valuesToFilter = filters.map(filter => {
                return filter.valueToFilter;
            })

            // map all properties needed for filtering
            const propertiesToFilter = filters.map(filter => {
                return filter.propertyToFilter;
            })
            // console.log("Values to filter:", valuesToFilter, "Properties to filter:" ,propertiesToFilter);
            let filteredArr = [];
            const uniqueProperties = [...new Set(propertiesToFilter)];
            // console.log("Unique properties:", uniqueProperties);
            const separatedByProperty = [];
            // Prepare what needs to be filtered. Create arrays where each of them holds information what should be filtered.
            uniqueProperties.forEach(property => {
                // console.log("Unique property:", property);
                let uniquePropertyArr = [];
                // console.log("Filters:");
                filters.forEach(filter => {
                    console.log("Filter:", filter);
                    if(property === filter.propertyToFilter) {
                        uniquePropertyArr.push(filter);
                    }
                });
                separatedByProperty.push(uniquePropertyArr);
                // console.log("Separated by property:", separatedByProperty);
            })
            // Filter input Array and save results based on separatedByProperty arrays.
            separatedByProperty.forEach(uniquePropertyArr => {
                console.log("Unique property arr:", uniquePropertyArr);
                uniquePropertyArr.forEach(filter => {
                    // console.log("Filter:", filter);
                    // console.log("Searching arrToFilter where item[filter.propertyToFilter] matches filter.valueToFilter");
                    filteredArr.push(arrToFilter.filter(item => {
                        if(item[filter.propertyToFilter] === filter.valueToFilter) {
                            return true;
                        } else {
                            return false;
                        }
                    })) 
                    // console.log("Filtered arr:", filteredArr);
                })
            })
            filteredArr = filteredArr.flat();
            /* 
            Next step is tests. Each item in filteredArr needs to pass test if he wants to stay in the Array.
            Goal of tests is to further filter filteredArr to contain only CHECKED values from groups of checkboxes.
            If test is ignored, the result of filteredArr won't be complete.
            Let's say there is 2 groups of checkboxes. First group have two checked values, second group have one checked value.
            Now we filter based on first group, then we filter based on second group.
            Problem is when second group is filtered, that second group is ignoring what is checked in first group and vice versa,
            so bellow logic is needed to accomplish final filtered results.
            */
            filteredArr.forEach(item => {
                // console.log("----------- Filtered arr item: -----------", item);
                let testsToPass = uniqueProperties.length;
                // console.log("Tests needed to pass:", testsToPass)
                uniqueProperties.forEach(property => {
                    // console.log("Unique property:", property)
                    valuesToFilter.forEach(value => {
                        // console.log("Filter value:", value);
                        // console.log("Item[property]:", item[property]);
                        if(item[property] === value) {
                                // console.log("One test passed!", item[property], value);
                                testsToPass--;
                            }
                    })
                })
                if(testsToPass === 0) {
                    // console.log("----------- Passed test. Item remains in the filteredArr. -----------", item);
                } else if(testsToPass > 0) {
                    // console.log("----------- Failed test. Item is removed from the filteredArr. -----------", item);
                    filteredArr = filteredArr.filter(filterItem => {
                        return item !== filterItem;
                    })
                }
            })
            return [...new Set([...filteredArr])];
        } else {
            return arrToFilter;
        }
    }

    return {
        filters,
        addFilterHandler,
        removeFilterHandler,
        filterHandler
    }
}