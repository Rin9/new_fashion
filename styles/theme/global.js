// this file is for custimize chakra ui style
import { extendTheme, theme as base } from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    Text: {
      variants: {
        text_bold: {
          fontFamily: "Merriweather, sans-serif",
          fontWeight: "900",
          fontSize: "xl",
        },
        text_normal: {
          fontFamily: "Merriweather, sans-serif",
          fontWeight: "100",
          fontSize: "lg",
        },
      },
    },
    Heading: {
      variants: {
        heading_logo: {
          fontFamily: "Merriweather, sans-serif",
          fontWeight: "900",
          fontSize: ["xl", "xl", "2xl", "3xl"],
        },
      },
    },
    Link: {
      variants: {
        link_logo: {
          margin: "0",
          padding: "0",
          color: "#4C5D6E",
          transition: "all",
          transitionDuration: "0.5s",
          transitionTimingFunction: "ease-in",
          _hover: {
            color: "#2d3742",
            textDecoration: "none",
          },
          _active: {
            color: "#0f1216",
            textDecoration: "none",
          },
        },
      },
    },
    IconButton: {
      variants: {
        iconbutton_nav: {
          colorScheme: "white",
          color: "black",
          size: "lg",
        },
      },
    },
  },
});

export default theme;
