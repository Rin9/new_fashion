import {
  Container,
  Flex,
  Text,
  Heading,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import React from "react";
import { getAllCategories } from "../../src/data/categories";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { getProductsByCategory } from "../../src/data/products";
import useWindowSize from "../../src/utils/useWindowSize";

const Products = ({ params, categories, products }) => {
  console.log("first", params);
  console.log("third", products);
  const { width } = useWindowSize();
  console.log(width);
  return (
    // main container
    <Container maxW={"100vw"} p="0" m="0" position="relative">
      {/* Nav bar */}
      <Nav categories={categories} />
      <Container width="100vw" minH="500px" p="0" m="0">
        {products.length > 0 ? (
          <Container p="0" m="0" width="100vw">
            <Grid templateColumns="repeat(5, 1fr)" p="0" m="0" width="100vw">
              {products.map((product) => {
                return (
                  <GridItem
                    key={product.id}
                    backgroundPosition="center"
                    backgroundRepeat="no-repeat"
                    backgroundSize="cover"
                    backgroundImage={`url(${product.images[0].url})`}
                    minH="400px"
                    // width="285px"
                  ></GridItem>
                );
              })}
            </Grid>
          </Container>
        ) : (
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
        )}
      </Container>
      {/* Footer */}
      <Footer />
    </Container>
  );
};

export default Products;

export async function getStaticProps({ params }) {
  // const data = await getPostDetails(params.slug);

  // get products by slug
  const { products } = (await getProductsByCategory(params.slug)) || [];
  // get categories for nav bar
  const { categories } = (await getAllCategories()) || [];

  return {
    props: { params, categories, products },
  };
}

export async function getStaticPaths() {
  const { categories } = await getAllCategories();
  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}
