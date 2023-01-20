 // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbZsIQKzeotdnrO1JFJq4JoB0WGxhpAP0",
  authDomain: "conditional-redering-auth.firebaseapp.com",
  projectId: "conditional-redering-auth",
  storageBucket: "conditional-redering-auth.appspot.com",
  messagingSenderId: "285243462146",
  appId: "1:285243462146:web:ce0335dc77cd293667cd1b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;