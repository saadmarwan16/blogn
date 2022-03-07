import { User } from "firebase/auth";

export type user = User | null | undefined;
export type username = string | null | undefined;
export type post = {
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