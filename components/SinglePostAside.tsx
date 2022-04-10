import {
  Box,
  Button,
  HStack,
  Show,
  VStack,
  Text,
  Heading,
} from "@chakra-ui/react";
import Link from "next/link";
import { FunctionComponent } from "react";
import { IPost } from "../lib/interfaces";
import capitalize from "../lib/utils/capitalize";
import CustomImage from "./CustomImage";

interface SinglePostAsideProps {
  post: IPost;
}

const SinglePostAside: FunctionComponent<SinglePostAsideProps> = ({ post }) => {
  return (
    <Show above="md">
      <Box
        as="aside"
        w={`${(3 / 11) * 100}%`}
        border="1px"
        borderColor="primary.500"
        borderRadius={16}
        p={4}
      >
        <Link href={`/${post.username}`}>
          <a>
            <HStack>
              <CustomImage
                ratio={1}
                width={14}
                src={post.userImageUrl ?? "/person.png"}
                borderRadius="50%"
              />
              <VStack alignItems="start">
                <Text color="primary.500" fontStyle="italic" lineHeight={0.9}>
                  @{post.username}
                </Text>
                <Text fontWeight="bold" lineHeight={0.9} noOfLines={1}>
                  {capitalize(post.userDisplayName)}
                </Text>
              </VStack>
            </HStack>
          </a>
        </Link>
        <Button colorScheme="secondary" w="full" mt={6}>
          Follow
        </Button>
        <VStack alignItems="start" gap={4} mt={4}>
          <VStack alignItems="start">
            <Heading size="md" variant="h5" fontWeight="bold">
              Followers
            </Heading>
            <Text lineHeight={0.5}>230</Text>
          </VStack>
          <VStack alignItems="start">
            <Heading size="md" variant="h5" fontWeight="bold">
              Following
            </Heading>
            <Text lineHeight={0.5}>4</Text>
          </VStack>
          <VStack alignItems="start">
            <Heading size="md" variant="h5" fontWeight="bold">
              Posts
            </Heading>
            <Text lineHeight={0.5}>6</Text>
          </VStack>
          <VStack alignItems="start">
            <Heading size="md" variant="h5" fontWeight="bold">
              Joined
            </Heading>
            <Text lineHeight={0.5}>Mar 16, 2021</Text>
          </VStack>

          <Text fontSize="xl" fontWeight="bold">
            More from{" "}
            <Box
              as="span"
              color="primary.500"
              _hover={{ color: "primary.700" }}
            >
              <Link href={`/${post.username}`}>
                <a>{capitalize(post.userDisplayName)}</a>
              </Link>
            </Box>
          </Text>
        </VStack>
      </Box>
    </Show>
  );
};

export default SinglePostAside;
