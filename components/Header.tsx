import {
  Avatar,
  Heading,
  HStack,
  VStack,
  Box,
  Divider,
  Show,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import { FunctionComponent } from "react";
import { useAuth } from "../lib/contexts/AuthContext";
import useShowNavbar from "../lib/hooks/showNavbar";
import { useHeadingSize } from "../lib/hooks/breakpointSizes";
import Layout from "./Layout";

const Header: FunctionComponent = () => {
  const showNavbar = useShowNavbar();
  const { user, username, signOut } = useAuth();
  const headingSize = useHeadingSize()

  return (
    <>
      {showNavbar && (
        <Layout>
          <Box as="nav">
            <VStack alignItems="normal" gap={{ base: 2, sm: 8 }}>
              <HStack justifyContent="space-between" gap={2}>
                <Link href="/">
                  <a>
                    <HStack
                      _hover={{ border: "1px", borderColor: "primary.600" }}
                      h={16}
                      px={2}
                    >
                      <Avatar src="/logo.png" />
                      <Heading size={headingSize}>Blogn</Heading>
                    </HStack>
                  </a>
                </Link>
                <Show above="sm">
                  {user && username ? (
                    <Button colorScheme="secondary" onClick={() => signOut()}>
                      Logout
                    </Button>
                  ) : (
                    <Link href="/auth/login">
                      <a>
                        <Button colorScheme="secondary">Login</Button>
                      </a>
                    </Link>
                  )}
                </Show>
              </HStack>
              <Divider height={0.25} bg="primary.600" />
            </VStack>
          </Box>
        </Layout>
      )}
    </>
  );
};

export default Header;
