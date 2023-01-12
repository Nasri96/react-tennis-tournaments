import styles from "./PaginationLinks.module.css";

import { nanoid } from "nanoid";

/* 
PaginationLinks works together with usePagination hook. 
paginationData, paginationPage, setPaginationPage are expected to be passed from usePagination hook.
PaginationLinks component is needed to change paginationPage.
onScroll function is used for scrolling to begining of container
*/
const PaginationLinks = ({onScroll, paginationData, paginationPage, setPaginationPage}) => {
    // Index of paginationPage
    const paginationDataPageIndex = paginationData.indexOf(paginationPage);

    // Set paginationPage, scroll to container
    const paginationPageChangeHandler = e => {
        onScroll();
        setPaginationPage(paginationData[parseInt(e.target.textContent) - 1]);
    }

    return (
        <div className={styles.paginationLinksContainer}>
            <div className={styles.pagination}>
                {paginationData.map((page, i) => {
                    return (
                        <span key={nanoid()} className={paginationDataPageIndex === i ? `${styles.activePaginationLink} ${styles.paginationLink}` : styles.paginationLink} onClick={paginationPageChangeHandler}>{i + 1}</span>
                    )
                })}
            </div>
            
        </div>
    )
}

export default PaginationLinks;