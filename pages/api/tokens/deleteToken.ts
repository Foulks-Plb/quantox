import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { IToken } from '@/utils/types/wallet';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {
    const token: any = req.body.params;
    try {
        await deleteToken(token);
        return res.status(200).json({ message: 'Token has been deleted', status: 200 });
    } catch (error) {
        return res.status(500).json({ message: error, status: 500 });
    }
}

async function deleteToken(token: IToken) {
    await prisma.$transaction([
        prisma.history.create({
            data: {
                authorId: token.authorId,
                action: 'delete token',
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
