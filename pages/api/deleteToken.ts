import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {
    const { id } = req.query;
    if (req.method === 'DELETE') {
        try {
            await deleteToken(id as string);
            res.status(200).json({ message: 'Token has been deleted.' });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
}

async function deleteToken(id: string) {
    await prisma.token.delete({
        where: {
            id
        }
    })
}
