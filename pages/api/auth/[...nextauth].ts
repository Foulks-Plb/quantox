import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import prisma from '../../../lib/prisma';

export default NextAuth({
    session: {
        strategy: 'jwt',
    },
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
});