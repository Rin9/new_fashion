import Head from "next/head";
import { Container } from "@chakra-ui/react";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import Carousel from "../components/Carousel";
import { most_popular } from "../data/dummy_data/all";
import { new_arrival } from "../data/dummy_data/all";
import Footer from "../components/Footer";

// this is for login test
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  return (
    <div>
      <Head>
        <title>New Fashion</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* main container */}
      <Container maxW={"100vw"} p="0" m="0" position="relative">
        {/* up banner */}
        {/* <Banner /> */}
        {/* Nav bar */}
        <Nav />
        {/* Hero */}
        <Hero />
        {/* most popular Carousel */}
        <Carousel title={"Most Popular"} cards={most_popular} />
        {/* new arrival Carousel */}
        <Carousel title={"New Arrivals"} cards={new_arrival} />
        {/* Footer */}
        <Footer />
      </Container>
    </div>
  );
}
