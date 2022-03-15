import { Box, Heading } from "@chakra-ui/react";
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
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import Metatags from "../components/Metatags";
import PostFeed from "../components/PostFeed";
import Profiles from "../components/Profiles";
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
    <>
      <Metatags title="Home" />
      <Layout>
        <Box as="main" mt={{ base: 4, sm: 8 }}>
          <Heading mb={{ base: 3, md: 6 }}>
            Let&apos;s explore today&apos;s
          </Heading>
          <Profiles />
          <PostFeed posts={posts} />

          {!loading && !postsEnd && (
            <button onClick={getMorePosts}>Load more</button>
          )}

          <Loader show={loading} />

          {postsEnd && "You have reached the end!"}
        </Box>
      </Layout>
    </>
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
