import {
  Container,
  Flex,
  Text,
  Heading,
  SimpleGrid,
  Box,
  Image,
  VStack,
  HStack,
  Divider,
  RadioGroup,
  Radio,
  Stack,
  useRadioGroup,
  NumberInput,
  NumberInputStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import { getAllCategories } from "../../src/data/categories";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { getProductByID, getAllProducts } from "../../src/data/products";
import { formatPrice } from "../../src/utils/helper";
//custimize radio card
import RadioCard from "../../components/RadioCard";

const Product = ({ params, categories, product }) => {
  console.log("=-=-=-=-=-=", product);
  //size value
  const [size, setSize] = useState({ id: product.id, size: null });
  // max quantity of certain size of product
  const [maxQuantity, setMaxQuantity] = useState(0);
  //get the sizes of product to use in custimize radio cards
  const options = product.sizes;
  //no size options, max quantity equals to the product total quantity

  useEffect(() => {
    if (options.length === 0) {
      setMaxQuantity(product.total);
    }
  }, []);

  // handle radio card change
  const handleSize = (value) => {
    setSize((prev) => {
      return {
        ...prev,
        size: value,
      };
    });
    setMaxQuantity(
      product.sizes.filter((item) => item.name === value)[0].inventory
    );
  };

  //this is for the custimize radio card
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "size",
    defaultValue: null,
    onChange: handleSize,
  });

  const group = getRootProps();

  return (
    // main container
    <Container maxW={"100vw"} p="0" m="0">
      <Head>
        <title>{product?.slug} || New Fashion</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Nav bar */}
      <Nav categories={categories} />

      {/* product detail */}
      <Flex
        maxW="100vw"
        minH="500px"
        p="0"
        m="0"
        direction={{ base: "column", lg: "row" }}
        position="relative"
      >
        {/* left part of the detail: images for this product */}
        <Flex
          direction="column"
          minW={{ base: "100vw", lg: "50vw" }}
          minH="500px"
          p="0"
          m="0"
        >
          {product.images.map((image, index) => {
            return (
              <Image
                boxSize={{ base: "100vw", lg: "50vw" }}
                objectFit="cover"
                src={image.url}
                key={`imgae_${index}`}
              />
            );
          })}
        </Flex>
        {/* right part of the detail: names, prices, add to cart, etc */}
        <VStack
          maxW={{ base: "100vw", lg: "50vw" }}
          minH="500px"
          paddingTop="30px"
          px="40px"
          m="0"
          align="flex-start"
          spacing="6"
        >
          <Flex direction="column" rowGap="6">
            {/* product name */}
            <Heading variant="heading_logo">{product.name}</Heading>
            {/* product price */}
            <Text variant="text_normal">{formatPrice(product.price)}</Text>
            <Text variant="text_dec">{product.description}</Text>
          </Flex>
          <Divider />
          {/* custimize radio card */}
          <Box>
            <Text variant="text_bold">Size:</Text>
            {options.length > 0 ? (
              <HStack {...group} mt="20px">
                {options.map((option) => {
                  const radio = getRadioProps({
                    value: option.name,
                    isDisabled: option.inventory === 0,
                  });
                  return (
                    <RadioCard key={option.id} {...radio}>
                      {option.name}
                    </RadioCard>
                  );
                })}
              </HStack>
            ) : (
              <Text mt="20px" variant="text_normal">
                This item has no size option
              </Text>
            )}
          </Box>
          {/* quantity */}
          <Box>
            <Text variant="text_bold">Quantities:</Text>
            <NumberInput
              defaultValue={0}
              min={0}
              max={maxQuantity}
              clampValueOnBlur={true}
              mt="20px"
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Box>
        </VStack>
      </Flex>

      {/* Footer */}
      <Footer />
    </Container>
  );
};

export default Product;

export async function getStaticProps({ params }) {
  // const data = await getPostDetails(params.slug);

  // get products by slug
  const { product } = (await getProductByID(params?.id)) || [];
  // get categories for nav bar
  const { categories } = (await getAllCategories()) || [];

  return {
    props: { params, categories, product },
  };
}

export async function getStaticPaths() {
  //generate pages with id
  const { products } = await getAllProducts();
  return {
    paths: products?.map(({ id }) => ({ params: { id } })),
    fallback: true,
  };
}
