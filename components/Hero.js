import {
  Container,
  Box,
  Flex,
  Heading,
  Center,
  Button,
} from "@chakra-ui/react";
import Image from "next/image";
import heroImage from "/public/images/hero.jpeg";

const Hero = () => {
  return (
    // main container for hero section
    <Flex
      width="100%"
      backgroundColor="white"
      direction={{ sm: "column", md: "column", lg: "column", xl: "row" }}
    >
      {/* left container */}
      <Container minW="50%" p="0">
        <Flex
          minW="50%"
          minH="500px"
          direction={["column"]}
          justify="center"
          align="center"
          rowGap={["75px"]}
        >
          {/* Left Container Heading */}
          <Container>
            <Heading as="h2" variant="hero_h2" textAlign="center">
              New Collection
            </Heading>
            <Heading as="h2" variant="hero_h1" textAlign="center">
              DROP FORTY
            </Heading>
            <Heading as="h2" variant="hero_h2" textAlign="center">
              On Sell
            </Heading>
          </Container>

          {/* Left Container Button */}
          <Center>
            <Button
              fontFamily="Merriweather, sans-serif"
              fontWeight="300"
              fontSize={["xl", "xl", "2xl", "3xl"]}
              py={["30px"]}
              px={["30px"]}
            >
              Order Now
            </Button>
          </Center>
        </Flex>
      </Container>
      {/* right container */}
      <Container
        minW="50%"
        minH="500px"
        maxH={{ lg: "800px", xl: "500px" }}
        p="0"
      >
        <Image src={heroImage} height={3000} />
      </Container>
    </Flex>
  );
};

export default Hero;
