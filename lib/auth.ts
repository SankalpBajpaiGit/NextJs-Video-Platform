import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "./db";
import User from "@/models/User";
import bcrypt from "bcryptjs"; // Ensure this is bcryptjs

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("\n--- Authorize function started ---");

        if (!credentials?.email || !credentials?.password) {
          console.log("Authorize error: Missing email or password.");
          throw new Error("Missing email or password");
        }

        try {
          await connectToDatabase();
          const user = await User.findOne({ email: credentials.email });

          if (!user) {
            console.log(`No user found with email: ${credentials.email}`);
            throw new Error("No user found with this email");
          }

          console.log(`User found in DB: ${user.email}`);
          console.log("Comparing passwords...");

          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          console.log(`Password comparison result (isValid): ${isValid}`);

          if (!isValid) {
            console.log("Password comparison failed.");
            throw new Error("Invalid password");
          }

          console.log("--- Authorize successful ---");
          return {
            id: user._id.toString(),
            email: user.email,
          };
        } catch (error) {
          console.error("Error in authorize function:", error);
          // Re-throw the error to let NextAuth handle it
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // Add the user ID to the session object
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};