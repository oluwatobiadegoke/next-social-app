import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { connectToDatabase } from "../../../helpers/database";
import { comparePassword } from "../../../helpers/auth";

export default NextAuth({
  session: {
    jwt: true,
  },
  callbacks: {
    jwt: async (token, user) => {
      if (user) {
        token.userId = user.userId;
        token.profilePicture = user.profilePicture;
        token.bio = user.bio;
      }
      return Promise.resolve(token);
    },
    session: async (session, user) => {
      session.user.userId = user.userId;
      session.user.profilePicture = user.profilePicture;
      session.user.bio = user.bio;
      return Promise.resolve(session);
    },
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const { email, password } = credentials;
        const client = await connectToDatabase();
        const users = client.db().collection("users");
        const user = await users.findOne({ email });

        if (!user) {
          client.close();
          throw new Error("User not found");
        }
        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
          client.close();
          throw new Error("Password does not match");
        }
        client.close();
        return Promise.resolve(user);
      },
    }),
  ],
});
