import { NextPage } from "next";
import AuthCheck from "../../components/AuthCheck";
import styles from "../../styles/Admin.module.css";
import PostFeed from "../../components/PostFeed";
import { firestore, auth, serverTimestamp } from "../../lib/firebase";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { useCollection } from "react-firebase-hooks/firestore";
import kebabCase from "lodash.kebabcase";
import toast from "react-hot-toast";
import {
  collection,
  doc,
  orderBy,
  Query,
  query,
  setDoc,
} from "firebase/firestore";
import { IPost } from "../../lib/interfaces";
import Metatags from "../../components/Metatags";
import { useAuth } from "../../lib/contexts/AuthContext";

const AdminPage: NextPage = () => {
  return (
    <>
      <Metatags title="Admin" />
      <main>
        <AuthCheck>
          <PostList />
          <CreateNewPost />
        </AuthCheck>
      </main>
    </>
  );
};

const PostList = () => {
  const { user } = useAuth();
  const userRef = doc(firestore, `user/${user?.uid}`);
  const q = query(
    collection(userRef, "posts"),
    orderBy("createdAt")
  ) as Query<IPost>;
  const [querySnapshot, loading, error] = useCollection(q);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error...</div>;

  const posts = querySnapshot?.docs.map((doc) => doc.data())!;

  console.log(posts);

  return (
    <>
      {querySnapshot && (
        <>
          <h1>Manage your Posts</h1>
          <PostFeed posts={posts} admin />
        </>
      )}
    </>
  );
};

const CreateNewPost = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const { username } = useAuth();

  const slug = encodeURI(kebabCase(title));
  const isValid = title.length > 3 && title.length < 100;

  const createPost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const uid = auth.currentUser?.uid!;
    const userRef = doc(firestore, "users", uid);
    const postRef = doc(userRef, "posts", slug);

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
