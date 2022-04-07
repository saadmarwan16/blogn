import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import styles from "../../styles/Post.module.css";
import PostContent from "../../components/PostContent";
import { firestore, getUserWithUsername, postToJson } from "../../lib/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { collectionGroup, doc, getDoc, getDocs } from "firebase/firestore";
import { IFirestorePost, IPost } from "../../lib/interfaces";
import AuthCheck from "../../components/AuthCheck";
import Link from "next/link";
import HeartButton from "../../components/HeartButton";
import Metatags from "../../components/Metatags";
import { useAuth } from "../../lib/contexts/AuthContext";

interface PageProps {
  post: IPost;
  path: string | undefined;
}

const PostPage: NextPage<PageProps> = (props) => {
  const postRef = doc(firestore, props.path!);
  const [realtimePost] = useDocumentData(postRef);
  const {user} = useAuth();

  const post = (realtimePost || props.post) as IPost;

  return (
    <>
      <Metatags title={user?.displayName!} />
      <main className={styles.container}>
        <section>
          <PostContent post={post} />
        </section>

        <aside className="card">
          <p>
            <strong>{post.heartCount || 0} 🤍</strong>
          </p>
          <AuthCheck
            fallback={
              <Link href="/enter">
                <a>
                  <button>💗 Sign Up</button>
                </a>
              </Link>
            }
          >
            <HeartButton postRef={postRef} />
          </AuthCheck>
          {user?.uid === post.uid && (
            <Link href={`/admin/${post.slug}`}>
              <a>
                <button className="btn-blue">Edit Post</button>
              </a>
            </Link>
          )}
        </aside>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const username = params?.username as string;
  const slug = params?.slug as string;
  const userDoc = await getUserWithUsername(username);

  let post;
  let path;

  if (userDoc) {
    const postRef = doc(
      firestore,
      "users",
      "XbdhANUQxHUcuaJnSMYivrC9g3W2",
      "posts",
      "something"
    );
    const finalDoc = await getDoc(postRef);
    post = postToJson(finalDoc);

    path = postRef.path;
  }

  return {
    props: { post, path },
    revalidate: 5000,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const snapshot = await getDocs(collectionGroup(firestore, "posts"));

  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data() as IFirestorePost;
    return {
      params: { username, slug },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export default PostPage;
