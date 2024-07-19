// lib/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA86UdJ8hvnkHgI_tGDMSdafs1dXJRA3kI",
  authDomain: "dev-digiwhistle.firebaseapp.com",
  projectId: "dev-digiwhistle",
  storageBucket: "dev-digiwhistle.appspot.com",
  messagingSenderId: "1034481607956",
  appId: "1:1034481607956:web:7c44eec27547dcf98cce01",
  measurementId: "G-V4PW92X2F5",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
