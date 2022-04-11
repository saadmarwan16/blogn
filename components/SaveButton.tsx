import { FunctionComponent } from "react";
import { DocumentData, DocumentReference, updateDoc } from "firebase/firestore";
import { Icon, Text, Flex } from "@chakra-ui/react";
import {
  BsFillBookmarkCheckFill,
  BsFillBookmarkDashFill,
} from "react-icons/bs";
import { IPost } from "../lib/interfaces";
import { useAuth } from "../lib/contexts/AuthContext";
import { increment } from "../lib/firebase";

interface SaveButtonProps {
  postRef: DocumentReference<DocumentData>;
  post: IPost;
  isHorizontal: boolean;
}

const SaveButton: FunctionComponent<SaveButtonProps> = ({ postRef, post, isHorizontal }) => {
  const { user } = useAuth();

  const addSave = () => {
    if (!user?.uid) return;

    const currentSaves = post.saves;
    currentSaves.push(user.uid);
    updateDoc(postRef, {
      saveCount: increment(1),
      saves: currentSaves,
    });
  };

  const removeSave = () => {
    if (!user?.uid) return;

    const currentSaves = post.saves.filter((save) => save !== user.uid);
    updateDoc(postRef, {
      saveCount: increment(-1),
      saves: currentSaves,
    });
  };

  return (
    <Flex
      gap={2}
      flexDir={isHorizontal ? "row" : "column"}
      justifyContent="center"
      alignItems="center"
    >
      {user?.uid && post.saves.includes(user.uid) ? (
        <Icon
          as={BsFillBookmarkDashFill}
          color="primary.500"
          w={8}
          h={8}
          onClick={removeSave}
          _hover={{ cursor: "pointer", color: "primary.700" }}
        />
      ) : (
        <Icon
          as={BsFillBookmarkCheckFill}
          color="primary.500"
          w={8}
          h={8}
          onClick={addSave}
          _hover={{ cursor: "pointer", color: "primary.700" }}
        />
      )}

      <Text>{post.saveCount}</Text>
    </Flex>
  );
};

export default SaveButton;
