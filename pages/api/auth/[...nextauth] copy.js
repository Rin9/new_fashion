import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare, hash } from "bcrypt";
import { GraphQLClient, gql } from "graphql-request";

const client = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
  },
});

const GetUserByEmail = gql`
  query GetUserByEmail($email: String!) {
    user: nextUser(where: { email: $email }, stage: DRAFT) {
      id
      password
    }
  }
`;

const CreateNextUserByEmail = gql`
  mutation CreateNextUserByEmail($email: String!, $password: String!) {
    newUser: createNextUser(data: { email: $email, password: $password }) {
      id
    }
  }
`;

export default NextAuth({
  pages: {
    // signIn: "/testsignin",
    // signOut: "/auth/signout",
  },
  providers: [
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jamie@graphcms.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },

      authorize: async ({ email, password }) => {
        // if (email.trim() === "" || password.trim() === "") {
        //   return null;
        // }

        const { user } = await client.request(GetUserByEmail, {
          email,
        });

        if (!user) {
          // const { newUser } = await client.request(CreateNextUserByEmail, {
          //   email,
          //   password: await hash(password, 12),
          // });

          // return {
          //   id: newUser.id,
          //   username: email,
          //   email,
          // };
          return {
            error: "No such user",
          };
        }

        const isValid = await compare(password, user.password);

        if (!isValid) {
          throw new Error("Wrong credentials. Try again.");
        }

        return {
          id: user.id,
          username: email,
          email,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      } else {
        // Return false to display a default error message
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
  },
});
