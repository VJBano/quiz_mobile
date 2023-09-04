import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import {db} from './config'
import { HighScoreProps } from "../../constant/highscore";

const LeaderBoards = {

    addHighScore: async (user_id:string, username:string, topic:string,score:number ) => {
        
        try {
            
          

        } catch (error) {
            
           
        }
    },

    getHighScore: async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'Leaderboards'));
            
            const highScoresData: HighScoreProps[] = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            
            return highScoresData
          } catch (error) {
            console.error('Error fetching high scores from Firestore:', error);
          }
    }, 

    checkUsername:async (username: string) => {
      
      try {
        
        const querySnapshot = collection(db, 'Leaderboards');
        const userDocs = await getDocs(querySnapshot);

        const usernames = userDocs.docs.map(doc => doc.data().username);

        if (usernames.includes(username)) {
          return true
        } else {
          return false
        }
        
      } catch (error) {
        console.error('Error checking username:', error);
      }
    }
}

export default LeaderBoards