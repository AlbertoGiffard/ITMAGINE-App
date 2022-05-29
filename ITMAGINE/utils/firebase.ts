import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

import firebase from 'firebase/compat/app';

const firebaseConfig = {
    apiKey: "AIzaSyDPcZQ87DyurDeNejWg5w--A7T0zgbOOwQ",
    authDomain: "itmagine-41544.firebaseapp.com",
    projectId: "itmagine-41544",
    storageBucket: "itmagine-41544.appspot.com",
    messagingSenderId: "768620136406",
    appId: "1:768620136406:web:806899bec631aafe124677"
};
  
export default firebase.initializeApp(firebaseConfig);