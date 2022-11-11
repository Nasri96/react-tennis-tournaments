import { forwardRef } from "react";

import styles from "./Tab.module.css";

const Tab = forwardRef(({ name, onClickHandler, isSelected, type }, ref) => {
    let tabClass;
    if(type === "menuTab") {
        tabClass = `${styles.tab} ${isSelected ? styles.selectedTab : ""}`
    }
    if(type === "playerTab") {
        tabClass = isSelected ? `${styles.playerTab} ${styles.playerSelectedTab}` : styles.playerTab;
    }

    return (
        <button ref={ref} className={tabClass} onClick={onClickHandler} type="button">{name}</button>
    )
})

export default Tab;