import { FunctionComponent } from "react";
import { DocumentData, DocumentReference } from "firebase/firestore";
import { Button, Icon, Text, Flex } from "@chakra-ui/react";
import {
  BsFillBookmarkCheckFill,
  BsFillBookmarkDashFill,
} from "react-icons/bs";

interface SaveButtonProps {
  postRef: DocumentReference<DocumentData>;
  saveCount: number;
}

interface SinglePostLargeSaveProps {
  postRef: DocumentReference<DocumentData>;
  saveCount: number;
}

export const SinglePostLargeSave: FunctionComponent<
  SinglePostLargeSaveProps
> = ({ postRef, saveCount }) => {
  return (
    <Flex gap={2} flexDir={{ base: "row", md: "column" }} justifyContent='center' alignItems='center'>
      <Icon
        as={BsFillBookmarkCheckFill}
        // as={BsFillBookmarkDashFill}
        color="primary.500"
        w={8}
        h={8}
        // onClick={() => removeHeart(postRef, heartRef)}
        _hover={{ cursor: "pointer", color: "primary.700" }}
      />
      <Text>{saveCount}</Text>
    </Flex>
  );
};

const SaveButton: FunctionComponent<SaveButtonProps> = ({
  postRef,
  saveCount,
}) => {
  return (
    <Button
      variant="ghost"
      colorScheme="primary"
      _hover={{ background: "gray.300" }}
    >
      Save
    </Button>
  );
};

export default SaveButton;
