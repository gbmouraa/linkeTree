import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC3QOrnp8ldgBKtBSJcdAUcjfq3Qjl022M",
  authDomain: "linketree-curso.firebaseapp.com",
  projectId: "linketree-curso",
  storageBucket: "linketree-curso.firebasestorage.app",
  messagingSenderId: "964416891945",
  appId: "1:964416891945:web:05e273f9bc2a01e48a0038",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
