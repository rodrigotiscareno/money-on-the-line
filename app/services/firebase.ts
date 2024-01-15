// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4cazvqibDHKR0I3HfGpFgc2cQxKOZ3Dw",
  authDomain: "money-on-the-line.firebaseapp.com",
  projectId: "money-on-the-line",
  storageBucket: "money-on-the-line.appspot.com",
  messagingSenderId: "1009506315178",
  appId: "1:1009506315178:web:de7003e3ed1b9757a119d3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
