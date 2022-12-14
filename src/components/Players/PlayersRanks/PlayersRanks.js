import React, { useEffect } from "react";

import styles from  "./PlayersRanks.module.css";

import { useMediaQuery } from "react-responsive";
import { BsFillArrowDownCircleFill } from "react-icons/bs";
import { BsFillArrowUpCircleFill } from "react-icons/bs";

const PlayersRanks = ({ players }) => {
    const isMobile = useMediaQuery({
        query: "(max-width: 768px)"
    });

    useEffect(() => {
        return () => {
            players.forEach(player => {
                player.oldRankPoints.rankDiff = 0;
                player.oldRankPoints.pointsDiff = 0;
            })
        }
    }, [players])

    const iconStyles = { marginLeft: "10px" };

    const playersJSX = players.map(player => {
        let playerRankJSX = "";
        if(player.oldRankPoints.rankDiff > 0) {
            playerRankJSX = <span className={styles.gainRank}>+{player.oldRankPoints.rankDiff}<BsFillArrowUpCircleFill style={iconStyles} /></span>;
        }
        if(player.oldRankPoints.rankDiff === 0) {
            playerRankJSX = "-";
        }
        if(player.oldRankPoints.rankDiff < 0) {
            playerRankJSX = <span className={styles.loseRank}>{player.oldRankPoints.rankDiff}<BsFillArrowDownCircleFill style={iconStyles} /></span>;
        }

        let playerPointsJSX = "-";
        if(player.oldRankPoints.pointsDiff > 0) {
            playerPointsJSX = <span className={styles.gainPoints}>+ {player.oldRankPoints.pointsDiff}</span>;
        }
        if(player.oldRankPoints.pointsDiff === 0) {
            playerPointsJSX = "-";
        }
        if(player.oldRankPoints.pointsDiff < 0) {
            playerPointsJSX = <span className={styles.losePoints}>{player.oldRankPoints.pointsDiff}</span>;
        }

        return (
            <div className={styles.rankRanks}>
                <span>{player.name}</span>
                <div className={styles.playerRank}>
                    <span>{player.rank}</span>
                </div>
                {!isMobile &&
                    <div className={styles.playerRankDiff}>
                        {playerRankJSX}
                    </div>
                }
                <div className={styles.playerPoints}>
                    <span>{player.points}</span>
                </div>
                {!isMobile &&
                    <div className={styles.pointsDiff}>
                        {playerPointsJSX}
                    </div>
                }

            </div>
        )
    })
    
    return (
        <div className={styles.playersRanks}>
            <div className={styles.rankHeaders}>
                <span>Player</span>
                <span>Rank</span>
                {!isMobile &&
                    <span title="Ranks gained or lost from previous tournament">Rank Diff</span>
                }
                <span>Points</span>
                {!isMobile &&
                    <span title="Points gained or lost from previous tournament">Points Diff</span>
                }
            </div>
                {playersJSX}
        </div>
    )
}

export default PlayersRanks;