import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {
  collection,
  DocumentData,
  getDocs,
  getFirestore,
  limit,
  query,
  where,
  Timestamp,
  DocumentSnapshot,
  serverTimestamp as firebaseServerTimestamp,
  increment as firebaseIncrement,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { IFirestorePost, IPost } from "./interfaces";
import { TUsername } from "./types";

export const LIMIT = 1;

const firebaseConfig = {
  apiKey: "AIzaSyCaeRK5mr_jBQUayRH8MIP8loutMOr5NWU",
  authDomain: "blogn-506dd.firebaseapp.com",
  projectId: "blogn-506dd",
  storageBucket: "blogn-506dd.appspot.com",
  messagingSenderId: "626556670515",
  appId: "1:626556670515:web:66c9d76c37dbb8d7e88946",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const authProvider = new GoogleAuthProvider();
export const firestore = getFirestore(app);
export const storage = getStorage(app);

export const getUserWithUsername = async (username: TUsername) => {
  const usersRef = collection(firestore, "users");
  const q = query(usersRef, where("username", "==", username), limit(1));
  const userDoc = (await getDocs(q)).docs[0];
  return userDoc;
};

export const postToJson = (doc: DocumentSnapshot<DocumentData>): IPost => {
  const data = doc.data() as IFirestorePost;

  return {
    ...data,
    id: doc.id,
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
};

export const getDateTime = (seconds: number, nanoseconds: number) => {
  const timestamp = new Timestamp(seconds, nanoseconds);
  const dateTime = new Date(timestamp.toMillis());

  const time = dateTime.toTimeString().split(" ");

  return {
    date: dateTime.toDateString(),
    time: time[0],
  };
};

export const fromMillis = Timestamp.fromMillis;
export const serverTimestamp = firebaseServerTimestamp;
export const increment = firebaseIncrement;
