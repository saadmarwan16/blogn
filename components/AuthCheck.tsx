import Link from "next/link";
import { FunctionComponent, useContext } from "react";
import { UserContext } from "../lib/context";

interface AuthCheckProps {
  fallback?: any;
}

const AuthCheck: FunctionComponent<AuthCheckProps> = (props) => {
  const { username } = useContext(UserContext);

  return username
    ? props.children
    : props.fallback || <Link href="/enter">You must be signed in</Link>;
};

export default AuthCheck;
