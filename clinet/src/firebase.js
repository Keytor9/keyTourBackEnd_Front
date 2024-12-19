// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// استبدل هذه القيم بالمعلومات التي حصلت عليها من Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyAavhG1F5s_deDikkhLJxBs0b6rucem8Mk",
  authDomain: "keytour-b91d0.firebaseapp.com",
  projectId: "keytour-b91d0",
  storageBucket: "keytour-b91d0.appspot.com",
  messagingSenderId: "117121264292",
  appId: "1:117121264292:web:22f2d5cda5beb01e9e5431",
  measurementId: "G-M400N444VE"
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
