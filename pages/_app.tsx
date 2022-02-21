import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import { UserContext, username } from "../lib/context";
import {useAuthState} from 'react-firebase-hooks/auth';
import { auth } from "../lib/firebase";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState<username>(null);

  useEffect(() => {
    let unsubscribe;

    if (user) {
      unsubscribe = getDocs();
    } else {
      setUsername(null);
    }

    return unsubscribe;
  }, [user])
  

  return (
    <UserContext.Provider value={{user, username}}>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </UserContext.Provider>
  );
}

export default MyApp;
