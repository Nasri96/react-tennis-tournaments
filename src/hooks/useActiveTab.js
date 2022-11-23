import { useState } from "react";

const useActiveTab = tab => {
    const [activeTab, setActiveTab] = useState(tab);

    const switchTabHandler = (e, tabName) => {
        console.log(tabName);
        if(tabName) {
            setActiveTab(tabName);
        } else {
            const newStr = e.target.textContent.split(" ").join("").toLowerCase();
            setActiveTab(newStr);
        }
    }

    const isActiveTab = tab => {
        if(activeTab === tab) {
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

export default useActiveTab;