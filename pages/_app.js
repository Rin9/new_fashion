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

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeComplete", nProgress.done);
Router.events.on("routeChangeError", nProgress.done);

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
