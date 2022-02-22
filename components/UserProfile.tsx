import { FunctionComponent } from "react";
import { user } from "../lib/types";

interface UserProfileProps {
    user: user;
}
 
const UserProfile: FunctionComponent<UserProfileProps> = ({user}) => {
    return ( <div className="box-center">
        <img src={user?.photoURL} className="card-img-center" />
        <p>
            <i>@{user?.username}</i>
        </p>
        <h1>{user?.displayName}</h1>
    </div> );
}
 
export default UserProfile;