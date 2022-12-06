import styles from "./TournamentInfo.module.css";

const TournamentInfo = ({ activeTournament, tournamentIsFinished }) => {
    return (
        <div className={styles.tournamentInfo}>
            <p className={styles.tournamentName}>{activeTournament.name}</p>
            <p className={styles.tournamentSeries}>Series: {activeTournament.series}</p>
            {tournamentIsFinished && 
                <p className={styles.tournamentSeries}>Winner: {activeTournament.winner}</p>
            }
        </div>
    )
}

export default TournamentInfo;