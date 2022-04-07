import { NextPage } from "next";
import {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { auth, authProvider, firestore } from "../lib/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { getDoc, doc, writeBatch } from "firebase/firestore";
import debounce from "lodash.debounce";
import Metatags from "../components/Metatags";
import { useAuth } from "../lib/contexts/AuthContext";

const EnterPage: NextPage = () => {
  const { user, username } = useAuth();

  return (
    <main>
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <SignOutButton />
        )
      ) : (
        <SignInButton />
      )}
    </main>
  );
};

const SignInButton: FunctionComponent = () => {
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, authProvider);
  };

  return (
    <button className="btn-google" onClick={signInWithGoogle}>
      <img src="/google.png" alt="google logo" />
      Sign in with Google
    </button>
  );
};

const SignOutButton: FunctionComponent = () => {
  return <button onClick={() => signOut(auth)}>Sign out</button>;
};

const UsernameForm: FunctionComponent = () => {
  const [formValue, setFormValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = useAuth();

  const checkUsername = useMemo(
    () =>
      debounce(async (username: string) => {
        if (username.length >= 3) {
          const ref = await getDoc(doc(firestore, `usernames/${username}`));
          setIsValid(!ref.exists());
          setLoading(false);
        }
      }, 500),
    []
  );

  useEffect(() => {
    checkUsername(formValue);
  }, [checkUsername, formValue]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toLocaleLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
    setFormValue(val);

    if (val.length < 3) {
      setIsValid(false);
      setLoading(false);
    }

    if (re.test(val)) {
      setIsValid(true);
      setLoading(true);
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userDoc = doc(firestore, `users/${user?.uid}`);
    const usernameDoc = doc(firestore, `usernames/${formValue}`);
    const batch = writeBatch(firestore);
    batch.set(userDoc, {
      username: formValue,
      photoUrl: user?.photoURL,
      displayName: user?.displayName,
    });
    batch.set(usernameDoc, { uid: user?.uid });
    await batch.commit();
  };

  return (
    <>
      <Metatags title="Enter" />
      {!username && (
        <section>
          <h3>Choose Username</h3>
          <form onSubmit={onSubmit}>
            <input
              name="username"
              placeholder="username"
              onChange={onChange}
              value={formValue}
            />
            <UsernameMessage
              username={formValue}
              isValid={isValid}
              loading={loading}
            />
            <button type="submit" disabled={!isValid} className="btn-green">
              Choose
            </button>

            <h3>Debug State</h3>
            <div>
              Username: {formValue}
              <br />
              Loading: {loading.toString()}
              <br />
              Username valid: {isValid.toString()}
            </div>
          </form>
        </section>
      )}
    </>
  );
};

const UsernameMessage = ({
  username,
  isValid,
  loading,
}: {
  username: string;
  isValid: boolean;
  loading: boolean;
}) => {
  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <p className="text-success">{username} is available!</p>;
  } else if (username && !isValid) {
    return <p className="text-danger">That username is taken!</p>;
  } else {
    return <p></p>;
  }
};

export default EnterPage;
