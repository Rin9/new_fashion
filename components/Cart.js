import React from "react";
import { useAppContext } from "../src/context/app_context";
import CartItem from "./CartItem";
import {
  useDisclosure,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  VStack,
  StackDivider,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Heading,
  Flex,
  Text,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
const Cart = () => {
  const { cart, removeItem, toggleAmount } = useAppContext();

  // this is for chakra ui drawer: cart
  const {
    isOpen: isOpenCart,
    onOpen: onOpenCart,
    onClose: onCloseCart,
  } = useDisclosure();

  //this is to handle item remove
  const handleRemove = (id, size) => {
    setProductRemoved({
      id,
      size,
    });
    onOpenAlert();
  };

  return (
    <>
      <IconButton
        aria-label="Cart"
        variant="iconbutton_nav"
        icon={<AiOutlineShoppingCart />}
        onClick={onOpenCart}
      />
      {/* right drawer: cart */}
      <Drawer
        placement={"right"}
        onClose={onCloseCart}
        isOpen={isOpenCart}
        size="xs"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Cart</DrawerHeader>
          {/* Drawer body (cart part) */}
          <DrawerBody>
            {/* This stack is cart */}
            <VStack
              divider={<StackDivider borderColor="gray.200" />}
              spacing="5"
              align="flex-start"
              my="15px"
              borderBottom="1px"
              borderColor="gray.200"
              pb="20px"
            >
              {/* confirm remove item overlay */}
              {/* <AlertDialog
                isOpen={isOpenAlert}
                leastDestructiveRef={cancelRef}
                onClose={onCloseAlert}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                      Remove product
                    </AlertDialogHeader>

                    <AlertDialogBody>
                      Sure to remove this product from your cart?
                    </AlertDialogBody>

                    <AlertDialogFooter>
                      <Button ref={cancelRef} onClick={onCloseAlert}>
                        Cancel
                      </Button>
                      <Button
                        colorScheme="red"
                        onClick={() => {
                          //remove the item
                          removeItem(productRemoved);
                          //close the alert overlay
                          onCloseAlert();
                        }}
                        ml={3}
                      >
                        Remove
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog> */}
              {/* confirm remove item overlay end */}

              {cart?.length > 0 ? (
                cart.map((item) => {
                  return (
                    <CartItem
                      key={item?.id + item?.size}
                      item={item}
                      handleRemove={handleRemove}
                      toggleAmount={toggleAmount}
                    />
                    // <Flex
                    //   key={item.id + item.size}
                    //   direction="row"
                    //   columnGap="5"
                    // >
                    //   <Image
                    //     src={item.image}
                    //     boxSize="150px"
                    //     objectFit="cover"
                    //     alt={item.name}
                    //     rounded="lg"
                    //   />
                    //   <Flex direction="column" rowGap="5">
                    //     <Heading variant="hero_h3">{item.name}</Heading>
                    //     <Text variant="text_normal">
                    //       Size: {item.size}
                    //     </Text>
                    //     <NumberInput
                    //       defaultValue={item.number}
                    //       min={1}
                    //       max={item.max}
                    //     >
                    //       <NumberInputField />
                    //       <NumberInputStepper>
                    //         <NumberIncrementStepper />
                    //         <NumberDecrementStepper />
                    //       </NumberInputStepper>
                    //     </NumberInput>
                    //     <Button
                    //       onClick={() => handleRemove(item.id, item.size)}
                    //     >
                    //       Remove
                    //     </Button>
                    //   </Flex>
                    // </Flex>
                  );
                })
              ) : (
                <>
                  <Heading variant="hero_h1">Oops...</Heading>
                  <Flex
                    p="40px"
                    flexDirection="column"
                    color="white"
                    mt="4"
                    bg="blackAlpha.800"
                    rounded="md"
                    shadow="md"
                    align="flex-start"
                    justify="center"
                    rowGap="20px"
                  >
                    <Text variant="text_normal">
                      No Products In Your Cart...
                    </Text>
                    <Text variant="text_normal">For Now</Text>
                    <Button
                      fontFamily="Merriweather, sans-serif"
                      fontWeight="300"
                      color="black"
                    >
                      <Link href={"/products/all"}>Go Get Some →</Link>
                    </Button>
                  </Flex>
                </>
              )}
            </VStack>
            {/* This stack is contact, about, etc.. */}
            <VStack spacing="3" align="flex-start" mt="30px">
              {/* <Link href="/" passHref>
                      <InnerLink variant="link_logo" onClick={onCloseCart}>
                        <Text color="black">ABOUT</Text>
                      </InnerLink>
                    </Link>
                    <Link href="/" passHref>
                      <InnerLink variant="link_logo" onClick={onCloseCart}>
                        <Text color="black">CONTENT</Text>
                      </InnerLink>
                    </Link>
                    <Link href="/" passHref>
                      <InnerLink variant="link_logo" onClick={onCloseCart}>
                        <Text color="black">SHIPPING & RETURNS</Text>
                      </InnerLink>
                    </Link>
                    <Link href="/" passHref>
                      <InnerLink variant="link_logo" onClick={onCloseCart}>
                        <Text color="black">PRIVACY</Text>
                      </InnerLink>
                    </Link>
                    <Link href="/" passHref>
                      <InnerLink variant="link_logo" onClick={onCloseCart}>
                        <Text color="black">INSTAGRAM</Text>
                      </InnerLink>
                    </Link> */}
            </VStack>
          </DrawerBody>
          {/* Drawer Footer ( user, search) */}
          <DrawerFooter>
            {/* <Link href={"/auth/signin"} passHref>
                    <Button
                      colorScheme="white"
                      color="#252f3e"
                      variant="outline"
                    >
                      Login
                    </Button>
                  </Link> */}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Cart;
