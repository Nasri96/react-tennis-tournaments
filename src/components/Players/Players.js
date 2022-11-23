import { useState } from "react";

import styles from "./Players.module.css";
import Card from "../UI/Card";
import PlayersRanks from "./PlayersRanks/PlayersRanks";
import PlayersInfo from "./PlayersInfo/PlayersInfo";

import useActiveTab from "../../hooks/useActiveTab";

import Tab from "../UI/Tab";

import { players } from "../../simulation/player";

const Players = () => {
    const { activeTab, switchTabHandler, isActiveTab } = useActiveTab("playersranks");

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