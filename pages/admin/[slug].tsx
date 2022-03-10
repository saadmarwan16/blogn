import { NextPage } from "next";
import styles from "../../styles/Admin.module.css";
import AuthCheck from "../../components/AuthCheck";
import { firestore, auth, serverTimestamp } from "../../lib/firebase";

import { FunctionComponent, useState } from "react";
import { useRouter } from "next/router";

import { useDocumentData } from "react-firebase-hooks/firestore";
import { SubmitHandler, useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  doc,
  DocumentData,
  DocumentReference,
  updateDoc,
} from "firebase/firestore";
import { IPost } from "../../lib/interfaces";
import ImageUploader from "../../components/ImageUploader";
import Metatags from "../../components/Metatags";

const EditPostPage: NextPage = () => {
  return (
    <AuthCheck>
      <PostManager />
    </AuthCheck>
  );
};

const PostManager = () => {
  const [preview, setPreview] = useState(false);

  const router = useRouter();
  const { slug } = router.query;

  const uid = auth.currentUser?.uid!;
  const userRef = doc(firestore, "users", uid);
  const postRef = doc(userRef, "posts", slug as string);
  const [post] = useDocumentData(postRef);

  return (
    <main className={styles.container}>
      {post && (
        <>
          <section>
            <h1>{post.title}</h1>
            <p>ID: {post.slug}</p>

            <PostForm
              postRef={postRef}
              defaultValues={post as IPost | undefined}
              preview={preview}
            />
          </section>

          <aside>
            <h3>Tools</h3>
            <button onClick={() => setPreview(!preview)}>
              {preview ? "Edit" : "Preview"}
            </button>
            <Link href={`/${post.username}/${post.slug}`}>
              <a>
                <button className="btn-blue">Live view</button>
              </a>
            </Link>
          </aside>
        </>
      )}
    </main>
  );
};

interface Props {
  defaultValues: IPost | undefined;
  postRef: DocumentReference<DocumentData>;
  preview: boolean;
}

interface InputForm {
  content: string;
  published: boolean;
}

const PostForm: FunctionComponent<Props> = ({
  defaultValues,
  postRef,
  preview,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isDirty, isValid, errors },
  } = useForm<InputForm>({
    defaultValues,
    mode: "onChange",
  });

  const updatePost: SubmitHandler<InputForm> = async ({
    content,
    published,
  }) => {
    await updateDoc(postRef, {
      content,
      published,
      updatedAt: serverTimestamp(),
    });
    reset({ content, published });
    toast.success("Post updated successfully!");
  };

  return (
    <>
      <Metatags title="Add Post" />
      <form onSubmit={handleSubmit(updatePost)}>
        {preview && (
          <div className="card">
            <ReactMarkdown>{watch("content")}</ReactMarkdown>
          </div>
        )}

        <div className={preview ? styles.hidden : styles.controls}>
          <ImageUploader />

          <textarea
            {...register("content", {
              maxLength: { value: 20000, message: "content is too long" },
              minLength: { value: 10, message: "content is too short" },
              required: { value: true, message: "content is required" },
            })}
          ></textarea>
          {errors.content && (
            <p className="text-danger">{errors.content.message}</p>
          )}

          <fieldset>
            <input
              className={styles.checkbox}
              type="checkbox"
              {...register("published")}
            />
            <label>Published</label>
          </fieldset>

          <button
            type="submit"
            className="btn-green"
            disabled={!isDirty || !isValid}
          >
            Save Changes
          </button>
        </div>
      </form>
    </>
  );
};

export default EditPostPage;
