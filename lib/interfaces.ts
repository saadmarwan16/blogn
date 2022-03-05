import { Timestamp } from "firebase/firestore";

export interface IFirestorePost {
    content: string;
    createdAt: Timestamp;
    heartCount: number;
    published: boolean;
    slug: string;
    title: string;
    uid: string;
    // updatedAt: Timestamp;
    username: string;
}

export interface IPost {
    content: string;
    createdAt: Date;
    heartCount: number;
    published: boolean;
    slug: string;
    title: string;
    uid: string;
    // updatedAt: string;
    username: string;
}

export const fromDate = Timestamp.fromDate;
export const fromMillis = Timestamp.fromMillis;