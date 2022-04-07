import { User } from "firebase/auth";

export type user = User | null | undefined;
export type username = string | null | undefined;
export type post = {
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