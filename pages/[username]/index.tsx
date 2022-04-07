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
import Layout from "../../components/Layout";
import Metatags from "../../components/Metatags";
import PostFeed from "../../components/PostFeed";
import UserProfile from "../../components/UserProfile";
import { getUserWithUsername, postToJson } from "../../lib/firebase";
import { IPost, IUserDoc } from "../../lib/interfaces";
import { user } from "../../lib/types";

interface Props {
  user: user;
  posts: IPost[];
  username: string;
  userDoc: IUserDoc;
}

const UserProfilePage: NextPage<Props> = ({
  user,
  posts,
  userDoc,
}) => {
  return (
    <>
      <Metatags title={user?.displayName!} />
      <Layout>
        <UserProfile user={user} userDoc={userDoc} />
        <PostFeed posts={posts} />
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
      posts,
      username,
      userDoc: userDoc.data(),
    },
  };
};

export default UserProfilePage;
