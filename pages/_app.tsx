import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import { UserContext } from "../lib/context";
import useUserData from "../lib/hooks";
import { Box, ChakraProvider } from "@chakra-ui/react";
import theme from "../themes/config";
import BottomNavbar from "../components/BottomNavbar";

function MyApp({ Component, pageProps }: AppProps) {
  const { user, username } = useUserData();

  return (
    <ChakraProvider theme={theme}>
      <UserContext.Provider value={{ user, username }}>
        <Box
          px={{ base: 4, sm: 8, md: 16, lg: 24 }}
          py={{ base: 2, sm: 4, md: 6, lg: 8 }}
          minH='100vh'
        >
          <Navbar />
          <Component {...pageProps} />
          <BottomNavbar />
        </Box>
        <Toaster />
      </UserContext.Provider>
    </ChakraProvider>
  );
}

export default MyApp;
