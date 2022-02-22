import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "./firebase";
import { username } from "./context";

const useUserData = () => {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState<username>(null);

  useEffect(() => {
    let unsubscribe;

    if (user) {
      const ref = collection(firestore, "users");
      unsubscribe = onSnapshot(ref, (snapshot) => {
        console.log(snapshot.docs.forEach((doc) => console.log(doc.data())));
      });
    } else {
      setUsername(null);
    }

    return unsubscribe;
  }, [user]);

  return { user, username };
};

export default useUserData;
