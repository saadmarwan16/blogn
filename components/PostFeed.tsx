import Link from "next/link";
import { FunctionComponent } from "react";

interface PostFeedProps {
    posts;
    admin?: boolean;
}
 
const PostFeed: FunctionComponent<PostFeedProps> = ({posts, admin = false}) => {
    return posts ? posts.map((post) => <PostItem post={post} key={post.slug} admin={admin} />) : null;
}

interface PostItemProps {
    post;
    admin: boolean;
}
 
const PostItem: FunctionComponent<PostItemProps> = ({post, admin}) => {
    const wordCount = post?.content.trim().split(/\s+/g).lenght;
    const minutesToRead = (wordCount / 100 + 1).toFixed(0);

    return ( 
        <div className="card">
            <Link href={`/${post.username}`}>
                <a>
                    <strong>By @{post.username}</strong>
                </a>
            </Link>

            <Link href={`/${post.user}/${post.slug}`}>
                <h2><a>{post.title}</a></h2>
            </Link>

            <footer>
                <span>{wordCount} words. {minutesToRead} to read</span>
                <span>{post.heartCount} Hearts</span>
            </footer>
        </div>
     );
}
 
export default PostFeed;