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
  createdAt: number;
  heartCount: number;
  published: boolean;
  slug: string;
  title: string;
  uid: string;
  updatedAt: number;
  username: string;
}
