import {createContext, useState, ReactNode, useContext} from 'react';
import challenges from '../../challenges.json';


interface challenge {
    type: 'body' | 'eye';
    description: String;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    activeChallenge: challenge;
    experienceToNextLevel: number;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    
}


interface ChallengesProviderProps {
    children: ReactNode
}


export const ChallengeContext = createContext({} as ChallengesContextData);


export function ChallengesProvider({children}: ChallengesProviderProps) {

    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience ] = useState(0);
    const [challengesCompleted, setChallengesCompleted ] = useState(0);


    const [activeChallenge, setActiveChallenge] = useState(null);


    // controlar a dificuldade para o próximo nível // calc de potencia //
    const experienceToNextLevel = Math.pow((level + 1) * 8, 2);


    function levelUp() {
      setLevel(level + 1);
    }


    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);

        const challenge = challenges[randomChallengeIndex];


        setActiveChallenge(challenge);
    }


    function resetChallenge() {
        setActiveChallenge(null);
    }




    

    return(
        <ChallengeContext.Provider value={ {level, levelUp, currentExperience, challengesCompleted, startNewChallenge, activeChallenge, resetChallenge, experienceToNextLevel } }>
            {children}
        </ChallengeContext.Provider>

    )
}