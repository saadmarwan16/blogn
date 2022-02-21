import { initializeApp } from "firebase/app";
import {getAuth, AuthProvider, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCaeRK5mr_jBQUayRH8MIP8loutMOr5NWU",
  authDomain: "blogn-506dd.firebaseapp.com",
  projectId: "blogn-506dd",
  storageBucket: "blogn-506dd.appspot.com",
  messagingSenderId: "626556670515",
  appId: "1:626556670515:web:66c9d76c37dbb8d7e88946"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const authProvider = new GoogleAuthProvider();
export const  firestore = getFirestore(app);
export const storage = getStorage(app);