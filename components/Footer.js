import {
  Box,
  Container,
  Flex,
  Link as InnerLink,
  Heading,
  Center,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import useWindowSize from "../src/utils/useWindowSize";
const Footer = () => {
  const { width } = useWindowSize();

  return (
    <Box
      width="100%"
      minH={{ base: "100px", md: "100px" }}
      backgroundColor="white"
      borderTop="1px"
      borderColor="gray.200"
      pt="30px"
    >
      <Container maxW="90%" minH={{ base: "100px", md: "180px" }}>
        <Flex
          minH={{ base: "100px", md: "100px" }}
          align="flex-start"
          direction={{ base: "column", md: "row" }}
          justify="space-between"
        >
          {/* Footer logo part */}
          <Flex
            height={{ base: "50px", md: "100px" }}
            direction="column"
            justify="space-between"
          >
            <Link href="/" passHref>
              <InnerLink variant="link_logo">
                <Heading as="h4" variant="footer_logo" color="black">
                  New-Fashion
                </Heading>
              </InnerLink>
            </Link>
            <Text>© 2022, New Fashion.</Text>
          </Flex>

          {/* Footer address part */}
          <Center>
            <Text>111 Elizabeth Avenue New York NY (646) 666-3333</Text>
          </Center>
          {/* Footer menu part */}
          {width >= 800 && (
            <VStack height={{ base: "50px", md: "100px" }} align="flex-start">
              <Text>ABOUT</Text>
              <Text>CONTACT</Text>
              <Text>SHIPPING & RETURNS</Text>
              <Text>PRIVACY</Text>
              <Text>INSTAGRAM</Text>
            </VStack>
          )}
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
