// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:
    import.meta.env.VITE_FIREBASE_API_KEY ||
    "AIzaSyDq3Su-7-rVrDGc3yPVNhKvwH4VysquPEo",
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ||
    "fptu-handbook-rag.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "fptu-handbook-rag",
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ||
    "fptu-handbook-rag.firebasestorage.app",
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "681914140337",
  appId:
    import.meta.env.VITE_FIREBASE_APP_ID ||
    "1:681914140337:web:929ca68d9c69f5615d8490",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-W95R17Y68P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (optional)
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

// Initialize Storage
export const storage = getStorage(app);

// Initialize Auth
export const auth = getAuth(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account", // Always show account selection
});

export { app, analytics };
