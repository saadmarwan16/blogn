import { onSnapshot, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "./firebase";
import { TUsername } from "./types";

const useUserData = () => {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState<TUsername>(null);

  useEffect(() => {
    let unsubscribe;

    if (user) {
      const ref = doc(firestore, "users", user.uid);
      unsubscribe = onSnapshot(ref, (doc) => {
        setUsername(doc.data()?.username);
      });
    } else {
      setUsername(null);
    }

    return unsubscribe;
  }, [user]);

  return { user, username };
};

export default useUserData;
