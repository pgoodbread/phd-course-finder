import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import Adapters from "next-auth/adapters";
import Providers from "next-auth/providers";
import prisma from "../../../lib/prisma";

type Credentials = {
  username: string;
  password: string;
};

export default NextAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt(token, user) {
      if (!user) {
        return token;
      }
      token.userId = user.id;
      return token;
    },
    async session(session, token) {
      session.user.id = token.userId as string;
      return session;
    },
  },
  providers: [
    Providers.Credentials({
      name: "Credentials",

      async authorize(credentials: Credentials) {
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
