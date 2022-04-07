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
  Button,
  Show,
} from "@chakra-ui/react";
import Link from "next/link";
import { FunctionComponent } from "react";
import { getDateTime } from "../lib/firebase";
import { useHeadingSize } from "../lib/hooks/breakpointSizes";
import { IPost } from "../lib/interfaces";

interface PostFeedProps {
  posts: IPost[];
  admin?: boolean;
}

const PostFeed: FunctionComponent<PostFeedProps> = ({
  posts,
  admin = false,
}) => {
  const headingSize = useHeadingSize();

  return (
    <>
      <Heading mb={{ base: 3, md: 6 }} size={headingSize}>
        Posts
      </Heading>
      <SimpleGrid columns={2} columnGap={6} rowGap={4}>
        {posts
          ? posts.map((post) => (
              <PostItem post={post} key={post.slug} admin={admin} />
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
  const wordCount = post?.content.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);
  const colSpan = useBreakpointValue({ base: 2, lg: 1 });
  const { date, time } = getDateTime(
    post.createdAt.seconds,
    post.createdAt.nanoseconds
  );

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
            <HStack alignItems="start">
              <Avatar src="/person.png" borderRadius="xl" />
              <VStack alignItems="start" gap={3} w="full" pl={2}>
                <VStack alignItems="start">
                  <HStack>
                    <Text>
                      Marwan Sa-ad
                      {/* {post.userDisplayName} */}
                    </Text>
                    <Text color="primary.700" fontSize="sm" ml="0px !important">
                      @{post.username}
                    </Text>
                  </HStack>
                  <Text fontSize="sm" lineHeight="0">
                    {/* Mar 16 {post.createdAt} */}
                    {date} {time}
                  </Text>
                </VStack>
                <VStack alignItems="start" mt="16px !important">
                  <Heading as="h6" size="md" noOfLines={2}>
                    {post.title}
                  </Heading>
                  <Text noOfLines={2}>{post.content}</Text>
                </VStack>
                <HStack
                  justifyContent="space-between"
                  alignItems="start"
                  w="full"
                  mt="0px !important"
                >
                  <Button
                    variant="ghost"
                    colorScheme="primary"
                    _hover={{ background: "gray.300" }}
                    px={1}
                  >
                    💗 {post.heartCount}
                    <Show above="sm"> hearts</Show>
                  </Button>
                  <HStack>
                    <Show above="sm">
                      <Text>{minutesToRead}min read</Text>
                    </Show>
                    <Button
                      variant="ghost"
                      colorScheme="primary"
                      _hover={{ background: "gray.300" }}
                    >
                      Save
                    </Button>
                  </HStack>
                </HStack>
              </VStack>
            </HStack>
          </Box>
        </a>
      </Link>
    </GridItem>
  );
};

export default PostFeed;

{
  /* <Flex
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
                    <Heading lineHeight={0.75} as="h6" size="md" noOfLines={1}>
                      Marwan Sa-ad
                    </Heading>
                    <Text lineHeight={0.75} fontSize='xs'>{wordCount} words. July 14, 2021</Text>
                  </VStack>
                  {/* <Box>💗 145</Box> */
}
//     </HStack>
//   </VStack>
// </Flex> */}
