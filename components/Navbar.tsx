import { Avatar, Heading, Text, HStack, VStack, Box, Divider } from "@chakra-ui/react";
import Link from "next/link";
import { FunctionComponent, useContext } from "react";
import { UserContext } from "../lib/context";

const Navbar: FunctionComponent = () => {
  const { user, username } = useContext(UserContext);

  return (
    <Box as="nav">
      <VStack alignItems='normal' gap={8}>
        <HStack justifyContent="space-between">
          <Link href="/">
            <a>
              <HStack
                _hover={{ border: "1px", borderColor: "secondary.500" }}
                h={16}
                px={2}
              >
                <Avatar src="/logo.png" />
                <Heading>Blogn</Heading>
              </HStack>
            </a>
          </Link>
          {user && username ? (
            <Link href={`/${username}`}>
              <a>
                <HStack
                  _hover={{ border: "1px", borderColor: "secondary.500" }}
                  h={16}
                  px={2}
                >
                  <Avatar src={user.photoURL ?? "/person.png"} />
                  <VStack gap={0} spacing={0} alignItems="start">
                    <Text fontWeight="bold" lineHeight={0.75}>
                      Hi {user.displayName ? `, ${user.displayName}` : ""}
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
        <Divider height={0.25} bg='secondary.500' />
      </VStack>
    </Box>
  );
};

export default Navbar;
