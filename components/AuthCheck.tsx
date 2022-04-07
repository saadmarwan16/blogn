import Link from "next/link";
import { FunctionComponent } from "react";
import { useAuth } from "../lib/contexts/AuthContext";

interface AuthCheckProps {
  fallback?: any;
}

const AuthCheck: FunctionComponent<AuthCheckProps> = (props) => {
  const { username } = useAuth();

  return username
    ? props.children
    : props.fallback || <Link href="/enter">You must be signed in</Link>;
};

export default AuthCheck;
