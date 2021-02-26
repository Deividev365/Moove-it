import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from '../styles/Components/ChallengeBox.module.css';




export default function ChallengeBox() {
    // consumir regra do negócio em todos os componentes da aplicação // 
    const {activeChallenge, resetChallenge} = useContext(ChallengeContext);


    return(
        <div className={styles.challengeBoxContainer}>

           { activeChallenge ? (
                
                <div className={styles.challengeActive}>
                    <header>Ganhe {activeChallenge.amount} xp</header>

                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt="icon"/>
                        <strong>Novo Desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>

                    <footer>
                        <button 
                            type="button"
                            className={styles.challengeFailedButton}
                            onClick={resetChallenge}
                        >Falhei
                        </button>

                        <button 
                            type="button"
                            className={styles.challengeCompletedButton}

                        >Completei
                        </button>
                    </footer>
                </div>

           ) : (
            <div className={styles.challengeNotActive}>

                <strong>Finalize um ciclo para receber desafios a serem completados</strong>

                <p>
                    <img src="icons/level-up.svg" alt=""/>
                Avance de level completando desafios
                </p>
            </div>
           ) }

        </div>
    
    );
}