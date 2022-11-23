import { useState, useEffect, useRef } from "react";

import styles from "./PlayerItem.module.css";

import Tab from "../../UI/Tab";

const PlayerItem = ({ name, rank, points }) => {
    const [playerDetailsIsShown, setPlayerDetailsIsShown] = useState(false);
    const playerNameRef = useRef();
    // scroll effect
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
            <Tab ref={playerNameRef} name={name} onClickHandler={displayPlayerDetailsHandler} isSelected={playerDetailsIsShown ? true : false} type="playerTab" />
            {playerDetailsIsShown && 
             <div className={styles.playerDetails}>
                <h4>Rank: {rank}</h4>
                <h4>Points: {points}</h4>
             </div>
            }
        </div>
    )
            
}

export default PlayerItem;