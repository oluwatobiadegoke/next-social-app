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
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl:
        "https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code",
    }),
  ],
});

// const { userId } = user;
// // session.user.userId = userId;
// const newSession = session;

// try {
//   const respose = await fetch(`api/user/${userId}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   if (respose.status === 200) {
//     const user = await respose.json();
//     const { data } = user;
//     newSession.user = data;
//   }
// } catch (error) {
//   console.log(error);
// }
// return Promise.resolve(newSession);
