import { CompletedChallenges } from "../components/CompletedChallgens";
import { CountDown } from "../components/CountDown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";

import styles from '../styles/Pages/Home.module.css';

import Head from 'next/Head';
import ChallengeBox from "../components/ChallengeBox";
import { CountDownProvider } from "../contexts/CountDown.context";

export default function Home() {
  return (
    <div className={styles.container}>
     
    <Head>
      <title> Home | Moove it.</title>
    </Head>
        
      <ExperienceBar/>

    <CountDownProvider>

      <section>        
        <div>
          <Profile/>
          <CompletedChallenges/>
          <CountDown/>
        </div>
        <div>
        <ChallengeBox/>
        </div>

      </section>
    
    </CountDownProvider>

    
    </div>
  )
}
