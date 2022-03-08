import { NextPage } from "next";
import AuthCheck from "../../components/AuthCheck";
import styles from "../../styles/Admin.module.css";
import PostFeed from "../../components/PostFeed";
import { UserContext } from "../../lib/context";
import { firestore, auth, serverTimestamp } from "../../lib/firebase";
import { FormEvent, useContext, useState } from "react";
import { useRouter } from "next/router";
import { useCollection } from "react-firebase-hooks/firestore";
import kebabCase from "lodash.kebabcase";
import toast from "react-hot-toast";
import { collection, doc, orderBy, query, setDoc } from "firebase/firestore";
import { IPost } from "../../lib/interfaces";

const AdminPage: NextPage = () => {
  return (
    <main>
      <AuthCheck>
        <PostList />
        <CreateNewPost />
      </AuthCheck>
    </main>
  );
};

const PostList = () => {
  const userRef = doc(firestore, "users", auth.currentUser?.uid!);
  const q = query(collection(userRef, "posts"), orderBy("createdAt"));
  const [querySnapshot] = useCollection(q);

  const posts = querySnapshot?.docs.map((doc) => doc.data() as IPost)!;

  return (
    <>
      <h1>Manage your Posts</h1>
      <PostFeed posts={posts} admin />
    </>
  );
};

const CreateNewPost = () => {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState("");

  const slug = encodeURI(kebabCase(title));
  const isValid = title.length > 3 && title.length < 100;

  const createPost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const uid = auth.currentUser?.uid!;
    const userRef = doc(firestore, "users", uid);
    const postRef = doc(userRef, 'posts', slug);

    const data = {
      title,
      slug,
      uid,
      username,
      published: false,
      content: "# hello world!",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      heartCount: 0,
    };

    await setDoc(postRef, data);
    toast.success("Post created!");
    router.push(`/admin/${slug}`);
  };

  return (
    <form onSubmit={createPost}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="My Awesome Article!"
        className={styles.input}
      />
      <p>
        <strong>Slug:</strong> {slug}
      </p>
      <button type="submit" disabled={!isValid} className="btn-green">
        Create New Post
      </button>
    </form>
  );
};

export default AdminPage;
