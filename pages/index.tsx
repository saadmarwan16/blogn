import { Box } from "@chakra-ui/react";
import {
  collectionGroup,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import type { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import Loader from "../components/Loader";
import PostFeed from "../components/PostFeed";
import { firestore, fromMillis, postToJson } from "../lib/firebase";
import { IPost } from "../lib/interfaces";

const LIMIT = 1;

interface Props {
  posts: IPost[];
}
const Home: NextPage<Props> = (props) => {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState<boolean>(false);
  const [postsEnd, setPostsEnd] = useState<boolean>(false);

  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];
    const newPostsSnapshot = await getDocs(
      query(
        collectionGroup(firestore, "posts"),
        where("published", "==", true),
        orderBy("createdAt", "desc"),
        startAfter(fromMillis(last.createdAt)),
        limit(LIMIT)
      )
    );
    const newPosts = newPostsSnapshot.docs.map(postToJson);

    setPosts(posts.concat(newPosts));
    setLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  return (
    <Box as='main' mt={10}>
      <PostFeed posts={posts} />

      {!loading && !postsEnd && (
        <button onClick={getMorePosts}>Load more</button>
      )}

      <Loader show={loading} />

      {postsEnd && "You have reached the end!"}
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const colRef = collectionGroup(firestore, "posts");
  const q = query(
    colRef,
    where("published", "==", true),
    orderBy("createdAt", "desc"),
    limit(LIMIT)
  );
  const posts = (await getDocs(q)).docs.map(postToJson);

  return {
    props: { posts },
  };
};

export default Home;
