import firebase from 'firebase/compat/app'
import { doc, addDoc, getDoc, setDoc, getDocs, getCount, getFirestore, collection } from 'firebase/firestore/lite'
import { getAuth, updatePassword, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, confirmPasswordReset, beforeAuthStateChanged, onAuthStateChanged } from 'firebase/auth'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB7dkHe-jksndinKmhDaACxEjXW2zugRaw",
    authDomain: "nekretnine-ebad8.firebaseapp.com",
    projectId: "nekretnine-ebad8",
    storageBucket: "nekretnine-ebad8.appspot.com",
    messagingSenderId: "191923220348",
    appId: "1:191923220348:web:4e1a0ce2e61d8570d77ef9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export {
    app, auth, storage,
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
    updatePassword
}
