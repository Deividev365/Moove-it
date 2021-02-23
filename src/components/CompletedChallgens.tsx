import styles from '../styles/Components/CompletedChallgens.module.css';


export function CompletedChallenges() {
    return(
        <div className={styles.completedChallengeContainer}>
            <span>Desafios Completos:</span>
            <span>5</span>
        </div>
    )
}