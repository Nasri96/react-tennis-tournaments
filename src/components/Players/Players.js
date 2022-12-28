import { useContext } from "react";
import { useActiveTab } from "../../hooks/useActiveTab";

import AppContext from "../../store/app-context";

import styles from "./Players.module.css";

import Card from "../UI/Card";
import PlayersRanks from "./PlayersRanks/PlayersRanks";
import PlayersInfo from "./PlayersInfo/PlayersInfo";
import Tab from "../UI/Tab";

const Players = () => {
    const { activeTab, switchTabHandler, isActiveTab } = useActiveTab("playersranks");
    const { players } = useContext(AppContext);

    let content;
    if(activeTab === "playersranks") {
        content = <PlayersRanks players={players} />;
    }
    if(activeTab === "playersinfo") {
        content = <PlayersInfo players={players} />;
    }

    return (
        <Card>
            <div className={styles.tabs}>
                <Tab name="Players Ranks" onClickHandler={switchTabHandler} isSelected={isActiveTab("playersranks") ? true : false} type="menuTab" />
                <Tab name="Players Info" onClickHandler={switchTabHandler} isSelected={isActiveTab("playersinfo") ? true : false} type="menuTab" />
            </div>
            {content}
        </Card>
    )
}

export default Players;