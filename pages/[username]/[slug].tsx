import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import {
  firestore,
  getDateTime,
  getUserWithUsername,
  postToJson,
} from "../../lib/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { collectionGroup, doc, getDoc, getDocs } from "firebase/firestore";
import { IPost } from "../../lib/interfaces";
import Link from "next/link";
import Metatags from "../../components/Metatags";
import { useAuth } from "../../lib/contexts/AuthContext";
import capitalize from "../../lib/utils/capitalize";
import Layout from "../../components/Layout";
import {
  Box,
  HStack,
  VStack,
  Text,
  Heading,
  Flex,
} from "@chakra-ui/react";
import PostActionButtons from "../../components/PostActionButtons";
import SinglePostAside from "../../components/SinglePostAside";
import CustomImage from "../../components/CustomImage";

interface PageProps {
  post: IPost;
  path: string | undefined;
}

const PostPage: NextPage<PageProps> = (props) => {
  const postRef = doc(firestore, props.path!);
  const [realtimePost] = useDocumentData(postRef);
  const { user, username } = useAuth();

  const { date, time } = getDateTime(props.post.createdAt);

  const post = (realtimePost || props.post) as IPost;

  return (
    <>
      <Metatags title={capitalize(post.title)} />
      <Layout>
        <Box as="main">
          <HStack alignItems="start" gap={3}>
            <Box
              w={{ base: "full", md: `${(8 / 11) * 100}%` }}
              border={{ base: "0px", md: "1px" }}
              borderColor={{ base: "transparent", md: "primary.500" }}
              borderRadius={16}
              p={4}
            >
              <Flex flexDir={{ base: "column", md: "row-reverse" }} gap={6}>
                <Box w="full">
                  <Flex flexDir="column" gap={8}>
                    <Box order={{ base: 1, md: 2 }}>
                      <Link href={`/${username}`}>
                        <a>
                          <HStack>
                            <CustomImage
                              ratio={1}
                              width={14}
                              borderRadius="50%"
                              src={post.userImageUrl ?? "/person.png"}
                            />
                            <VStack alignItems="start" justifyContent="center">
                              <HStack>
                                <Text fontSize="xl" lineHeight={0.5}>
                                  {post.userDisplayName}
                                </Text>
                                <Text
                                  fontSize="xl"
                                  color="primary.500"
                                  lineHeight={0.5}
                                  ml="0px !important"
                                >
                                  @{post.username}
                                </Text>
                              </HStack>
                              <Text fontSize="sm" color="gray">
                                Posted on {date} {time} | 1min read
                                {/* Posted on {date} */}
                              </Text>
                            </VStack>
                          </HStack>
                        </a>
                      </Link>
                    </Box>

                    <Heading
                      variant="h3"
                      size="xl"
                      fontWeight="medium"
                      order={{ base: 1, md: 3 }}
                    >
                      {post.title}
                    </Heading>

                    <Box order={{ base: 1, md: 1 }}>
                      <CustomImage
                        ratio={2}
                        width="full"
                        src={post.imageUrl ?? "/no-image.png"}
                        borderRadius={16}
                      />
                    </Box>

                    <Text fontSize="xl" order={{ base: 1, md: 4 }}>
                      {post.content}
                    </Text>
                  </Flex>
                </Box>

                <PostActionButtons post={post} postRef={postRef} user={user} />
              </Flex>
            </Box>

            <SinglePostAside post={post} />
          </HStack>
        </Box>
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const username = params?.username as string;
  const id = params?.slug as string;
  const userDoc = await getUserWithUsername(username);

  let post;
  let path;

  if (userDoc) {
    const postRef = doc(firestore, `users/${userDoc.id}/posts/${id}`);
    const finalDoc = await getDoc(postRef);
    post = postToJson(finalDoc);

    path = postRef.path;
  }

  return {
    props: { post, path },
    revalidate: 5000,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const snapshot = await getDocs(collectionGroup(firestore, "posts"));

  const paths = snapshot.docs.map((doc) => {
    const { id, username } = doc.data() as IPost;
    return {
      params: { username, slug: id },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export default PostPage;
