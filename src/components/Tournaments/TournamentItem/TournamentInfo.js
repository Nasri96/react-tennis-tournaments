import styles from "./TournamentInfo.module.css";

const TournamentInfo = ({ tournament, tournamentIsFinished }) => {
    return (
        <div className={styles.tournamentInfo}>
            <p className={styles.tournamentName}>{tournament.name}</p>
            <p className={styles.tournamentSeries}>Series: {tournament.series}</p>
            {tournamentIsFinished && 
                <p className={styles.tournamentSeries}>Winner: {tournament.winner}</p>
            }
        </div>
    )
}

export default TournamentInfo;