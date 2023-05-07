import NextAuth, { Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import prisma from '../../../lib/prisma';

export default NextAuth({
    session: {
        strategy: 'jwt',
    },
    secret: process.env.AUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials?.email,
                    },
                });
                const passwordValid = await bcrypt.compare(
                    credentials?.password ? credentials.password : '',
                    user?.password ? user.password : '',
                );

                if (!user || !passwordValid) {
                    throw new Error('Error in pasword or email');
                }
                return user;
            },
        }),
    ],
    callbacks: {
        async session(session: any) {
            const sessionReturn = {
                expires: session.session.expires,
                user: { ...session.session.user, id: session.token.sub },
            };
            return Promise.resolve(sessionReturn);
        },
    },
});
