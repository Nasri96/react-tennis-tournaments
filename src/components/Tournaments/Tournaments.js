import { useActiveTab } from "../../hooks/useActiveTab";

import styles from "./Tournament.module.css";

import Card from "../UI/Card";
import Tab from "../UI/Tab";
import TournamentList from "./AllTournaments/TournamentList";
import TournamentForm from "./CreateTournament/TournamentForm";
import TournamentPlay from "./PlayTournament/TournamentPlay";

const Tournaments = () => {
    const { activeTab, isActiveTab, switchTabHandler } = useActiveTab("alltournaments");

    let content;
    if(activeTab === "alltournaments") {
        content = <TournamentList />;
    }
    if(activeTab === "createtournament") {
        content = <TournamentForm onSwitchTab={switchTabHandler} />;
    }
    if(activeTab === "playtournament") {
        content = <TournamentPlay  />
    }

    return (
        <Card>
            <div className={styles.tabs}>
                <Tab name="All Tournaments" onClickHandler={switchTabHandler} isSelected={isActiveTab("alltournaments") ? true : false} type="menuTab" />
                <Tab name="Create Tournament" onClickHandler={switchTabHandler} isSelected={isActiveTab("createtournament") ? true : false} type="menuTab" />
                <Tab name="Play Tournament" onClickHandler={switchTabHandler} isSelected={isActiveTab("playtournament") ? true : false} type="menuTab" />
            </div>
            {content}
        </Card>
    )
}

export default Tournaments;