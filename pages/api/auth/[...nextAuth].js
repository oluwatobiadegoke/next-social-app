import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { connectToDatabase } from "../../../helpers/database";
import { comparePassword } from "../../../helpers/auth";

export default NextAuth({
  session: {
    jwt: true,
  },
  callbacks: {
    jwt: async (token, user, account, profile, isNewUser) => {
      if (user) {
        token.userId = user.userId;
      }
      return Promise.resolve(token);
    },
    session: async (session, user) => {
      session.user.userId = user.userId;
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
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl:
        "https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code",
    }),
  ],
});
