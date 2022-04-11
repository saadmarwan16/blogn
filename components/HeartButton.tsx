import { firestore, increment } from "../lib/firebase";
import { useDocument } from "react-firebase-hooks/firestore";
import {
  doc,
  DocumentData,
  DocumentReference,
  writeBatch,
} from "firebase/firestore";
import { FunctionComponent } from "react";
import { Icon, Text, Flex } from "@chakra-ui/react";
import { useAuth } from "../lib/contexts/AuthContext";
import { FaHeart, FaHeartBroken } from "react-icons/fa";

interface HeartButtonProps {
  postRef: DocumentReference<DocumentData>;
  heartCount: number;
  isHorizontal: boolean;
}

const HeartButton: FunctionComponent<HeartButtonProps> = ({
  postRef,
  heartCount,
  isHorizontal,
}) => {
  const { user } = useAuth();
  const heartRef = doc(postRef, `/hearts/${user?.uid}`);
  const [heartDoc] = useDocument(heartRef);

  const addHeart = async () => {
    const batch = writeBatch(firestore);

    batch.update(postRef, { heartCount: increment(1) });
    batch.set(heartRef, { uid: user?.uid });

    await batch.commit();
  };

  const removeHeart = async () => {
    const batch = writeBatch(firestore);

    batch.update(postRef, { heartCount: increment(-1) });
    batch.delete(heartRef);

    await batch.commit();
  };

  return (
    <Flex
      gap={2}
      flexDir={isHorizontal ? "row" : "column"}
      justifyContent="center"
      alignItems="center"
    >
      {heartDoc?.exists() ? (
        <Icon
          as={FaHeartBroken}
          color="primary.500"
          w={8}
          h={8}
          onClick={removeHeart}
          _hover={{ cursor: "pointer", color: "primary.700" }}
        />
      ) : (
        <Icon
          as={FaHeart}
          color="primary.500"
          w={8}
          h={8}
          onClick={addHeart}
          _hover={{ cursor: "pointer", color: "primary.700" }}
        />
      )}
      <Text>{heartCount}</Text>
    </Flex>
  );
};

export default HeartButton;
