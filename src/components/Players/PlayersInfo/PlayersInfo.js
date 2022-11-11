import styles from "./PlayersInfo.module.css";

import PlayersList from "./PlayersList";

const PlayersInfo = ({ players }) => {
    return (
        <div className={styles.playersInfo}>
            <PlayersList  players={players} />
        </div>
    )
}

export default PlayersInfo;