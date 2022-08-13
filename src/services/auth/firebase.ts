import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAT3H-OhFCjO_3Td5i2fdO5L3uf46q1a7E",
  authDomain: "scoooool-89933.firebaseapp.com",
  projectId: "scoooool-89933",
  storageBucket: "scoooool-89933.appspot.com",
  messagingSenderId: "311528503017",
  appId: "1:311528503017:web:a34057451b2a1178eda278",
};

// initializeApp(firebaseConfig);
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
