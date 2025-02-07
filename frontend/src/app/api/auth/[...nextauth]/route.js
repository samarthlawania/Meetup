import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "next-auth/react";
import { Session, JWT, AdapterUser } from "next-auth";
import dbConnect from "@/lib/dbconnect";
import { User } from "@/app/models/user";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    // ...add more providers here
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      console.log("this is token" + token);
      console.log("this is user" + user);
      console.log("this is account" + account);
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.accesstoken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.userid = token.userid;
      return session;
    },
    async signIn({ user, profile }) {
      console.log("this is user" + user);
      console.log("this is profile" + profile);
      await dbConnect();
      let dbUser = await User.findOne({ email: user.email });

      if (!dbUser) {
        dbUser = await User.create({
          name: profile.name,
          email: profile.email,
          profilePicture: profile.picture,
          isVerified: profile.email_verified ? true : false,
        });
      }

      user.id = dbUser._id.toString();

      return true;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "user-auth",
  },
};

const handel = NextAuth(authOptions);

export { handel as GET, handel as POST };
