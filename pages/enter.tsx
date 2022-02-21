import { NextPage } from "next";
import { FunctionComponent, useContext } from "react";
import { auth, authProvider } from "../lib/firebase";
import { signInWithPopup, signOut } from 'firebase/auth';
import { UserContext } from "../lib/context";

const EnterPage: NextPage = () => {
  const {user, username} = useContext(UserContext);

  return (
    <main>
      {user ? !username ? <UsernameForm /> : <SignOutButton /> : <SignInButton /> }
    </main>
  );
};
 
const SignInButton: FunctionComponent = () => {
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, authProvider)
  };

  return ( 
    <button className="btn-google" onClick={signInWithGoogle}>
      <img src="/google.png" alt="google logo" />
      Sign in with Google
      </button>
   );
}
 
const SignOutButton: FunctionComponent = () => {
  return ( 
    <button onClick={() => signOut(auth)}>Sign out</button>
   );
}
 
// const UsernameForm: FunctionComponent = () => {
//   return (  );
// }
 
export default EnterPage;
