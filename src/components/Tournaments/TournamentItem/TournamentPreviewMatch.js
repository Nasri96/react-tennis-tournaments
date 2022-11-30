import styles from "./TournamentPreviewMatch.module.css";

const TournamentPreviewMatch = ({ match }) => {
    return (
        <div className={styles.nextRoundMatch}>
            <span>{match.p1.name}</span><span>vs</span><span>{match.p2.name}</span>
        </div>
    )
}

export default TournamentPreviewMatch;