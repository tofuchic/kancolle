import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_ENV_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_ENV_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_ENV_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_ENV_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_ENV_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_ENV_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_ENV_FIREBASE_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
