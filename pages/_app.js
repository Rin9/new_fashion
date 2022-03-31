// chakra ui
import { ChakraProvider } from "@chakra-ui/react";
// global style
import "../styles/globals.css";
// custimize theme
import theme from "../styles/theme/global";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
