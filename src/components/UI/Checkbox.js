import { useEffect, useState } from "react";
import styles from "./Checkbox.module.css";

const Checkbox = ({ filterKey, checkboxName, onAddCheckboxValue, onRemoveCheckboxValue }) => {
    const [checkbox, setCheckbox] = useState({value: checkboxName, isChecked: false});

    useEffect(() => {
        if(!checkbox.isChecked) {
            onRemoveCheckboxValue({value: checkbox.value});
        }
    }, [checkbox.isChecked, checkbox.value])

    const checkboxChangeHandler = e => {
        setCheckbox(checkbox => {
            return { value: checkbox.value, isChecked: !checkbox.isChecked };
        });
        onAddCheckboxValue({value: checkbox.value, filterKey: filterKey});
    }

    return (
        <div className={styles.checkboxContainer}>
            <input type="checkbox" value={checkboxName} checked={checkbox.isChecked} onChange={checkboxChangeHandler} />
            <label>{checkboxName}</label>
        </div>
    )
}

export default Checkbox;