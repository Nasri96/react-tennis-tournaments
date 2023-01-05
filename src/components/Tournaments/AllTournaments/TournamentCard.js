import styles from "./TournamentCard.module.css";

const TournamentCard = ({ tournament, onSetDisplayTournament }) => {
    return (
        <div onClick={onSetDisplayTournament.bind(null, tournament)} className={styles.tournamentCard}>
            <p className={styles.tournamentName}>{tournament.name}</p>
            <p className={styles.tournamentSeries}>Series: {tournament.series}</p>
            <p className={styles.tournamentSurface}>{tournament.surface}</p>
            <p className={styles.tournamentWinner}>Winner: {tournament.winner}</p>
        </div>
    )
}

export default TournamentCard;