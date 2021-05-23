import prisma from "../../../lib/prisma";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import bcrypt from "bcrypt";
import Adapters from "next-auth/adapters";
import { User } from ".prisma/client";
import { session } from "next-auth/client";

const credentials = {
  username: { label: "Username", type: "text", placeholder: "jsmith" },
  password: { label: "Password", type: "password" },
};

type Credentials = {
  username: string;
  password: string;
};

export default NextAuth({
  // Configure one or more authentication providers
  callbacks: {
    async jwt(token, user: User) {
      console.log(user);
      token.userId = user.id;
      return token;
    },
    async session(session, token) {
      session.userId = token.userId;
      return session;
    },
  },
  providers: [
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials,

      async authorize(credentials: Credentials) {
        // Add logic here to look up the user from the credentials supplied
        const salt = await bcrypt.genSalt();

        const hash = await bcrypt.hash(credentials.password, salt);

        console.log(credentials, hash);

        const user = await prisma.user.findFirst({
          where: { name: credentials.username },
        });

        if (!user) {
          return null;
        }

        const passwordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordCorrect) {
          return null;
        }

        return user;
      },
    }),
  ],

  database: process.env.DATABASE_URL,
  adapter: Adapters.Prisma.Adapter({ prisma }),
  session: { jwt: true },
});
