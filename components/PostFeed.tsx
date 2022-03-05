import Link from "next/link";
import { FunctionComponent } from "react";
import { IPost } from "../lib/interfaces";
import { post } from "../lib/types";

interface PostFeedProps {
  posts: IPost[];
  admin?: boolean;
}

const PostFeed: FunctionComponent<PostFeedProps> = ({
  posts,
  admin = false,
}) => {
  return (
    <>
      {posts
        ? posts.map((post) => (
            <PostItem post={post} key={post.slug} admin={admin} />
          ))
        : null}
    </>
  );
};

interface PostItemProps {
  post: IPost;
  admin: boolean;
}

const PostItem: FunctionComponent<PostItemProps> = ({ post, admin }) => {
  const wordCount = post?.content.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);
  console.log(post);

  return (
    <div className="card">
      <Link href={`/${post.username}`}>
        <a>
          <strong>By @{post.username}</strong>
        </a>
      </Link>

      <Link href={`/${post.username}/${post.slug}`}>
        <h2>
          <a>{post.title}</a>
        </h2>
      </Link>

      <footer>
        <span>
          {wordCount} words. {minutesToRead} to read
        </span>
        <span>{post.heartCount} Hearts</span>
      </footer>
    </div>
  );
};

export default PostFeed;
