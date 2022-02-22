import { createContext } from "react";
import { user, username } from "./types";

export const UserContext = createContext<{user: user, username: username}>({user: null, username: null});