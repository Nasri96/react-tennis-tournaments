import React, { useEffect, useState } from "react";

import styles from "./Filter.module.css";

import Checkbox from "./Checkbox";

/* 
filters: Array[ Object{ filterName: String, checkboxNames: Array[ String ] }, Object2... ]
*/
const Filter = ({ filters, onGetCheckboxValues }) => {
    const [checkboxValues, setCheckboxValues] = useState([]);

    const addCheckboxValue = (value) => {
        setCheckboxValues(values => {
            return [...values, value];
        })
    }

    const removeCheckboxValue = checkbox => {
        setCheckboxValues(checkboxes => {
            return checkboxes.filter(checkboxValue => {
                return checkboxValue.value !== checkbox.value;
            })
        })
    }

    // Get latest values for filters
    useEffect(() => {
        onGetCheckboxValues(checkboxValues);
    }, [checkboxValues]);

    return (
        <form className={styles.filterForm}>
            <label>Filters:</label>
            <div className={styles.filtersContainer}>
                {filters.map(filter => {
                    return (
                        <div>
                            <p className={styles.filterName}>{filter.filterName}</p>
                            {filter.checkboxNames.map(checkboxName => {
                                return (
                                    <Checkbox filterKey={filter.filterKey} checkboxName={checkboxName} onAddCheckboxValue={addCheckboxValue} onRemoveCheckboxValue={removeCheckboxValue} />
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </form>
    )
}

export default Filter;