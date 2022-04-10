import { Button, Flex } from "@chakra-ui/react";
import { DocumentData, DocumentReference } from "firebase/firestore";
import Link from "next/link";
import { FunctionComponent } from "react";
import { IPost } from "../lib/interfaces";
import { TUser } from "../lib/types";
import AuthCheck from "./AuthCheck";
import { SinglePostLargeEdit } from "./EditButtons";
import { SinglePostLargeHeart } from "./HeartButtons";
import { SinglePostLargeSave } from "./SaveButtons";

interface PostActionButtonsProps {
  post: IPost;
  postRef: DocumentReference<DocumentData>;
  user: TUser;
}

const PostActionButtons: FunctionComponent<PostActionButtonsProps> = ({
  post,
  postRef,
  user,
}) => {
  return (
    <Flex flexDir={{ base: "row", md: "column" }} mt={12} gap={6}>
      <AuthCheck
        fallback={
          <Link href="/enter">
            <a>
              <button>💗 Sign Up</button>
            </a>
          </Link>
        }
      >
        <SinglePostLargeHeart postRef={postRef} heartCount={post.heartCount} />
        <SinglePostLargeSave postRef={postRef} saveCount={4} />
      </AuthCheck>
      {user?.uid === post.uid && (
        <Link href={`/admin/${post.id}`}>
          <a>
            <SinglePostLargeEdit />
          </a>
        </Link>
      )}
    </Flex>
  );
};

export default PostActionButtons;
