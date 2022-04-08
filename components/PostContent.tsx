import Link from "next/link";
import { FunctionComponent } from "react";
import ReactMarkdown from "react-markdown";
import { getDateTime } from "../lib/firebase";
import { IPost } from "../lib/interfaces";

interface PostContentProps {
  post: IPost;
}

const PostContent: FunctionComponent<PostContentProps> = ({ post }) => {
  const { date, time } = getDateTime(post.createdAt);
  // console.log("created:", post.createdAt);

  return (
    <div className="card">
      <h1>{post?.title}</h1>
      <span className="text-sm">
        Written by{" "}
        <Link href={`/${post.username}/`}>
          <a className="text-info">@{post.username}</a>
        </Link>{" "}
        on {date} {time}
      </span>
      <ReactMarkdown>{post?.content}</ReactMarkdown>
    </div>
  );
};

export default PostContent;
