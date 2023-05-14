import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import { Token } from '@/utils/types/wallet';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {
    const token: any = req.body.params;
    try {
        await deleteToken(token);

        res.status(200).json({ message: 'Token has been deleted.' });
    } catch (error) {
        res.status(500).json({ message: error });
    }

}

async function deleteToken(token: Token) {
    await prisma.$transaction([
        prisma.history.create({
            data: {
                authorId: token.authorId,
                action: 'delete',
                tokenFrom: token.token,
                amountFrom: token.amount,
                locationBlockchainFrom: token.locationBlockchain,
                locationAppFrom: token.locationApp,
                locationTypeFrom: token.locationType,
                tokenTo: '',
                amountTo: 0,
                locationBlockchainTo: '',
                locationAppTo: '',
                locationTypeTo: '',
                processAt: new Date(),
            }
        }),
        prisma.token.delete({
            where: {
                id: token.id
            }
        }),
    ]);
}
