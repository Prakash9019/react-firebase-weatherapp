import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCpk_N_0PN5Zw6KAaWDdryPo5L0eXw5cO0",
  authDomain: "intern-da44a.firebaseapp.com",
  projectId: "intern-da44a",
  storageBucket: "intern-da44a.appspot.com",
  messagingSenderId: "602266574781",
  appId: "1:602266574781:web:142e49bfb13e936d2a7cd4",
  measurementId: "G-B285HRWSZN"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);
