// src/data/firestore.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAB9a0tExSm5tKynAXLFbq7H-yQtlgr",
    authDomain: "quiz-game-73509.firebaseapp.com",
    projectId: "quiz-game-73509",
    storageBucket: "quiz-game-73509.appspot.com",
    messagingSenderId: "667755596195",
    appId: "1:667755596195:web:f7119f3a177924f595a9a"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
