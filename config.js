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
const firebaseConfig = {};

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
