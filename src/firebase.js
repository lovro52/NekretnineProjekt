import firebase from "firebase/compat/app";
import {
  doc,
  addDoc,
  getDoc,
  setDoc,
  getDocs,
  getCount,
  getFirestore,
  collection,
} from "firebase/firestore/lite";
import {
  getAuth,
  updatePassword,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
  beforeAuthStateChanged,
  onAuthStateChanged,
} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHdNx8EM1I9Saxew0AxamweOuJgBg1LYU",
  authDomain: "nekretnineprojekt.firebaseapp.com",
  databaseURL:
    "https://nekretnineprojekt-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "nekretnineprojekt",
  storageBucket: "nekretnineprojekt.appspot.com",
  messagingSenderId: "836126129211",
  appId: "1:836126129211:web:63798ad60cc4e61e28301e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export {
  app,
  auth,
  storage,
  getAuth,
  db,
  doc,
  getDoc,
  setDoc,
  addDoc,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  ref,
  uploadBytes,
  getDownloadURL,
  signOut,
  updatePassword,
};
