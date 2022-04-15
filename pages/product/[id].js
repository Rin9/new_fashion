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
  Button,
  useRadioGroup,
  NumberInput,
  NumberInputStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Alert,
  AlertIcon,
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
import CarouselInPage from "../../components/CarouselInPage";
import { useAppContext } from "../../src/context/app_context";
import FadeIn from "react-fade-in";

const Product = ({ params, categories, product }) => {
  //console.log("=-=-=-=-=-=", product);
  const { addToCart } = useAppContext();
  //size value
  const [size, setSize] = useState({ id: product?.id, size: null });
  //product quantity
  const [productQuantity, setProductQuantity] = useState(0);
  //set is error
  const [isError, setIsError] = useState(false);
  //error message
  const [errorMessage, setErrorMessage] = useState("");
  // set is item is added
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  // this is to control the whole show message box: if is true, show the success message box; or show the error message box
  const [isShowSuccsess, setIsShowSuccsess] = useState(null);

  // console.log(size);
  // max quantity of certain size of product
  const [maxQuantity, setMaxQuantity] = useState(0);
  //get the sizes of product to use in custimize radio cards
  const options = product?.sizes;

  //no size options, max quantity equals to the product total quantity
  useEffect(() => {
    if (options?.length === 0) {
      setMaxQuantity(product?.total);
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
      product?.sizes.filter((item) => item.name === value)[0].inventory
    );
  };

  //handle add to cart
  const handleCart = () => {
    //if product has size option but user doesn't choose it
    if (product?.sizes.length !== 0 && !size.size) {
      setIsError(true);
      setErrorMessage("Please choose a size first");
      return;
    } else if (productQuantity === 0) {
      setIsError(true);
      setIsShowSuccsess(false);
      setErrorMessage("You should add at least one product");
      return;
    }

    const newProduct = {
      name: product?.name,
      id: product?.id,
      price: product?.price,
      slug: product?.slug,
      image: product?.images[0].url,
      size: size.size,
      number: productQuantity,
      max: maxQuantity,
    };
    addToCart(newProduct);
    setIsSuccess(true);
    setIsShowSuccsess(true);
    setSuccessMessage("Product added");
  };
  //clear the error message
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsError(false);
      setErrorMessage("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [isError]);
  //clear added message
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSuccess(false);
      setSuccessMessage("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [isSuccess]);
  //controlle show message
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShowSuccsess(null);
    }, 4000);
    return () => clearTimeout(timer);
  }, [isShowSuccsess]);

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
          {/* {product?.images.map((image, index) => {
            return (
              <Image
                boxSize={{ base: "100vw", lg: "50vw" }}
                objectFit="cover"
                src={image.url}
                key={`imgae_${index}`}
              />
            );
          })} */}
          <CarouselInPage cards={product?.images} />
        </Flex>
        {/* right part of the detail: names, prices, add to cart, etc */}
        <VStack
          maxW={{ base: "100vw", lg: "50vw" }}
          minH="500px"
          paddingTop="30px"
          px="40px"
          mx="0"
          marginBottom="50px"
          align="flex-start"
          spacing="6"
        >
          <Flex direction="column" rowGap="6">
            {/* product name */}
            <Heading variant="heading_logo">{product?.name}</Heading>
            {/* product price */}
            <Text variant="text_normal">{formatPrice(product?.price)}</Text>
            <Text variant="text_dec">{product?.description}</Text>
          </Flex>
          <Divider />
          {/* custimize radio card */}
          <Box>
            <Text variant="text_bold">Size:</Text>
            {options?.length > 0 ? (
              <HStack {...group} mt="20px">
                {options?.map((option) => {
                  const radio = getRadioProps({
                    value: option.name,
                    isDisabled: option.inventory === 0,
                  });
                  return (
                    <RadioCard key={option?.id} {...radio}>
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
              onChange={(e) => setProductQuantity(e)}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Button mt="30px" onClick={handleCart} width="200px">
              Add To Cart
            </Button>
          </Box>
          {/* add to cart */}
          <Box
            // direction={{ base: "column" }}
            // justify="flex-start"
            // alignItems="center"
            // columnGap="50px"
            width="100%"
          >
            {/* success message */}
            {/* {isSuccess && ( */}
            {isShowSuccsess ? (
              <FadeIn visible={isSuccess} delay="10">
                <Alert
                  status="success"
                  my="0px"
                  width={{ base: "300px", md: "350px" }}
                  rounded="2xl"
                >
                  <AlertIcon />
                  {successMessage}
                </Alert>
              </FadeIn>
            ) : (
              <FadeIn visible={isError} delay="10">
                <Alert
                  status="error"
                  my="0px"
                  width={{ base: "300px", md: "350px" }}
                  rounded="2xl"
                >
                  <AlertIcon />
                  {errorMessage}
                </Alert>
              </FadeIn>
            )}

            {/* )} */}

            {/* error */}
            {/* {isError && ( */}

            {/* )} */}
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
