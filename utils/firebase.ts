// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const FIREBASE_CONFIG = {
  API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
// @ts-expect-error
const app = initializeApp(FIREBASE_CONFIG);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db,FIREBASE_CONFIG };

