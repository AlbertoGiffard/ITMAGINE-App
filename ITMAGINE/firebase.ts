// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB89Y_kGMNDRBf-c8K57KBOlqYk6khl8Uw",
  authDomain: "michat-f7b9c.firebaseapp.com",
  projectId: "michat-f7b9c",
  storageBucket: "michat-f7b9c.appspot.com",
  messagingSenderId: "1008156798984",
  appId: "1:1008156798984:web:6686b30e3124053df2e1bd"
};

const APP_NAME = 'ITMAGINE';

// Initialize Firebase
let app;

try {
  app = firebase.getApp(APP_NAME);
} catch( error ) {
  app = firebase.initializeApp(firebaseConfig, APP_NAME);
}

export default app;
export const auth = getAuth(app);
