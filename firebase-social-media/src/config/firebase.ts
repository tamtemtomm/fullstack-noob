// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJIXkYNbsI8dOHZcTmZn103Q2rtQsXmxo",
  authDomain: "social-media-firebase-tutorial.firebaseapp.com",
  projectId: "social-media-firebase-tutorial",
  storageBucket: "social-media-firebase-tutorial.appspot.com",
  messagingSenderId: "130848338000",
  appId: "1:130848338000:web:b6789c2e17b81eae75a155"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const db = getFirestore(app)