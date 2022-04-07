import { Box, Button, Heading, Text } from "@chakra-ui/react";
import {
  collectionGroup,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import type { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import Metatags from "../components/Metatags";
import PostFeed from "../components/PostFeed";
import Profiles from "../components/Profiles";
import { firestore, LIMIT, postToJson } from "../lib/firebase";
import { useHeadingSize } from "../lib/hooks/breakpointSizes";
import { IPost } from "../lib/interfaces";
import firebaseGetMorePosts from "../lib/utils/firebaseGetMorePosts";

interface Props {
  posts: IPost[];
}
const Home: NextPage<Props> = (props) => {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState<boolean>(false);
  const [postsEnd, setPostsEnd] = useState<boolean>(false);
  const headingSize = useHeadingSize();

  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];

    const newPosts = await firebaseGetMorePosts(last);

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
          <Heading mb={{ base: 3, md: 6 }} size={headingSize}>
            Let&apos;s explore today&apos;s
          </Heading>
          <Profiles />
          <PostFeed posts={posts} />

          {!loading && !postsEnd && (
            <Button onClick={getMorePosts} colorScheme="secondary" mt={12}>
              Load more
            </Button>
          )}

          <Loader show={loading} />

          {postsEnd && (
            <Text mt={12} fontSize={{ base: "xl", sm: "2xl", md: "3xl" }}>
              You have reached the end!
            </Text>
          )}
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
