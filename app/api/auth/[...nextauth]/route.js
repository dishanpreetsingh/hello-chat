import logger from "@logger";
import User from "@models/User";
import { connectToDB } from "@mongodb/connection";
import { compare } from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers:[
    CredentialsProvider({
      name:"Credentials",
      async authorize(credentials){
        if (!credentials.email || !credentials.password) {
          throw new Error("Invalid email or password");
        }

        await connectToDB()
        logger.info('API request processed successfully ffffffffffffffffffffff',);

console.log('RRRRRRRRRRRRRRRRRRRRRRRRRRRR');
        const user = await User.findOne({ email: credentials.email });
        console.log('user',user);
        if(!user || !user?.password) {
          throw new Error("Invalid email or password");
        }

        const isMatch = await compare(credentials.password, user.password);
        if(!isMatch){
          throw new Error("Invalid email or password");
        }

        return user;
      }
    })
  ],

  secret: process.env.NEXTAUTH_SECRET,
  
  callbacks:{
    async session({session}){
      const mongodbUser = await User.findOne({email: session.user.email })
      console.log('mongodbUser :>> ', mongodbUser);
      session.user = {...session.user, ...mongodbUser._doc}
      console.log('session :>> ', session);
      return "lllllllllllllllllllllll";
    }
  }
});

export {handler as GET, handler as POST};