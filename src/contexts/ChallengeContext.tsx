import {createContext, useState, ReactNode, useContext, useEffect} from 'react';
import Cookies from 'js-cookie';

import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/levelUpModal';


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
    completeChallenge: () => void;
    closeLevelUpModal: () => void;
    
}


interface ChallengesProviderProps {
    children: ReactNode
    level: number,
    challengesCompleted: number,
    currentExperience: number,

}


export const ChallengeContext = createContext({} as ChallengesContextData);


export function ChallengesProvider({
    children,
    ...rest


}: ChallengesProviderProps) {

    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience ] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted ] = useState(rest.challengesCompleted ?? 0);


    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

    // controlar a dificuldade para o próximo nível // calc de potencia //
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);


    useEffect(() => {
        Notification.requestPermission();

    }, [])


    useEffect(() => {


        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));

    }, [level, currentExperience, challengesCompleted]);



    function levelUp() {
      setLevel(level + 1);

      setIsLevelUpModalOpen(true)

    }

    function closeLevelUpModal() {
        setIsLevelUpModalOpen(false)
    }


    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);

        const challenge = challenges[randomChallengeIndex];

        new Audio('/notification.mp3').play();

        if(Notification.permission == 'granted') {
            new Notification('Novo Desafio :)))', {
                body: `Valendo ${challenge.amount}`
            })
        }




        setActiveChallenge(challenge);
    }


    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completeChallenge() {
        if(!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if(finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel
            levelUp();
        }


        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }




    

    return(
        <ChallengeContext.Provider value={ {level, levelUp, currentExperience, challengesCompleted, startNewChallenge, activeChallenge, resetChallenge, experienceToNextLevel, completeChallenge, closeLevelUpModal } }>
            {children}

            { isLevelUpModalOpen && <LevelUpModal/> }
            

        </ChallengeContext.Provider>

    )
}