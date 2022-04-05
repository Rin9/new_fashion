// chakra ui
import { ChakraProvider } from "@chakra-ui/react";
// global style
import "../styles/globals.css";

// custimize theme
import theme from "../styles/theme/global";
//progress bar
import nProgress from "nprogress";
import "../styles/nprogress.css";
// loading spinner

import Router from "next/router";

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeComplete", nProgress.done);
Router.events.on("routeChangeError", nProgress.done);

// test for next auth
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
