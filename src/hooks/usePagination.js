import { useState } from "react";

// Create Array that holds paginationPages -> [[page1],[page2],[page3],[page4]];
const createPaginationData = (inputData, itemsPerPage) => {
    const paginationArr = [];
    let paginationItems = [];
    inputData.forEach((el, i) => {
        if(i % itemsPerPage === 0) {
            paginationItems = [];
            paginationArr.push(paginationItems);
        }
        paginationItems.push(el);
    })
    
    return paginationArr;
}

/* 
usePagination hook works together with PaginationLinks component.
What is returned from hook is passed to PaginationLinks component.
paginationPage contains paginated data for current page.

-- Function Arguments --
| Input data | Array | -Array of all items.
| itemsPerPage | Number | -Number of items per paginationPage.
*/
export const usePagination = (inputData, itemsPerPage = 10) => {
    const [paginationData, setPaginationData] = useState(createPaginationData(inputData, itemsPerPage));
    const [paginationPage, setPaginationPage] = useState(paginationData[0] || []);

    return {
        paginationData,
        paginationPage,
        setPaginationPage
    }
}