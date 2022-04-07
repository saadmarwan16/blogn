import { Timestamp } from "firebase/firestore";

export interface IFirestorePost {
  imageUrl: string;
  userImageUrl: string;
  userDisplayName: string;
  content: string;
  createdAt: Timestamp;
  heartCount: number;
  published: boolean;
  slug: string;
  title: string;
  uid: string;
  updatedAt: Timestamp;
  username: string;
}

export interface IPost {
  id: string;
  imageUrl: string;
  userImageUrl: string;
  userDisplayName: string;
  content: string;
  createdAt: any;
  heartCount: number;
  published: boolean;
  slug: string;
  title: string;
  uid: string;
  updatedAt: any;
  username: string;
}

export interface IUserDoc {
  displayName: string;
  photoUrl: string;
  username: string;
}
