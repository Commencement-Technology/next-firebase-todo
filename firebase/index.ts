// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyCf9QLPlik5QJcAtDgY_5P-VbwD2WeKjZ0",
authDomain: "[next-firebase-todo-b0b9e.firebaseapp.com](http://next-firebase-todo-b0b9e.firebaseapp.com/)",
projectId: "next-firebase-todo-b0b9e",
storageBucket: "[next-firebase-todo-b0b9e.appspot.com](http://next-firebase-todo-b0b9e.appspot.com/)",
messagingSenderId: "150417331472",
appId: "1:150417331472:web:818ffb23f32e3a1bcfc195"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };