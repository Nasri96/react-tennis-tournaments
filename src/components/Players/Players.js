import { useContext } from "react";
import { useActiveTab } from "../../hooks/useActiveTab";

import AppContext from "../../store/app-context";

import styles from "./Players.module.css";
import containerStyles from "./../UI/Container.module.css";

import Card from "../UI/Card";
import Container from "../UI/Container";
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
        <Container type="sidebarContainer">
            <div className={containerStyles.sidebarTabs}>
                <Tab name="Players Ranks" onClickHandler={switchTabHandler} isSelected={isActiveTab("playersranks") ? true : false} type="menuTab" />
                <Tab name="Players Info" onClickHandler={switchTabHandler} isSelected={isActiveTab("playersinfo") ? true : false} type="menuTab" />
            </div>
            {content}
        </Container>
    )
}

export default Players;