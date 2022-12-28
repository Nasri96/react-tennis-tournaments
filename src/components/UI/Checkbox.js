import { useState } from "react";

import styles from "./Checkbox.module.css";

const Checkbox = ({ propertyToFilter, checkboxName, onAddFilter, onRemoveFilter }) => {
    const [checkbox, setCheckbox] = useState({value: checkboxName, isChecked: false});

    const checkboxChangeHandler = e => {
        setCheckbox(checkbox => {
            return { value: checkbox.value, isChecked: !checkbox.isChecked };
        });
        if(checkbox.isChecked) {
            onRemoveFilter({valueToFilter: checkbox.value});
        } else {
            onAddFilter({valueToFilter: checkbox.value, propertyToFilter: propertyToFilter});
        }
    }

    return (
        <div className={styles.checkboxContainer}>
            <input type="checkbox" value={checkboxName} checked={checkbox.isChecked} onChange={checkboxChangeHandler} />
            <label>{checkboxName}</label>
        </div>
    )
}

export default Checkbox;