import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { IPool } from '@/utils/types/wallet';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {
    const pool: IPool = req.body.params;
    try {
        await deleteToken(pool);
        return res.status(200).json({ message: 'Pool has been deleted', status: 200 });
    } catch (error) {
        return res.status(500).json({ message: error, status: 500 });
    }
}

async function deleteToken(pool: IPool) {
    await prisma.$transaction([
        prisma.pool.delete({
            where: {
                id: pool.id
            }
        }),
    ]);
}
