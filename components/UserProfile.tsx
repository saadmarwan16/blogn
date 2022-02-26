import Image from "next/image";
import { FunctionComponent } from "react";
import { user } from "../lib/types";

interface UserProfileProps {
  user: user;
}

const UserProfile: FunctionComponent<UserProfileProps> = ({ user }) => {
  return (
    <div className="box-center">
      <Image
        alt="profile"
        src={user?.photoURL ? user?.photoURL : "/person.png"}
        className="card-img-center"
      />
      <p>
        <i>@{user?.username}</i>
      </p>
      <h1>{user?.displayName}</h1>
    </div>
  );
};

export default UserProfile;
