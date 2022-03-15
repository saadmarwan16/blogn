import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import { Box, ChakraProvider, VStack } from "@chakra-ui/react";
import theme from "../themes/config";
import BottomNavbar from "../components/BottomNavbar";
import AuthContextProvider from "../lib/contexts/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthContextProvider>
        <Navbar />
        <Component {...pageProps} />
        <BottomNavbar />
        <Toaster />
      </AuthContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
