import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import styles from "../../styles/Post.module.css";
import PostContent from "../../components/PostContent";
import { firestore, getUserWithUsername, postToJson } from "../../lib/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { collectionGroup, doc, getDoc, getDocs } from "firebase/firestore";
import { IFirestorePost, IPost } from "../../lib/interfaces";

interface PageProps {
  post: IPost;
  path: string | undefined;
}

const PostPage: NextPage<PageProps> = (props) => {
  const postRef = doc(firestore, props.path!);
  // const postRef = firestore.doc(props.path);
  const [realtimePost] = useDocumentData(postRef);

  const post = (realtimePost || props.post) as IPost;
  console.log(post);

  return (
    <main className={styles.container}>
      <section>
        <PostContent post={post} />
      </section>

      <aside className="card">
        <p>
          <strong>{post.heartCount || 0} 🤍</strong>
        </p>
      </aside>
    </main>
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
    console.log(post);

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
