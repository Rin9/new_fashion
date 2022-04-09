import { gql, request } from "graphql-request";

const graphAPI = process.env.GRAPHCMS_ENDPOINT;

//get all categories

export const getAllCategories = async () => {
  const query = gql`
    query GetAllCategories {
      categories(orderBy: updatedAt_DESC) {
        name
        slug
        id
        isSpecial
      }
    }
  `;
  const result = await request(graphAPI, query);
  // add the shop all category
  result.categories.splice(1, 0, {
    name: "Shop All",
    slug: "all",
    isSpecial: false,
  });
  return result;
};
