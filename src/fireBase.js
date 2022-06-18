// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBektCMzB6S8Roi7kbaSpFwlVVCe9a2cwE",
  authDomain: "tpadekstopgm.firebaseapp.com",
  projectId: "tpadekstopgm",
  storageBucket: "tpadekstopgm.appspot.com",
  messagingSenderId: "319632566602",
  appId: "1:319632566602:web:578aeaf14acb4b12ba39b3",
  measurementId: "G-J7GTDP2D7W"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export default db