import { useState } from "react";

/* 
useActiveTab hook is used to switch between tabs.
*/

export const useActiveTab = tabName => {
    const [activeTab, setActiveTab] = useState(tabName);

    const switchTabHandler = (e, tabName) => {
        // console.log(tabName);
        if(tabName) {
            setActiveTab(tabName);
        } else {
            const newStr = e.target.textContent.split(" ").join("").toLowerCase();
            setActiveTab(newStr);
        }
    }

    const isActiveTab = tabName => {
        if(activeTab === tabName) {
            return true;
        }
        return false;
    }


    return {
        activeTab,
        switchTabHandler,
        isActiveTab
    }
}