// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0UO42KqmSJsRczvxXDPriM_uVaxtOdOE",
  authDomain: "fir-auth-2c3c7.firebaseapp.com",
  projectId: "fir-auth-2c3c7",
  storageBucket: "fir-auth-2c3c7.appspot.com",
  messagingSenderId: "82059654942",
  appId: "1:82059654942:web:53bff9cd7c8eabdf4ffb0f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
