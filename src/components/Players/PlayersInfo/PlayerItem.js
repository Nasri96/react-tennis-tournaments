import { useState, useEffect, useRef } from "react";

import styles from "./PlayerItem.module.css";

const PlayerItem = ({ name, rank, points }) => {
    const [playerDetailsIsShown, setPlayerDetailsIsShown] = useState(false);
    const playerNameRef = useRef();

    useEffect(() => {
        if(playerDetailsIsShown) {
            window.scroll({
                top: playerNameRef.current.offsetTop,
                behavior: "smooth"
            })
        }
    }, [playerDetailsIsShown])

    const displayPlayerDetailsHandler = () => {
        setPlayerDetailsIsShown(!playerDetailsIsShown);  
    }

    return (
        <div className={styles.player}>
            <h3 ref={playerNameRef} onClick={displayPlayerDetailsHandler} className={!playerDetailsIsShown ? styles.playerName : `${styles.playerName} ${styles.selected}`}>{name}</h3>
            <div className={!playerDetailsIsShown ? `${styles.playerDetails} ${styles.hidden}` : styles.playerDetails}>
                <h4>Rank: {rank}</h4>
                <h4>Points: {points}</h4>
            </div>
        </div>
    )
            
}

export default PlayerItem;