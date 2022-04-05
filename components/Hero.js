import {
  Container,
  Box,
  Flex,
  Heading,
  Center,
  Button,
} from "@chakra-ui/react";
import Image from "next/image";
import heroImage from "/public/images/hero-2.jpeg";

const Hero = () => {
  return (
    // main container for hero section
    <Flex
      width="100%"
      backgroundColor="white"
      direction={{ base: "column", md: "row" }}
    >
      {/* left container */}
      <Flex minW="50%" p="0" justify="center" align="center">
        <Flex
          minW="50%"
          minH={{ base: "300px" }}
          direction={["column"]}
          justify="center"
          align="center"
          rowGap={{ base: "35px", lg: "75px" }}
        >
          {/* Left Container Heading */}
          <Container>
            <Heading
              as="h2"
              variant="hero_h2"
              fontSize={{ base: "2rem", xl: "2.5rem" }}
              textAlign="center"
            >
              New Collection
            </Heading>
            <Heading
              as="h2"
              variant="hero_h1"
              fontSize={{ base: "2rem", lg: "2.5rem", xl: "3rem" }}
              textAlign="center"
            >
              DROP FORTY
            </Heading>
            <Heading
              as="h2"
              variant="hero_h2"
              fontSize={{ base: "2rem", xl: "2.5rem" }}
              textAlign="center"
            >
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
      </Flex>
      {/* right container */}
      <Container minW="50%" maxH="700px" p="0" m="0">
        <Image src={heroImage} objectFit="intrinsic" />
      </Container>
    </Flex>
  );
};

export default Hero;
