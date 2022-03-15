import { Box, HStack, Icon, useBreakpointValue } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import { MdOutlinePersonOutline } from "react-icons/md";
import { VscAdd } from "react-icons/vsc";
import { useRouter } from "next/router";
import { useAuth } from "../lib/contexts/AuthContext";
import useShowNavbar from "../lib/hooks/showNavbar";

interface BottomNavbarProps {}

const BottomNavbar: FunctionComponent<BottomNavbarProps> = () => {
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
                as={AiOutlineSearch}
                w={iconSize}
                h={iconSize}
                cursor="pointer"
                onClick={() => router.push("/search")}
                color={router.asPath === "/search" ? "white" : "current"}
              />
              <Icon
                as={VscAdd}
                w={iconSize}
                h={iconSize}
                cursor="pointer"
                onClick={() => router.push("/admin")}
                color={router.asPath === "/admin" ? "white" : "current"}
              />
              <Icon
                as={MdOutlinePersonOutline}
                w={iconSize}
                h={iconSize}
                cursor="pointer"
                onClick={() => router.push(`${username}`)}
                color={router.asPath === `${username}` ? "white" : "current"}
              />
            </HStack>
          </Box>
        </HStack>
      )}
    </>
  );
};

export default BottomNavbar;
