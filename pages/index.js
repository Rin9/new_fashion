import { useEffect } from "react";
import Head from "next/head";
import { Container } from "@chakra-ui/react";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import { getAllProductsByCollections } from "../src/data/products";
import { getAllCategories } from "../src/data/categories";

export default function Home({ collections, categories }) {
  // console.log("collection", collections);
  // console.log("categories", categories);

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
        <Nav categories={categories} />
        {/* Hero */}
        <Hero />
        {/* Carousel */}
        {collections &&
          collections.map((item, index) => {
            return (
              <Carousel
                key={item.id}
                title={item.name}
                cards={collections[index].products}
              />
            );
          })}
        {/* Footer */}
        <Footer />
      </Container>
    </div>
  );
}

export async function getStaticProps() {
  const collections = (await getAllProductsByCollections()) || [];
  const { categories } = (await getAllCategories()) || [];

  return {
    props: {
      collections,
      categories,
    },
  };
}
