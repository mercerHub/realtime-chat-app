import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcrypt"
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                username: { label: "Email", type: "text" },
                password: {  label: "Password", type: "password" }
            },
            async authorize(credentials: any): Promise<any>{
                await dbConnect();
                try {
                    const user = await UserModel.findOne({
                        $or: [
                            { email: credentials.email },
                            { username: credentials.username }
                        ]
                    })
                    if(!user){
                        throw new Error('No user found');
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

                    if(isPasswordCorrect){
                        return user;
                    } else {
                        throw new Error('Password is incorrect');
                    }
                } catch (error) {
                    throw new Error('Error in authorization');
                }
            }
        }),
    ],
    callbacks:{
        async jwt({token, user}){
            if(user){
                token._id = user._id?.toString();
                token.username = user.username;
            }

            return token;
        },
        async session({session, token}){
            if(token){
                session.user._id = token._id;
                session.user.username = token.username; 
            }
            return session;
        }
    },
    pages: {
        signIn: '/sign-in'
    },
    session: {
        strategy:"jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
}