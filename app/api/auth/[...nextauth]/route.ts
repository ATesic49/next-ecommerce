import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/app/lib/db/prisma";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import { env } from "@/app/lib/env";
import { mergeAnonimusCartWithUserCart } from "@/app/lib/db/cart";
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
  events: {
    async signIn({ user }) {
      await mergeAnonimusCartWithUserCart(user.id);
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
