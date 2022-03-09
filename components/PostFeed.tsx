import {
  Avatar,
  Box,
  useBreakpointValue,
  VStack,
  Text,
} from "@chakra-ui/react";
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
  const profileSize = useBreakpointValue({ base: "md", md: "lg", lg: "xl" });

  return (
    <>
      <Box>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <Box
            key={num}
            border="1px"
            borderColor="secondary.500"
            display="inline-block"
            borderRadius={10}
            p={{ base: 1, md: 2 }}
            mx={2}
          >
            <VStack>
              <Box></Box>
              <Avatar src="/logo.png" borderRadius={10} size={profileSize} />
              <Text>Marwan</Text>
            </VStack>
          </Box>
        ))}
      </Box>
    </>
    // <div className="card">
    //   <Link href={`/${post.username}`}>
    //     <a>
    //       <strong>By @{post.username}</strong>
    //     </a>
    //   </Link>

    //   <Link href={`/${post.username}/${post.slug}`}>
    //     <a>
    //       <h2>{post.title}</h2>
    //     </a>
    //   </Link>

    //   <footer>
    //     <span>
    //       {wordCount} words. {minutesToRead} min read
    //     </span>
    //     <span className="push-left">💗 {post.heartCount} Hearts</span>
    //   </footer>
    // </div>
  );
};

export default PostFeed;
