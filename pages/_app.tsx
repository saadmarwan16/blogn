import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../themes/config";
import AuthContextProvider from "../lib/contexts/AuthContext";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthContextProvider>
        <Header />
        <Component {...pageProps} />
        <Navbar />
        <Toaster />
      </AuthContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
