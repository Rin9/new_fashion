// this file is for custimize chakra ui style
import { extendTheme, theme as base } from "@chakra-ui/react";

// Customize Breakpoints
const breakpoints = {
  s: "0px",
  sm: "480px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

const theme = extendTheme({
  breakpoints,
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
        hero_h1: {
          fontFamily: "Merriweather, sans-serif",
          fontWeight: "900",
        },
        hero_h2: {
          fontFamily: "Merriweather, sans-serif",
          fontWeight: "300",
          fontStyle: "italic",
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
    Button: {
      variants: {},
    },
  },
});

export default theme;
