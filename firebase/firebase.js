import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDIdWeSVXuPHTtHXwFWTjbOSDGux6d6C2A",
  authDomain: "fullstack-task-manager-d4584.firebaseapp.com",
  projectId: "fullstack-task-manager-d4584",
  storageBucket: "fullstack-task-manager-d4584.firebasestorage.app",
  messagingSenderId: "871043098309",
  appId: "1:871043098309:web:cc1850a225dade01c432ac",
  measurementId: "G-9LD4PKK2KY"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);