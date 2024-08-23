import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/app/lib/db/prisma";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import { env } from "@/app/lib/env";
import { mergeAnonimusCartWithUserCart } from "@/app/lib/db/cart";
import { authOptions } from "@/app/lib/authOprions";

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
