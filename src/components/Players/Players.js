import { useState } from "react";

import styles from "./Players.module.css";
import Card from "../UI/Card";
import PlayersRanks from "./PlayersRanks/PlayersRanks";
import PlayersInfo from "./PlayersInfo/PlayersInfo";

import { players } from "../../simulation/player";

const Players = () => {
    const [activeTab, setActiveTab] = useState("playersranks");

    const switchTabHandler = e => {
        const newStr = e.target.textContent.split(" ").join("").toLowerCase();
        setActiveTab(newStr);
    }

    const isActiveTab = tab => {
        if(activeTab === tab) {
            return true;
        }
        return false;
    }

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
                <button onClick={switchTabHandler} className={`${styles.tab} ${isActiveTab("playersranks") ? styles.activeTab : ""}`} type="button">Players Ranks</button>
                <button onClick={switchTabHandler} className={`${styles.tab} ${isActiveTab("playersinfo") ? styles.activeTab : ""}`} type="button">Players Info</button>
            </div>
            {content}
        </Card>
    )
}

export default Players;