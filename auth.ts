import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@/lib/db';
import { authConfig } from '@/auth.config';
import { getUserById } from '@/lib/queries/user';
import { getAccountByUserId } from './lib/queries/account';

const authOptions = NextAuth({
    adapter: PrismaAdapter(db),
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
                session.user.name = token.name;
                session.user.username = token.username;
                session.user.image = token.image;
                session.user.emailVerified = token.emailVerified;
                session.user.bio = token.bio;
                session.user.type = token.type;
            }

            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;

            const user = await getUserById(token.sub);

            if (!user) return token;
            
            const account = await getAccountByUserId(user.id);

            if (user.email && !user.username) {
                await db.user.update({
                    where: { id: user.id },
                    data: {
                        username: user.email.split("@")[0].toLowerCase(),
                    }
                });
            }

            token.name = user.name;
            token.username = user.username!;
            token.image = user.image;
            token.emailVerified = user.emailVerified!;
            token.bio = user.bio;

            if (account) {
                token.type = account.type;
            }

            return token;
        },
    },
    session: { strategy: "jwt" },
    trustHost: true,
    ...authConfig,
});

export const { auth, handlers: { GET, POST }, signIn, signOut } = authOptions;