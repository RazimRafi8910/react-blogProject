import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import config from "../config/config";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: config.firebaseApiKey,
  authDomain: config.firebaseAuthDomain,
  databaseURL:config.firebaseDatebaseURL,
  projectId: config.firebaseProjectId,
  storageBucket: config.firebaseStorageBucket,
  messagingSenderId: config.firebaseMessagignSenderId,
  appId: config.firebaseAppId,
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const provider = new GoogleAuthProvider();

