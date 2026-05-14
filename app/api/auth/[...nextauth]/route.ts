import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        return {
          id: "1",
          name: "Руслан",
          email: "admin@nasledie.ru",
        };
      },
    }),
  ],

  secret: "NASLEDIE_SECRET",

  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };