import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA8EyjvOOZb67mUvGt7SVUj990PLf8qN6U",
  authDomain: "noroestech-ecommerce.firebaseapp.com",
  projectId: "noroestech-ecommerce",
  storageBucket: "noroestech-ecommerce.firebasestorage.app",
  messagingSenderId: "575830946820",
  appId: "1:575830946820:web:0c4d7ed371800a1da1b151",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getaaAuth(app);

export default app;