import styles from "./PaginationLinks.module.css";

/* 
PaginationLinks works together with usePagination hook. 
paginationData, paginationPage, setPaginationPage are expected to be passed from usePagination hook
*/
const PaginationLinks = ({paginationData, paginationPage, setPaginationPage}) => {
    // Index of paginationPage
    const paginationDataPageIndex = paginationData.indexOf(paginationPage);

    // Set paginationPage
    const paginationPageChangeHandler = e => {
        setPaginationPage(paginationData[parseInt(e.target.textContent) - 1]);
    }

    return (
        <div className={styles.paginationLinksContainer}>
            {paginationData.map((page, i) => {
                return (
                    <span className={paginationDataPageIndex === i ? `${styles.activePaginationLink} ${styles.paginationLink}` : styles.paginationLink} onClick={paginationPageChangeHandler}>{i + 1}</span>
                )
            })}
        </div>
    )
}

export default PaginationLinks;