import Head from "next/head";
import { Container } from "@chakra-ui/react";
import Banner from "../components/Banner";
import Nav from "../components/Nav";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <div>
      <Head>
        <title>New Fashion</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* main container */}
      <Container maxW={"100vw"} p="0">
        {/* up banner */}
        {/* <Banner /> */}
        {/* Nav bar */}
        <Nav />
        {/* Hero */}
        <Hero />
      </Container>
    </div>
  );
}
