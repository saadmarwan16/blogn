import { Button } from "@chakra-ui/react";
import {
  collection,
  where,
  query,
  limit,
  orderBy,
  getDocs,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import Layout from "../../components/Layout";
import Metatags from "../../components/Metatags";
import PostFeed from "../../components/PostFeed";
import UserProfile from "../../components/UserProfile";
import { getUserWithUsername, LIMIT, postToJson } from "../../lib/firebase";
import { IPost, IUserDoc } from "../../lib/interfaces";
import { TUser } from "../../lib/types";
import firebaseGetMorePosts from "../../lib/utils/firebaseGetMorePosts";

interface Props {
  user: TUser;
  currentPosts: IPost[];
  username: string;
  userDoc: IUserDoc;
}

const UserProfilePage: NextPage<Props> = ({ user, currentPosts, userDoc }) => {
  const [posts, setPosts] = useState(currentPosts);
  const [loading, setLoading] = useState<boolean>(false);
  const [postsEnd, setPostsEnd] = useState<boolean>(false);

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
      <Metatags title={user?.displayName!} />
      <Layout>
        <UserProfile user={user} userDoc={userDoc} />
        <PostFeed posts={posts} />

        {!loading && !postsEnd && (
          <Button onClick={getMorePosts} colorScheme="secondary" mt={12}>
            Load more
          </Button>
        )}
      </Layout>
    </>
  );
};

// const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
//   useEffect(() => {
//     getDownloadURL(ref(
//       storage,
//       'uploads/XbdhANUQxHUcuaJnSMYivrC9g3W2/1646730495629.png'
//     )).then((url) => setDownloadUrl(url));
//     }, [user?.uid]);

// {downloadUrl && (
//   <img src={downloadUrl} />
// )}

// export async function getServerSideProps({ query }) {
//   const { username } = query;
//   const userDoc = await getUserWithUsername(username);

//   // If no user, short circuit to 404 page
//   if (!userDoc) {
//     return {
//       notFound: true,
//     };
//   }
// }

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { username } = context.query;
  const userDoc = (await getUserWithUsername(
    username as string
  )) as QueryDocumentSnapshot<IUserDoc>;

  let user = null;
  let posts = null;

  if (userDoc) {
    user = userDoc.data();
    const userRef = userDoc.ref;
    const postsRef = collection(userRef, "posts");
    const q = query(
      postsRef,
      where("published", "==", true),
      limit(1),
      orderBy("createdAt", "desc")
    );
    posts = (await getDocs(q)).docs.map(postToJson);
  }

  return {
    props: {
      user,
      currentPosts: posts,
      username,
      userDoc: userDoc.data(),
    },
  };
};

export default UserProfilePage;
