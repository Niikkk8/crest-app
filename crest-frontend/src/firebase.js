// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAPY9S9tQryxCpVMUsvfpdbLDVB6eL6S4",
  authDomain: "crest-edtech.firebaseapp.com",
  projectId: "crest-edtech",
  storageBucket: "crest-edtech.appspot.com",
  messagingSenderId: "731056085135",
  appId: "1:731056085135:web:1f8ec9085b38ac9daeb8fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);