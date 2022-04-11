import { Button, Flex } from "@chakra-ui/react";
import { DocumentData, DocumentReference } from "firebase/firestore";
import Link from "next/link";
import { FunctionComponent } from "react";
import { useAuth } from "../lib/contexts/AuthContext";
import { IPost } from "../lib/interfaces";
import { TUser } from "../lib/types";
import AuthCheck from "./AuthCheck";
import { SinglePostLargeEdit } from "./EditButtons";
import HeartButton from "./HeartButton";
import SaveButton from "./SaveButton";

interface PostActionButtonsProps {
  post: IPost;
  postRef: DocumentReference<DocumentData>;
  isHorizontal: boolean;
}

const PostActionButtons: FunctionComponent<PostActionButtonsProps> = ({
  post,
  postRef,
  isHorizontal,
}) => {
  const { user } = useAuth();

  return (
    <>
      <HeartButton postRef={postRef} heartCount={post.heartCount} isHorizontal={isHorizontal} />
      <SaveButton postRef={postRef} post={post} isHorizontal={isHorizontal} />
      {user?.uid === post.uid && (
        <Link href={`/admin/${post.id}`}>
          <a>
            <SinglePostLargeEdit />
          </a>
        </Link>
      )}
    </>
  );
};

export default PostActionButtons;
