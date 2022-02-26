import { collection, where, query, limit, orderBy, getDocs } from "firebase/firestore";
import { GetServerSideProps, NextPage } from "next";
import PostFeed from "../../components/PostFeed";
import UserProfile from "../../components/UserProfile";
import { getUserWithUsername, postToJson } from "../../lib/firebase";
import { user, post } from "../../lib/types";

interface Props {
  user: user;
  posts: post[];
}

const UserProfilePage: NextPage<Props> = ({user, posts}) => {
  console.log(posts);
  return (
    <main>
      <UserProfile user={user} />
      <PostFeed posts={posts} />
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {username} = context.query;
  console.log(username);
  const userDoc = await getUserWithUsername(username as string);

  let user = null;
  let posts = null;

  if (userDoc) {
    user = userDoc.data();
    const userRef = userDoc.ref;
    const postsRef = collection(userRef, 'posts');
    const q = query(postsRef, where('published', '==', true), limit(1), orderBy('createdAt', 'desc'));
    posts = (await getDocs(q)).docs.map(postToJson);
  }

  return {
    props: {
      user,
      posts,
    }
  };
};

export default UserProfilePage;
