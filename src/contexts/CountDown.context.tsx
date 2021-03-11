import {createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengeContext } from '../contexts/ChallengeContext';

interface CountDownContextData {
        minutes: number;
        seconds: number;
        hasFinished: boolean;
        isActive: boolean,
        startCountDown: () => void,
        resetCountDown: () => void,
}


interface CountDownProviderProps {
    children: ReactNode;
}

let countDownTimeout: NodeJS.Timeout

export const CountDownContext = createContext({} as CountDownContextData);

export function CountDownProvider({children}: CountDownProviderProps) {
    
    const {startNewChallenge} = useContext(ChallengeContext);

    //console.log(contextData);
    //let countDownFlag = 25 * 60;

    const [time, setTime] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);
         // 25
    const minutes = Math.floor( time / 60);
    const seconds = time % 60;
    
    

    function startCountDown() {
        setIsActive(true);

    }

    function resetCountDown() {
        clearTimeout(countDownTimeout);
        setIsActive(false);
        setTime(25 * 60);
        setHasFinished(false);
    }

    useEffect(() => {
        if(isActive && time > 0) {
            countDownTimeout = setTimeout(() => {
                setTime(time -1 )
            }, 1000)
        } else if(isActive && time == 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time]);



    
    
    return(
        <CountDownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountDown,
            resetCountDown,

        }}>
            {children}
        </CountDownContext.Provider>
    )
}