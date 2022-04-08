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

const Nav = ({ categories }) => {
  const menu = categories;
  // get the width of thw window
  const { width } = useWindowSize();
  // this is for chakra ui drawer
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      width="100%"
      minH="80px"
      backgroundColor="white"
      borderBottom="1px"
      borderColor="gray.200"
    >
      <Container maxW="90%" minH="80px">
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
                  onClick={onOpen}
                />

                <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
                  <DrawerOverlay />
                  <DrawerContent>
                    <DrawerHeader borderBottomWidth="1px">Welcome</DrawerHeader>
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
                                onClick={() => onClose()}
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
                          <InnerLink
                            variant="link_logo"
                            onClick={() => onClose()}
                          >
                            <Text color="black">ABOUT</Text>
                          </InnerLink>
                        </Link>
                        <Link href="/" passHref>
                          <InnerLink
                            variant="link_logo"
                            onClick={() => onClose()}
                          >
                            <Text color="black">CONTENT</Text>
                          </InnerLink>
                        </Link>
                        <Link href="/" passHref>
                          <InnerLink
                            variant="link_logo"
                            onClick={() => onClose()}
                          >
                            <Text color="black">SHIPPING & RETURNS</Text>
                          </InnerLink>
                        </Link>
                        <Link href="/" passHref>
                          <InnerLink
                            variant="link_logo"
                            onClick={() => onClose()}
                          >
                            <Text color="black">PRIVACY</Text>
                          </InnerLink>
                        </Link>
                        <Link href="/" passHref>
                          <InnerLink
                            variant="link_logo"
                            onClick={() => onClose()}
                          >
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
            />
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Nav;
