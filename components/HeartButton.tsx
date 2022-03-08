import { firestore, auth, increment } from "../lib/firebase";
import { useDocument } from "react-firebase-hooks/firestore";
import {
  doc,
  DocumentData,
  DocumentReference,
  writeBatch,
} from "firebase/firestore";
import { FunctionComponent } from "react";

interface HeartButtonProps {
  postRef: DocumentReference<DocumentData>;
}

const HeartButton: FunctionComponent<HeartButtonProps> = ({ postRef }) => {
  const uid = auth.currentUser?.uid!;
  const heartRef = doc(postRef, "hearts", uid);
  const [heartDoc] = useDocument(heartRef);

  const addHeart = async () => {
    const batch = writeBatch(firestore);

    batch.update(postRef, { heartCount: increment(1) });
    batch.set(heartRef, { uid });

    await batch.commit();
  };

  const removeHeart = async () => {
    const batch = writeBatch(firestore);

    batch.update(postRef, { heartCount: increment(-1) });
    batch.delete(heartRef);

    await batch.commit();
  };

  return heartDoc?.exists ? (
    <button onClick={removeHeart}>💔 Unheart</button>
  ) : (
    <button onClick={addHeart}>💗 Heart</button>
  );
};

export default HeartButton;
