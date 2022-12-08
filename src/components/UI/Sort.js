import styles from "./Sort.module.css";

const Sort = ({ onChangeSort, options }) => {
    return (
        <form className={styles.sortForm}>
            <label >Sort:</label>
            <select onChange={onChangeSort}>
                {options.map(option => {
                    return(
                        <option value={option}>{option}</option>
                    )
                })}
            </select>
        </form>
    )
}

export default Sort;