import { useState, useEffect } from "react";
// next-auth
import { useSession, signIn, signOut, getProviders } from "next-auth/react";
// chakra ui
import {
  Text,
  Heading,
  VStack,
  Center,
  Button,
  Flex,
  Spinner,
  useDisclosure,
  Container,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
// Footer component
import Footer from "/components/Footer";
//Nav component
import Nav from "/components/Nav";
//next router
import { useRouter } from "next/router";
// icons
import { AiOutlineCheckCircle } from "react-icons/ai";
import { FaGithub, FaTwitter } from "react-icons/fa";
// loading spinner
import { TailSpin } from "react-loader-spinner";
import { getAllCategories } from "../../src/data/categories";

const Signin = ({ categories }) => {
  // this to control if the button is loading
  const [isLoading, setIsLoading] = useState(false);
  // this to control if to show the error message
  const [isError, setIsError] = useState(false);
  // error message
  const [errorMessage, setErrorMessage] = useState("");
  // chakra ui hook
  const { isOpen, onToggle } = useDisclosure();

  // next-auth providers
  const [providers, setProviders] = useState(null);
  // sign-out url, to use for the useeffect
  const [signOutUrl, setSignOutUrl] = useState(null);
  // nextjs router, to push user to the home page
  const router = useRouter();
  // get session from next-auth
  const { data: session, status } = useSession();

  //get next-auth providers
  useEffect(() => {
    const setTheProviders = async () => {
      const providers = await getProviders();
      setProviders(providers);
    };
    setTheProviders();
  }, []);

  // clear the error message
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsError(false);
      setErrorMessage("");
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [isError]);

  // user sign in
  const userSignIn = (provider) => {
    setIsLoading(true);
    signIn(provider);
  };
  // user sign out
  const userSignOut = async () => {
    setIsLoading(true);
    const data = await signOut({
      redirect: false,
      callbackUrl: "/",
    });
    // show the fade
    onToggle();
    // set the sign out url to take user to home page
    setSignOutUrl(data.url);
  };

  // redirect signout user
  useEffect(() => {
    const timer = setTimeout(() => {
      if (signOutUrl) {
        router.push(signOutUrl);
      }
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [signOutUrl]);

  return (
    <Container maxW={"100vw"} p="0" m="0" position="relative">
      {/* nav bar */}
      <Nav categories={categories} />
      {/* loading, show the loading spinner */}
      {status === "loading" ? (
        // loading spinner
        <Center
          minH={{ base: "300px", lg: "500px" }}
          flexDirection="column"
          rowGap={{ base: "20px", lg: "40px" }}
        >
          <Heading variant="hero_h1">Loading</Heading>
          <TailSpin height="100" width="100" color="grey" ariaLabel="loading" />
        </Center>
      ) : (
        <VStack
          width={{ base: "300px", md: "500px" }}
          height="400px"
          mx="auto"
          mt="50px"
          spacing="8"
          align="flex-start"
        >
          <Heading variant="hero_h1">
            {session ? "User Center" : "Sign In"}
          </Heading>
          {/* user not Sign in */}
          {!session && (
            <VStack
              width={{ base: "300px", md: "500px" }}
              spacing="8"
              align={{ base: "flex-start", md: "flex-start" }}
            >
              {isError && (
                <Alert status="error">
                  <AlertIcon />
                  {errorMessage}
                </Alert>
              )}
              {providers?.github && (
                <Button
                  colorScheme="gray"
                  leftIcon={<FaGithub />}
                  onClick={() => userSignIn(providers.github.id)}
                  isLoading={isLoading}
                >
                  Sign in with Github
                </Button>
              )}
              {isOpen && (
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
                  <AiOutlineCheckCircle size="30px" />
                  <Text>You Have Sign Out, Taking You To The Home...</Text>
                  <Spinner />
                </Flex>
              )}
            </VStack>
          )}
          {/* user already Sign in */}
          {session && (
            <VStack
              width={{ base: "300px", md: "500px" }}
              spacing="8"
              align={{ base: "flex-start", md: "flex-start" }}
            >
              <Text variant="text_normal">
                Signed in as: {session.user?.email}
              </Text>
              <Button type="button" onClick={() => userSignOut()}>
                Sign Out
              </Button>
            </VStack>
          )}
        </VStack>
      )}

      <Footer />
    </Container>
  );
};

export default Signin;

export async function getStaticProps() {
  const { categories } = (await getAllCategories()) || [];

  return {
    props: {
      categories,
    },
  };
}
