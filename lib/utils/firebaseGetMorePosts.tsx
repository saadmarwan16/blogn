import {
  collectionGroup,
  getDocs,
  query,
  where,
  orderBy,
  startAfter,
  limit,
} from "firebase/firestore";
import { firestore, fromMillis, LIMIT, postToJson } from "../firebase";
import { IPost } from "../interfaces";

const firebaseGetMorePosts = async (last: IPost) => {
  const newPostsSnapshot = await getDocs(
    query(
      collectionGroup(firestore, "posts"),
      where("published", "==", true),
      orderBy("createdAt", "desc"),
      startAfter(fromMillis(last.createdAt)),
      limit(LIMIT)
    )
  );

  return newPostsSnapshot.docs.map(postToJson);
};

export default firebaseGetMorePosts;
