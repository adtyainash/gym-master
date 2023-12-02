import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from './db';
import { compare } from 'bcrypt';
import axios from 'axios';

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    pages: {
        signIn: "/sign-in"
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    providers: [
      CredentialsProvider({
        name: "Credentials",

        credentials: {
          email: { label: "Email", type: "text", placeholder: "jsmith@gmail.com" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {

            if (!credentials?.email || !credentials?.password) {
                return null;
            }

            const existingUser = await db.user.findUnique ({
                where: {email: credentials?.email}
            })

            if (!existingUser) {
                //console.log("NO USER FOUND")
                return null;
            }

            const passwordMatch = await compare(credentials.password, existingUser.password);
            console.log(passwordMatch)
            if (!passwordMatch) {
                //console.log("PASSWORD NOT MATCHs")
                return null;
            }

           // console.log(existingUser)
            //console.log("Password matched!")
            return {
                id: existingUser.id,
                name: existingUser.name,
                username: existingUser.username,
                email: existingUser.email,
                role: existingUser.role
            }
        }
      })
    ],
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                return {
                    ...token,
                    id: user.id,
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    role: user.role
                }
            }
            return token
        },
        async session ({session, token}) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    name: token.name,
                    username: token.username,
                    email: token.email,
                    role: token.role
                }
            }
        }
    }
}