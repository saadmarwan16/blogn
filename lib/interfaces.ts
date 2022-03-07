import { Timestamp } from "firebase/firestore";

export interface IFirestorePost {
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