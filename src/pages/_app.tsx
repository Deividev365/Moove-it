import '../styles/global.css';
import {ChallengesProvider} from '../contexts/ChallengeContext';


function MyApp({ Component, pageProps }) {
  
  
  
  return(  
    // contexto por volta de todo app poderá consumir
      
    <ChallengesProvider>
      <Component {...pageProps} />
    </ChallengesProvider>
    
    
    ) 
    
}

export default MyApp
