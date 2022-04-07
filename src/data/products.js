import { GraphQLClient, gql, request } from "graphql-request";

//initialize the graphcms client
const client = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
  },
});

const graphAPI = process.env.GRAPHCMS_ENDPOINT;

// get all collections
export const getAllCollections = async () => {
  const query = gql`
    query GetAllCollections {
      collections {
        id
        name
      }
    }
  `;
  const result = await client.request(query);

  return result;
};

// get All Products and filtered by Collections

export const getAllProductsByCollections = async () => {
  const { collections } = await getAllCollections();
  const idArray = [];
  for (let i = 0; i < collections.length; i++) {
    idArray.push(collections[i].id);
  }
  //get all products using collection ids
  const query = gql`
    query GetAllProducts($idArray: [ID!]) {
      products(where: { collections_every: { id_in: $idArray } }) {
        id
        name
        collections {
          id
          name
        }
        categories {
          id
          name
        }
        price
        slug
        images {
          url
        }
      }
    }
  `;

  const variables = {
    idArray: idArray,
  };

  const { products } = await request(graphAPI, query, variables);

  //filter all products by collection
  for (let i = 0; i < collections.length; i++) {
    let filteredProducts = products.filter((item) => {
      return item.collections[0].id === collections[i].id;
    });
    collections[i].products = filteredProducts;
  }
  return collections;
};

// get products by category
export const getProductsByCategory = async (category) => {
  //get all products using collection ids
  const query = gql`
    query GetAllProductsByCategory($slug: String!) {
      products(where: { categories_every: { slug: $slug } }) {
        id
        name
        images {
          url
        }
        price
        slug
      }
    }
  `;

  const result = await request(graphAPI, query, { slug: category });
  return result;
};
