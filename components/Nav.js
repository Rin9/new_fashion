import React from "react";
import Link from "next/link";
import {
  Box,
  Container,
  Heading,
  Flex,
  Link as InnerLink,
  HStack,
  Text,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  VStack,
  StackDivider,
  DrawerFooter,
  Image,
  NumberInput,
  NumberInputStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberDecrementStepper,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
// dummy data
import { banner as bannerData } from "../data/dummy_data/all";
//icons
import { FiChevronDown } from "react-icons/fi";
import {
  AiOutlineUser,
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineMenu,
} from "react-icons/ai";
// customize hook for geting window size
import useWindowSize from "../src/utils/useWindowSize";
// use cart context
import { useAppContext } from "../src/context/app_context";
import CartItem from "./CartItem";

const Nav = ({ categories }) => {
  const menu = categories;
  // get the cart and actions for editing cart:
  const { cart, removeItem, toggleAmount } = useAppContext();
  //this is set to use for the remove item function
  const [productRemoved, setProductRemoved] = React.useState(null);

  // console.log("This is the cart : == == ==", cart);
  // cart reducer
  // const [state, dispatch] = useAppContext();
  // useEffect(() => {
  //   dispatch({ type: "add_number", value: 3 });
  // }, []);
  // console.log(state);

  // get the width of thw window
  const { width } = useWindowSize();
  // this is for chakra ui drawer: menu
  const {
    isOpen: isOpenMenu,
    onOpen: onOpenMenu,
    onClose: onCloseMenu,
  } = useDisclosure();
  // this is for chakra ui drawer: cart
  const {
    isOpen: isOpenCart,
    onOpen: onOpenCart,
    onClose: onCloseCart,
  } = useDisclosure();
  // this is for chakra ui alert
  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure();

  const cancelRef = React.useRef();

  //this is to handle item remove
  const handleRemove = (id, size) => {
    setProductRemoved({
      id,
      size,
    });
    onOpenAlert();
  };

  return (
    <Box
      width="100%"
      minH="80px"
      backgroundColor="white"
      borderBottom="1px"
      borderColor="gray.200"
    >
      <Container maxW="95%" minH="80px">
        <Flex
          minH="80px"
          align="center"
          direction="row"
          justify="space-between"
        >
          {/* logo part */}
          <Link href="/" passHref>
            <InnerLink variant="link_logo">
              <Heading as="h1" variant="heading_logo" color="black">
                New-Fashion
              </Heading>
            </InnerLink>
          </Link>
          {/* banner menu (width >= 1024)*/}
          {width >= 1280 && (
            <HStack minH="80px" gap="30px">
              {menu?.map((item) => {
                if (item.isMenu) {
                  return (
                    <Menu key={`menu_${item.name}`}>
                      <MenuButton key={`menu_button_${item.name}`}>
                        <Flex
                          align="center"
                          justify="space-between"
                          minW="50px"
                        >
                          {item.name} <FiChevronDown />
                        </Flex>
                      </MenuButton>
                      <MenuList key={`menu_list_${item.name}`}>
                        {item.sub_menu.map((subItem) => (
                          <MenuItem key={`menu_item_${subItem}`}>
                            {subItem}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </Menu>
                  );
                } else {
                  return (
                    <Link
                      href={`/products/${item.slug}`}
                      passHref
                      key={`link_${item.name}`}
                    >
                      <InnerLink variant="link_logo">
                        <Text
                          variant={item.isSpecial && "text_bold"}
                          color="black"
                        >
                          {item.name}
                        </Text>
                      </InnerLink>
                    </Link>
                  );
                }
              })}
            </HStack>
          )}

          {/* User center, search, cart  */}
          <HStack minH="80px" gap="10px">
            {/* Left side menu */}
            {width < 1280 && (
              <>
                <IconButton
                  aria-label="Menu"
                  variant="iconbutton_nav"
                  icon={<AiOutlineMenu />}
                  onClick={onOpenMenu}
                />

                <Drawer
                  placement={"left"}
                  onClose={onCloseMenu}
                  isOpen={isOpenMenu}
                >
                  <DrawerOverlay />
                  <DrawerContent>
                    <DrawerHeader borderBottomWidth="1px">
                      <Text variant="text_normal">
                        <Link href="/" passHref>
                          <InnerLink onClick={onCloseMenu}>
                            New-Fashion
                          </InnerLink>
                        </Link>
                      </Text>
                    </DrawerHeader>
                    {/* Drawer body (menu part) */}
                    <DrawerBody>
                      {/* This stack is menu */}
                      <VStack
                        divider={<StackDivider borderColor="gray.200" />}
                        spacing="5"
                        align="flex-start"
                        my="15px"
                        borderBottom="1px"
                        borderColor="gray.200"
                        pb="20px"
                      >
                        {menu?.map((item) => {
                          return (
                            <Link
                              href={`/products/${item.slug}`}
                              passHref
                              key={`link_${item.name}`}
                            >
                              <InnerLink
                                variant="link_logo"
                                onClick={onCloseMenu}
                              >
                                <Text
                                  variant={item.isSpecial && "text_bold"}
                                  color="black"
                                >
                                  {item.name}
                                </Text>
                              </InnerLink>
                            </Link>
                          );
                        })}
                      </VStack>
                      {/* This stack is contact, about, etc.. */}
                      <VStack spacing="3" align="flex-start" mt="30px">
                        <Link href="/" passHref>
                          <InnerLink variant="link_logo" onClick={onCloseMenu}>
                            <Text color="black">ABOUT</Text>
                          </InnerLink>
                        </Link>
                        <Link href="/" passHref>
                          <InnerLink variant="link_logo" onClick={onCloseMenu}>
                            <Text color="black">CONTENT</Text>
                          </InnerLink>
                        </Link>
                        <Link href="/" passHref>
                          <InnerLink variant="link_logo" onClick={onCloseMenu}>
                            <Text color="black">SHIPPING & RETURNS</Text>
                          </InnerLink>
                        </Link>
                        <Link href="/" passHref>
                          <InnerLink variant="link_logo" onClick={onCloseMenu}>
                            <Text color="black">PRIVACY</Text>
                          </InnerLink>
                        </Link>
                        <Link href="/" passHref>
                          <InnerLink variant="link_logo" onClick={onCloseMenu}>
                            <Text color="black">INSTAGRAM</Text>
                          </InnerLink>
                        </Link>
                      </VStack>
                    </DrawerBody>
                    {/* Drawer Footer ( user, search) */}
                    <DrawerFooter>
                      <Link href={"/auth/signin"} passHref>
                        <Button
                          colorScheme="white"
                          color="#252f3e"
                          variant="outline"
                        >
                          Login
                        </Button>
                      </Link>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </>
            )}
            {width >= 1024 && (
              <>
                <Link href={"/auth/signin"} passHref>
                  <InnerLink>
                    <AiOutlineUser />
                  </InnerLink>
                </Link>

                <IconButton
                  aria-label="Search"
                  variant="iconbutton_nav"
                  icon={<AiOutlineSearch />}
                />
              </>
            )}

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
                    <AlertDialog
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
                    </AlertDialog>
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
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Nav;
