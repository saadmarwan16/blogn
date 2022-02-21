import { User } from "firebase/auth";
import { createContext } from "react";

export type user = User | null | undefined;
export type username = string | null;

export const UserContext = createContext<{user: user, username: username}>({user: null, username: null});