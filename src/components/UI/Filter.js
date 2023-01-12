import styles from "./Filter.module.css";

import Checkbox from "./Checkbox";

import { nanoid } from "nanoid";

/* 
-- Props --

| config | required | Array[ Object{ groupName: String, propertyToFilter: String, valuesToFilter: Array[ String ] }, Object2... ]
- config array -
| groupName | String | -name of checkbox group
| propertyToFilter | String | -property of item that is being filtered
| valuesToFilter | Array | -eventual values of items's property

| onAddFilter | Function | This function is received from useFilter hook. Function is further passed to Checkbox component.
| onRemoveFilter | Function | This function is received from useFilter hook. Function is further passed to Checkbox component.
*/
const Filter = ({ config, onAddFilter, onRemoveFilter }) => {

    return (
        <form className={styles.filterForm}>
            <p>Filters:</p>
            <div className={styles.filtersContainer}>
                {config.map((configFilter, i) => {
                    return (
                        <div key={i} className={styles.groups}>
                            <p className={styles.groupName}>{configFilter.groupName}</p>
                            {configFilter.valuesToFilter.map(checkboxName => {
                                return (
                                    <Checkbox key={checkboxName} propertyToFilter={configFilter.propertyToFilter} checkboxName={checkboxName} onAddFilter={onAddFilter} onRemoveFilter={onRemoveFilter} />
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