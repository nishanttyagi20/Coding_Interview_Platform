// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider,GithubAuthProvider} from 'firebase/auth'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYd3SmzFhZwNv5Gz5cLqNUzxQAJkTDZCI",
  authDomain: "online-interview-1b34c.firebaseapp.com",
  projectId: "online-interview-1b34c",
  storageBucket: "online-interview-1b34c.appspot.com",
  messagingSenderId: "362524129213",
  appId: "1:362524129213:web:1bdfa631a62518af3684d4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth =getAuth(app);
const provider = new GoogleAuthProvider();
const Gitprovider = new GithubAuthProvider();
export {auth,provider,Gitprovider};