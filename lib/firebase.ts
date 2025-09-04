// lib/firebase.ts
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBSkw_fJM-aU80AUrPSuOZcYMlpmiasuvE",
  authDomain: "ouasis-of-knowledge.firebaseapp.com",
  projectId: "ouasis-of-knowledge",
  storageBucket: "ouasis-of-knowledge.firebasestorage.app",
  messagingSenderId: "671020788195",
  appId: "1:671020788195:web:08bb8e5ab29a0b415858d6",
  measurementId: "G-GMVY4GNFZC",
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
