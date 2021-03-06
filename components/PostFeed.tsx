import {
  Avatar,
  Box,
  VStack,
  Text,
  HStack,
  Heading,
  SimpleGrid,
  GridItem,
  useBreakpointValue,
  Show,
} from "@chakra-ui/react";
import { collection, CollectionReference, doc } from "firebase/firestore";
import Link from "next/link";
import { FunctionComponent } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useAuth } from "../lib/contexts/AuthContext";
import { firestore, getDateTime } from "../lib/firebase";
import { useHeadingSize } from "../lib/hooks/breakpointSizes";
import { IPost } from "../lib/interfaces";
import PostActionButtons from "./PostActionButtons";

interface PostFeedProps {
  posts: IPost[];
  admin?: boolean;
}

const PostFeed: FunctionComponent<PostFeedProps> = ({
  posts: currentPosts,
  admin = false,
}) => {
  const headingSize = useHeadingSize();
  const { user } = useAuth();
  const colRef = collection(
    firestore,
    `users/${user?.uid}/posts`
  ) as CollectionReference<IPost>;
  const [realtimePosts] = useCollectionData(colRef);
  const posts = realtimePosts || currentPosts;

  return (
    <>
      <Heading mb={{ base: 3, md: 6 }} size={headingSize}>
        Posts
      </Heading>
      <SimpleGrid columns={2} columnGap={6} rowGap={4}>
        {posts
          ? posts.map((post) => (
              <PostItem post={post} key={post.id} admin={admin} />
            ))
          : null}
      </SimpleGrid>
    </>
  );
};

interface PostItemProps {
  post: IPost;
  admin: boolean;
}

const PostItem: FunctionComponent<PostItemProps> = ({ post, admin }) => {
  const { user } = useAuth();
  const wordCount = post?.content.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);
  const colSpan = useBreakpointValue({ base: 2, lg: 1 });
  const { date, time } = getDateTime(post.createdAt);
  const postRef = doc(firestore, `users/${user?.uid}/posts/${post.id}`);

  return (
    <GridItem colSpan={colSpan}>
      <Box
        border="2px"
        borderColor="primary.600"
        borderRadius="3xl"
        p={{ base: 2, md: 3, lg: 2 }}
        _hover={{ borderColor: "primary.800" }}
      >
        <HStack alignItems="start">
          <Link href={`/${post.username}`}>
            <a>
              <Avatar
                src={post.userImageUrl ?? "/person.png"}
                borderRadius="xl"
              />
            </a>
          </Link>
          <VStack alignItems="start" gap={3} w="full" pl={2}>
            <Link href={`/${post.username}`}>
              <a>
                <VStack alignItems="start">
                  <HStack>
                    <Text>{post.userDisplayName}</Text>
                    <Text color="primary.700" fontSize="sm" ml="0px !important">
                      @{post.username}
                    </Text>
                  </HStack>
                  <Text fontSize="sm" lineHeight="0">
                    {date} {time}
                  </Text>
                </VStack>
              </a>
            </Link>
            <Link href={`/${post.username}/${post.id}`}>
              <a>
                <VStack alignItems="start" mt="16px !important">
                  <Heading as="h6" size="md" noOfLines={2}>
                    {post.title}
                  </Heading>
                  <Text noOfLines={2}>{post.content}</Text>
                </VStack>
              </a>
            </Link>
            <HStack
              justifyContent="space-between"
              alignItems="center"
              w="full"
              mt="0px !important"
            >
              <HStack alignItems="start" gap={4}>
                <PostActionButtons
                  post={post}
                  postRef={postRef}
                  isHorizontal={true}
                />
              </HStack>
              <Show above="sm">
                <Text>{minutesToRead}min read</Text>
              </Show>
            </HStack>
            {/* <HStack
              justifyContent="space-between"
              alignItems="start"
              w="full"
              mt="0px !important"
            >
              <PostsHeart heartCount={post.heartCount} postRef={postRef} />
              <HStack>
                <Show above="sm">
                  <Text>{minutesToRead}min read</Text>
                </Show>
                <SaveButton postRef={postRef} saveCount={4} />
              </HStack>
            </HStack> */}
          </VStack>
        </HStack>
      </Box>
    </GridItem>
  );
};

export default PostFeed;
