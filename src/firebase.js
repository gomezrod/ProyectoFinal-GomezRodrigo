import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDG9StxycdiPqJ5kvsCL5qYvodEFHan-KU",
    authDomain: "tp1-react-coderhouse.firebaseapp.com",
    projectId: "tp1-react-coderhouse",
    storageBucket: "tp1-react-coderhouse.firebasestorage.app",
    messagingSenderId: "856672967354",
    appId: "1:856672967354:web:b82ef593109db1fafd8083",
    measurementId: "G-HLLBH4M7L2"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {app, db};