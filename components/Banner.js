import { Box, Container, Flex, Text, Button } from "@chakra-ui/react";
const Banner = () => {
  return (
    <Box width="100%" minH="60px" backgroundColor="#4f47e5">
      <Container maxW="70%" minH="60px">
        <Flex
          minH="60px"
          align="center"
          justify="space-between"
          direction={["column", "column", "column", "column", "column", "row"]}
          padding={["10px", "20px", "30px"]}
        >
          <Text
            variant="text_bold"
            color="white"
            mb={["10px", "10px", "20px", "20px", "20px", "0px"]}
          >
            Welcome to the New-Fashion! New Comer First Order 10% off + free
            shipping!
          </Text>
          <Button py="20px" px="30px">
            Let&apos;s go!
          </Button>
        </Flex>
      </Container>
    </Box>
  );
};

export default Banner;
