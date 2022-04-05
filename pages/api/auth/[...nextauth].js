import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import TwitterProvider from "next-auth/providers/twitter";
import { GraphQLClient, gql } from "graphql-request";

//initialize the graphcms client
const client = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
  },
});
// get user by email
const GetUserByEmail = gql`
  query GetUserByEmail($email: String!) {
    user: nextUser(where: { email: $email }, stage: DRAFT) {
      id
    }
  }
`;
// create user by email
const CreateNextUserByEmail = gql`
  mutation CreateNextUserByEmail($email: String!) {
    newUser: createNextUser(data: { email: $email }) {
      id
    }
  }
`;

export default NextAuth({
  pages: {
    signIn: "/auth/signin",
    // signOut: "/auth/signout",
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // TwitterProvider({
    //   clientId: process.env.TWITTER_CLIENT_ID,
    //   clientSecret: process.env.TWITTER_CLIENT_SECRET,
    // }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // check if user exist
      const data = await client.request(GetUserByEmail, {
        email: user.email,
      });

      // not exist, create user
      if (!data.user) {
        const { newUser } = await client.request(CreateNextUserByEmail, {
          email: user.email,
        });
        if (newUser) {
          return true;
        }
      }
      return true;
    },
    // redirect({ url, baseUrl }) {
    //   return url;
    // },
  },
});
