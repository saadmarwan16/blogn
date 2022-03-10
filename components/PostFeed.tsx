import {
  Avatar,
  Box,
  VStack,
  Text,
  HStack,
  Heading,
  Flex,
  SimpleGrid,
  GridItem,
  useBreakpointValue,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";
import { IPost } from "../lib/interfaces";

interface PostFeedProps {
  posts: IPost[];
  admin?: boolean;
}

const PostFeed: FunctionComponent<PostFeedProps> = ({
  posts,
  admin = false,
}) => {
  return (
    <SimpleGrid columns={2} columnGap={6} rowGap={4}>
      {posts
        ? posts.map((post) => (
            <PostItem post={post} key={post.slug} admin={admin} />
          ))
        : null}
    </SimpleGrid>
  );
};

interface PostItemProps {
  post: IPost;
  admin: boolean;
}

const PostItem: FunctionComponent<PostItemProps> = ({ post, admin }) => {
  const wordCount = post?.content.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);
  const colSpan = useBreakpointValue({base: 2, lg: 1})

  return (
    <GridItem colSpan={colSpan}>
      <Link href={`/${post.username}/${post.slug}`}>
        <a>
          <Box
            border="2px"
            borderColor="primary.600"
            borderRadius="3xl"
            p={{ base: 2, md: 3, lg: 2 }}
            _hover={{ borderColor: "primary.800" }}
          >
            <Flex
              alignItems="center"
              flexDirection={{ base: "column", sm: "row" }}
              gap={4}
            >
              <Box
                border="1px"
                borderColor="primary.600"
                borderRadius="xl"
                flexBasis="50%"
              >
                <Image
                  alt="Post image"
                  src="/no-image.png"
                  width={200}
                  height={130}
                  // layout="responsive"
                  // layout="intrinsic"
                />
              </Box>
              <VStack alignItems="start" flexBasis="50%">
                <Heading textAlign="left" as="h6" size="md" noOfLines={2}>
                  {post.title}
                </Heading>
                <Text noOfLines={2}>{post.content}</Text>
                <HStack>
                  <Avatar
                    src="/logo.png"
                    name="Poster profile"
                    borderRadius="xl"
                  />
                  <VStack alignItems="start">
                    <Heading lineHeight={0.75} as="h6" size="md">
                      Marwan Sa-ad
                    </Heading>
                    <Text lineHeight={0.75}>July 14, 2021</Text>
                  </VStack>
                  {/* <Box>💗 145</Box> */}
                </HStack>
              </VStack>
            </Flex>
          </Box>
        </a>
      </Link>
    </GridItem>
  );
};

export default PostFeed;
