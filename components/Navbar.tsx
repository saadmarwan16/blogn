import {
  Avatar,
  Heading,
  Text,
  HStack,
  VStack,
  Box,
  Divider,
  Show,
} from "@chakra-ui/react";
import Link from "next/link";
import { FunctionComponent, useContext } from "react";
import { UserContext } from "../lib/context";

const Navbar: FunctionComponent = () => {
  const { user, username } = useContext(UserContext);

  return (
    <Box as="nav">
      <VStack alignItems="normal" gap={{base: 2, sm: 8}}>
        <HStack justifyContent="space-between" gap={2}>
          <Show above="sm">
            <Link href="/">
              <a>
                <HStack
                  _hover={{ border: "1px", borderColor: "primary.600" }}
                  h={16}
                >
                  <Avatar src="/logo.png" />
                  <Heading>Blogn</Heading>
                </HStack>
              </a>
            </Link>
          </Show>
          {user && username ? (
            <Link href={`/${username}`}>
              <a>
                <HStack
                  _hover={{ border: "1px", borderColor: "primary.600" }}
                  h={16}
                >
                  <Avatar src={user.photoURL ?? "/person.png"} />
                  <VStack gap={0} spacing={0} alignItems="start">
                    <Text fontWeight="bold" lineHeight={0.75}>
                      Hi {user.displayName ? `, ${user.displayName}!` : ""}
                    </Text>
                    <Text>How&apos;s your day?</Text>
                  </VStack>
                </HStack>
              </a>
            </Link>
          ) : (
            <Box></Box>
          )}
        </HStack>
        <Divider height={0.25} bg="primary.600" />
      </VStack>
    </Box>
  );
};

export default Navbar;
