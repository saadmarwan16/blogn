import { Box, HStack, Icon, useBreakpointValue } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlinePersonOutline } from "react-icons/md";
import { VscAdd } from "react-icons/vsc";
import { useRouter } from "next/router";
import { useAuth } from "../lib/contexts/AuthContext";
import useShowNavbar from "../lib/hooks/showNavbar";
import { BsFillBookmarkFill } from "react-icons/bs";

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
  const iconSize = useBreakpointValue({ base: 5, sm: 6 });
  const { username } = useAuth();
  const router = useRouter();
  const showNavbar = useShowNavbar();

  return (
    <>
      {showNavbar && (
        <HStack justifyContent="center">
          <Box
            as="nav"
            bg="black"
            px={{ base: 6, sm: 8 }}
            py={{ base: 3, sm: 4 }}
            borderRadius="full"
            display="inline-block"
            position="fixed"
            bottom={{ base: 4, sm: 6 }}
          >
            <HStack gap={{ base: 4, sm: 8 }}>
              <Icon
                as={AiOutlineHome}
                w={iconSize}
                h={iconSize}
                cursor="pointer"
                onClick={() => router.push("/")}
                color={router.asPath === "/" ? "white" : "current"}
              />
              <Icon
                as={VscAdd}
                w={iconSize}
                h={iconSize}
                cursor="pointer"
                onClick={() => router.push("/admin/new-post")}
                color={
                  router.asPath === "/admin/new-post" ? "white" : "current"
                }
              />
              {/* <Icon
                as={VscAdd}
                w={iconSize}
                h={iconSize}
                cursor="pointer"
                onClick={() => router.push("/admin")}
                color={router.asPath === "/admin" ? "white" : "current"}
              /> */}
              <Icon
                as={BsFillBookmarkFill}
                w={iconSize}
                h={iconSize}
                cursor="pointer"
                onClick={() => router.push(`/${username}/saved-posts`)}
                color={
                  router.asPath === `/${username}/saved-posts`
                    ? "white"
                    : "current"
                }
              />
              <Icon
                as={MdOutlinePersonOutline}
                w={iconSize}
                h={iconSize}
                cursor="pointer"
                onClick={() => router.push(`/${username}`)}
                color={router.asPath === `/${username}` ? "white" : "current"}
              />
            </HStack>
          </Box>
        </HStack>
      )}
    </>
  );
};

export default Navbar;
