import { firestore, increment } from "../lib/firebase";
import { useDocument } from "react-firebase-hooks/firestore";
import {
  doc,
  DocumentData,
  DocumentReference,
  writeBatch,
} from "firebase/firestore";
import { FunctionComponent } from "react";
import { Button, Icon, Show, VStack, Text, Flex } from "@chakra-ui/react";
import { useAuth } from "../lib/contexts/AuthContext";
import { FaHeart, FaHeartBroken } from "react-icons/fa";

const addHeart = async (
  postRef: DocumentReference<DocumentData>,
  heartRef: DocumentReference<DocumentData>,
  uid?: string
) => {
  const batch = writeBatch(firestore);

  batch.update(postRef, { heartCount: increment(1) });
  batch.set(heartRef, { uid });

  await batch.commit();
};

const removeHeart = async (
  postRef: DocumentReference<DocumentData>,
  heartRef: DocumentReference<DocumentData>
) => {
  const batch = writeBatch(firestore);

  batch.update(postRef, { heartCount: increment(-1) });
  batch.delete(heartRef);

  await batch.commit();
};

interface SinglePostLargeHeartProps {
  postRef: DocumentReference<DocumentData>;
  heartCount: number;
}

export const SinglePostLargeHeart: FunctionComponent<
  SinglePostLargeHeartProps
> = ({ postRef, heartCount }) => {
  const { user } = useAuth();
  const heartRef = doc(postRef, `/hearts/${user?.uid}`);
  const [heartDoc] = useDocument(heartRef);

  return (
    <Flex gap={2} flexDir={{ base: "row", md: "column" }} justifyContent='center' alignItems='center'>
      {heartDoc?.exists() ? (
        <Icon
          as={FaHeartBroken}
          color="primary.500"
          w={8}
          h={8}
          onClick={() => removeHeart(postRef, heartRef)}
          _hover={{ cursor: "pointer", color: "primary.700" }}
        />
      ) : (
        <Icon
          as={FaHeart}
          color="primary.500"
          w={8}
          h={8}
          onClick={() => addHeart(postRef, heartRef, user?.uid)}
          _hover={{ cursor: "pointer", color: "primary.700" }}
        />
      )}
      <Text>{heartCount}</Text>
    </Flex>
  );
};

interface PostsHeartProps {
  postRef: DocumentReference<DocumentData>;
  heartCount: number;
}

export const PostsHeart: FunctionComponent<PostsHeartProps> = ({
  postRef,
  heartCount,
}) => {
  const { user } = useAuth();
  const heartRef = doc(postRef, `/hearts/${user?.uid}`);
  const [heartDoc] = useDocument(heartRef);

  return heartDoc?.exists() ? (
    <Button
      variant="ghost"
      colorScheme="primary"
      _hover={{ background: "gray.300" }}
      px={1}
      onClick={() => removeHeart(postRef, heartRef)}
    >
      💔 {heartCount}
      <Show above="sm"> Unheart</Show>
    </Button>
  ) : (
    <Button
      variant="ghost"
      colorScheme="primary"
      _hover={{ background: "gray.300" }}
      px={1}
      onClick={() => addHeart(postRef, heartRef, user?.uid)}
    >
      💗 {heartCount}
      <Show above="sm"> Heart</Show>
    </Button>
  );
};
