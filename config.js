// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  onSnapshot,
  getFirestore,
  doc,
  getDoc,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
  orderBy,
  setDoc,
} from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlFCshri_xm185wywqFK0IFzrHW5OgvbI",
  authDomain: "angel-or-demon-application.firebaseapp.com",
  projectId: "angel-or-demon-application",
  storageBucket: "angel-or-demon-application.appspot.com",
  messagingSenderId: "407278094452",
  appId: "1:407278094452:web:283e426856afa52cd36921",
};

initializeApp(firebaseConfig);

// Initialize Firebase
const firestore = getFirestore();

const QUESTIONS = "questions";
const USERS = "users";

export {
  firestore,
  collection,
  QUESTIONS,
  USERS,
  query,
  addDoc,
  serverTimestamp,
  onSnapshot,
  getAuth,
  signInWithEmailAndPassword,
  where,
  getDocs,
  setDoc,
  orderBy,
  doc,
  getDoc,
};
