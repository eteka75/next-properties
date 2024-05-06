import GoogleProvider from "next-auth/providers/google";
import { connecteDB } from "@/config/database";
import { User } from "@/models/Users";
//import { signIn } from "next-auth/react";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      //invok on successfull signin
      // 1. Connect to Database
      await connecteDB();
      // 2. Check if user existe
      const userExist = await User.findOne({ email: profile.email });
      // 3. If not, then add user to database
      if (!userExist) {
        // console.log("userExistssssssssssssssssssss :", userExist);
        // Truncat user name if is too long
        const username = profile.name.slice(0, 20);

        await User.create({
          email: profile.email,
          username: username,
          image: profile.picture,
        });
      }
      return true;
      // 4. Return true to allow sign in
    },
  },
  // Modifie the session object
  async session({ session }) {
    // 1. Get user from database
    const user = await User.findOne({
      email: session.user.email,
    });

    // 2. Assign user id to the session
    session.user.id = user._id.toString();
    // 3. Return Session
    return session;
  },
};
