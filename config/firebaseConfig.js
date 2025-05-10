// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "loop-clone-356c4.firebaseapp.com",
  projectId: "loop-clone-356c4",
  storageBucket: "loop-clone-356c4.firebasestorage.app",
  messagingSenderId: "189729074018",
  appId: "1:189729074018:web:2726cf59dfdae4f5ba1a3b",
  measurementId: "G-LL46N4PS23"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);