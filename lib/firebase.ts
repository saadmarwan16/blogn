import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {collection, DocumentData, getDocs, getFirestore, limit, query, QueryDocumentSnapshot, where, Timestamp} from 'firebase/firestore';
import { IFirestorePost, IPost } from "./interfaces";
// import {getStorage} from 'firebase/storage';
import { username } from "./types";

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
// export const storage = getStorage(app);

export const getUserWithUsername = async (username: username) => {
  const usersRef = collection(firestore, 'users');
  const q = query(usersRef, where('username', '==', username), limit(1));
  const userDoc = (await getDocs(q)).docs[0]
  return userDoc;
}

export const postToJson = (doc: QueryDocumentSnapshot<DocumentData>): IPost => {
  const data = doc.data() as IFirestorePost;
  return JSON.parse(JSON.stringify(data)) as IPost

  // return {
  //   ...data,
  //   createdAt: (data.createdAt.toDate()),
  // }
}

// const timeObj = new Timestamp();

// console.log(timeObj instanceof Timestamp)
// console.log(timeObj.toDate());