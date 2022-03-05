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
import { toast } from "react-hot-toast";
import Loader from "../components/Loader";
import PostFeed from "../components/PostFeed";
import { firestore, postToJson } from "../lib/firebase";
import { fromDate, fromMillis, IPost } from "../lib/interfaces";

const LIMIT = 2;

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

    // const cursor =
    //   typeof last.createdAt === "number"
    //     ? fromMillis(last.createdAt)
    //     : last.createdAt;

    const newPostsSnapshot = await getDocs(
      query(
        collectionGroup(firestore, "posts"),
        where("published", "==", true),
        orderBy("createdAt", "desc"),
        startAfter(fromDate(last.createdAt)),
        limit(LIMIT)
      )
    );
    const newPosts = newPostsSnapshot.docs.map((doc) => doc.data() as IPost);

    // const query = firestore
    //   .collectionGroup('posts')
    //   .where('published', '==', true)
    //   .orderBy('createdAt', 'desc')
    //   .startAfter(cursor)
    //   .limit(LIMIT);

    // const newPosts = (await query.get()).docs.map((doc) => doc.data());

    setPosts(posts.concat(newPosts));
    setLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  return (
    <main>
      <PostFeed posts={posts} />

      {!loading && !postsEnd && (
        <button onClick={getMorePosts}>Load more</button>
      )}

      <Loader show={loading} />

      {postsEnd && "You have reached the end!"}
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const colRef = collectionGroup(firestore, "posts");
  const q = query(
    colRef,
    where("published", "==", false),
    orderBy("createdAt", "desc"),
    limit(LIMIT)
  );
  console.log((await getDocs(q)).docs);
  const posts = (await getDocs(q)).docs.map(postToJson);
  console.log(posts);

  return {
    props: { posts },
  };
};

export default Home;
