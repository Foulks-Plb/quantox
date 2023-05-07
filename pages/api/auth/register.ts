import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import bcrypt from 'bcrypt';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<any[]>,
) {
    // register(req.body);
}

async function register(data: any) {
    try {
        await prisma.user.create({
            data: {
                name: 'foulk1',
                email: 'foulk1@ox.com',
                password: await bcrypt.hash('password', 10)
            }
        })
    } catch (error) {
        console.error(error);
    }
}

