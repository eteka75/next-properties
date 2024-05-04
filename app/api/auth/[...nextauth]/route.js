import NextAuth from "next-auth";
import { authOptions } from "@/utils/OAuthOptions";

const handler = NextAuth(authOptions);
export { handler as Get, handler as POST };
