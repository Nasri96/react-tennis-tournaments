import styles from "./TournamentInfo.module.css";

const TournamentInfo = ({ activeTournament, tournamentIsFinished }) => {
    return (
        <div className={styles.tournamentInfo}>
            <p className={styles.tournamentName}>{activeTournament.name}</p>
            {tournamentIsFinished && 
                <p className={styles.tournamentSeries}>Winner: {activeTournament.winner}</p>
            }
            <p className={styles.tournamentSeries}>Series: {activeTournament.series}</p>
            <p className={styles.tournamentSurface}>Surface: {activeTournament.surface}</p>
        </div>
    )
}

export default TournamentInfo;