import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
   apiKey: "AIzaSyC54Hz8PKYBaJnY_xKIsIUHIvbqGBGhnu8",
   authDomain: "woodsindica-2a9db.firebaseapp.com",
   projectId: "woodsindica-2a9db",
   storageBucket: "woodsindica-2a9db.appspot.com",
   messagingSenderId: "128387770060",
   appId: "1:128387770060:web:8ec20988b4987efab5c469",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
