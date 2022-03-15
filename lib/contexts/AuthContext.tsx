import { signOut } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  AuthStateHook,
  EmailAndPasswordActionHook,
  SendEmailVerificationHook,
  SignInWithPopupHook,
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSendEmailVerification,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase";
import { user as userType, username as usernameType } from "../types";

interface IAuthContext {
  user: userType;
  username: usernameType;
  registerWithEmailAndPassword: EmailAndPasswordActionHook;
  loginWithEmailAndPassword: EmailAndPasswordActionHook;
  loginWithGoogle: SignInWithPopupHook;
  sendEmailVerification: SendEmailVerificationHook;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<IAuthContext | null>(null);

export const useAuth = () => useContext(AuthContext)!;

const AuthContextProvider: FunctionComponent = ({ children }) => {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState<usernameType>(null);

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

  const value = {
    user: user,
    username: username,
    registerWithEmailAndPassword: useCreateUserWithEmailAndPassword(auth),
    loginWithEmailAndPassword: useSignInWithEmailAndPassword(auth),
    loginWithGoogle: useSignInWithGoogle(auth),
    sendEmailVerification: useSendEmailVerification(auth),
    signOut: () => signOut(auth),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
