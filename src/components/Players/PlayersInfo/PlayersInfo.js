import styles from "./PlayersInfo.module.css";

import PlayerList from "./PlayerList";

const PlayersInfo = ({ players }) => {
    return (
        <div className={styles.playersInfo}>
            <PlayerList  players={players} />
        </div>
    )
}

export default PlayersInfo;