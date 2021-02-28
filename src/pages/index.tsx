import { CompletedChallenges } from "../components/CompletedChallgens";
import { CountDown } from "../components/CountDown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";


import {GetServerSideProps} from 'next';

import styles from '../styles/Pages/Home.module.css';

import Head from 'next/Head';
import ChallengeBox from "../components/ChallengeBox";
import { CountDownProvider } from "../contexts/CountDown.context";
import { ChallengesProvider } from "../contexts/ChallengeContext";

interface HomeProps {
      level: number,
      challengesCompleted: number,
      currentExperience: number,
}


export default function Home(props:HomeProps) {

  console.log(props);
return(
  <ChallengesProvider level={props.level} currentExperience={props.currentExperience}
  challengesCompleted={props.challengesCompleted}>

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

    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {


  const {level, currentExperience, challengesCompleted } = ctx.req.cookies;
  
  
  return {
    props: {
      level: Number(level),
      challengesCompleted: Number(challengesCompleted),
      currentExperience: Number(currentExperience),
    }
  }
}
