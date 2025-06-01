// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsaa1fp3bnkJxQv_kBPfjWtiI0u1dyphs",
  authDomain: "gardenguru-6fce7.firebaseapp.com",
  projectId: "gardenguru-6fce7",
  storageBucket: "gardenguru-6fce7.firebasestorage.app",
  messagingSenderId: "548463962464",
  appId: "1:548463962464:web:57e9b96e494ee92bde9605"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);