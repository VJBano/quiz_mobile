import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'
import '@react-native-async-storage/async-storage'; 

import { KEY_IP, 
    API_KEY,
    AUTH_DOMAIN,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGING_SENDERID,
    APP_ID,
    MEASUREMENT_ID,
 } from '@env'

const Config = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDERID,
    appId: APP_ID,
    measurementId: MEASUREMENT_ID
};
const app = initializeApp(Config);
export const db = getFirestore(app);
