// chakra ui
import { ChakraProvider } from "@chakra-ui/react";
// global style
import "../styles/globals.css";

// custimize theme
import theme from "../styles/theme/global";
//progress bar
import nProgress from "nprogress";
import "../styles/nprogress.css";

import Router from "next/router";

import { AppWrapper } from "../src/context/app_context";

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeComplete", nProgress.done);
Router.events.on("routeChangeError", nProgress.done);

// test for next auth
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <AppWrapper>
          <Component {...pageProps} />
        </AppWrapper>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
