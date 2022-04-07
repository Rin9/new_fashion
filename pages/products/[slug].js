import {
  Container,
  Flex,
  Text,
  Heading,
  SimpleGrid,
  Box,
} from "@chakra-ui/react";
import React from "react";
import Head from "next/head";
import { getAllCategories } from "../../src/data/categories";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { getProductsByCategory } from "../../src/data/products";

const Products = ({ params, categories, products }) => {
  console.log("first", params);
  console.log("third", products);
  return (
    // main container
    <Container maxW={"100vw"} p="0" m="0" position="relative">
      <Head>
        <title>{params?.slug} || New Fashion</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Nav bar */}
      <Nav categories={categories} />
      {products?.length > 0 ? (
        <Container minH="500px" maxW="100vw" p="0" m="0">
          <SimpleGrid minChildWidth="300px" p="0" m="0">
            {products?.map((product) => {
              return (
                <Box
                  key={product.id}
                  minH="400px"
                  cursor="pointer"
                  position="relative"
                  backgroundPosition="center"
                  backgroundRepeat="no-repeat"
                  backgroundSize="cover"
                  backgroundImage={`url(${product.images[0].url})`}
                  transitionProperty="all"
                  transitionDuration="250ms"
                  transitionTimingFunction="ease-in"
                  _hover={{
                    transform: { base: "", xl: "scale(1.1)" },
                    boxShadow: "dark-lg",
                    rounded: "lg",
                    zIndex: "10",
                  }}
                >
                  <Box position="absolute" top="10px" left="20px">
                    <Text variant="text_bold">{product.name}</Text>
                  </Box>
                </Box>
              );
            })}
          </SimpleGrid>
        </Container>
      ) : (
        <Flex
          minH="500px"
          maxW="100vw"
          p="0"
          m="0"
          justify="center"
          align={"center"}
        >
          <Flex
            maxW="800px"
            minH="400px"
            flexDirection="column"
            justify="center"
            align="center"
          >
            <Heading variant="hero_h1">Oops...</Heading>
            <Flex
              p="40px"
              color="white"
              mt="4"
              bg="blackAlpha.800"
              rounded="md"
              shadow="md"
              align="center"
              justify="center"
              columnGap="20px"
            >
              <Text variant="text_normal">
                No Products In This Category...
                <br />
                For Now
              </Text>
            </Flex>
          </Flex>
        </Flex>
      )}
      {/* Footer */}
      <Footer />
    </Container>
  );
};

export default Products;

export async function getStaticProps({ params }) {
  // const data = await getPostDetails(params.slug);

  // get products by slug
  const { products } = (await getProductsByCategory(params?.slug)) || [];
  // get categories for nav bar
  const { categories } = (await getAllCategories()) || [];

  return {
    props: { params, categories, products },
  };
}

export async function getStaticPaths() {
  const { categories } = await getAllCategories();
  return {
    paths: categories?.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}
