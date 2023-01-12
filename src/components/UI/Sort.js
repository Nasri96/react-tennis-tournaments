import styles from "./Sort.module.css";

import { nanoid } from "nanoid";

const Sort = ({ onChangeSort, options }) => {

    return (
        <form className={styles.sortForm}>
            <p>Sort:</p>
            <select onChange={onChangeSort}>
                {options.map(option => <option key={nanoid()} value={option}>{option}</option>)};
            </select>
        </form>
    )
}

export default Sort;