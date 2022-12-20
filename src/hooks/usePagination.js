import { useState } from "react";

import styles from "./Pagination.module.css";

// Create Array that holds paginationPages -> [[page1],[page2],[page3],[page4]];
const createPaginationData = (arr, itemsPerPage) => {
    const paginationArr = [];
    let paginationItems = [];
    arr.forEach((el, i) => {
        if(i % itemsPerPage === 0) {
            paginationItems = [];
            paginationArr.push(paginationItems);
        }
        paginationItems.push(el);
    })
    
    return paginationArr;
}

// inputData | required => Array of all items
// itemsPerPage | optional => Num of items per paginationPage 
export const usePagination = (inputData, itemsPerPage = 10) => {
    const [paginationData, setPaginationData] = useState(createPaginationData(inputData, itemsPerPage));
    const [paginationPage, setPaginationPage] = useState(paginationData[0] || []);

    // ----- OLD CODE -----
    // // function which returns Array with populated links to change paginationPage
    // const paginationPageLinks = () => {
    //     const paginationLinks = [];
        
    //     const paginationDataPageIndex = paginationData.indexOf(paginationPage);
    //     for(let i = 0; i < paginationData.length; i++) {
    //         const link = <span className={paginationDataPageIndex === i ? `${styles.activePaginationLink} ${styles.paginationLink}` : styles.paginationLink} onClick={paginationPageChangeHandler}>{i + 1}</span>;
    //         paginationLinks.push(link);
    //     }

    //     return <div className={styles.paginationContainer}>{paginationLinks}</div>
    // }

    return {
        paginationData,
        paginationPage,
        setPaginationPage
    }
}

const PaginationPageLinks = ({paginationData, paginationPage, setPaginationPage}) => {
    const paginationDataPageIndex = paginationData.indexOf(paginationPage);

    const paginationPageChangeHandler = e => {
        setPaginationPage(paginationData[parseInt(e.target.textContent) - 1]);
    }

    return (
        <div className={styles.paginationContainer}>
            {paginationData.map((page, i) => {
                return (
                    <span className={paginationDataPageIndex === i ? `${styles.activePaginationLink} ${styles.paginationLink}` : styles.paginationLink} onClick={paginationPageChangeHandler}>{i + 1}</span>
                )
            })}
        </div>
    )
}

export default PaginationPageLinks;