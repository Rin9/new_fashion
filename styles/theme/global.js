// this file is for custimize chakra ui style
import { extendTheme, theme as base } from "@chakra-ui/react";

// Customize Breakpoints
const breakpoints = {
  sm: "480px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

const theme = extendTheme({
  breakpoints,
  components: {
    Box: {
      variants: {
        disabled: {
          fontSize: "xl",
        },
      },
    },
    Text: {
      variants: {
        text_bold: {
          fontFamily: "Merriweather, sans-serif",
          fontWeight: "900",
          fontSize: "xl",
        },
        text_normal: {
          fontFamily: "Merriweather, sans-serif",
          fontWeight: "700",
          fontSize: "lg",
        },
        text_dec: {
          fontFamily: "Merriweather, sans-serif",
          fontWeight: "300",
          fontStyle: "Italic",
          lineHeight: "8",
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
        hero_h3: {
          fontFamily: "Merriweather, sans-serif",
          fontWeight: "300",
          fontSize: "md",
        },
        footer_logo: {
          fontFamily: "Merriweather, sans-serif",
          fontWeight: "900",
          fontSize: ["md", "md", "lg", "lg"],
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
    Box: {
      variants: {
        overlay: {
          position: "absolute",
          top: "0",
          bottom: "0",
          left: "0",
          right: "0",
          height: "100%",
          width: "100%",
          opacity: "0",
          transition: ".5s ease",
          backgroundColor: "#008CBA",
        },
      },
    },
    AlertDialog: {
      variants: {
        alert: {
          size: "md",
        },
      },
    },
  },
});

export default theme;
