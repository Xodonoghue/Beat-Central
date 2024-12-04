import { initializeApp } from "firebase/app";
import { getAuth,deleteUser } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.client_apiKey,
  authDomain: process.env.client_authDomain,
  projectId: process.env.client_projectId,
  storageBucket: process.env.client_storageBucket,
  messagingSenderId: process.env.client_messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 
export const auth = getAuth()
export const storage = getStorage(app)
//const analytics = getAnalytics(app);

