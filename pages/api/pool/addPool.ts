import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  if (req.method === 'POST') {
    try {
      addPool(req.body);
      return res.status(200).json({ message: 'Pool is saved', status: 200 });
    } catch (error) {
      return res.status(500).json({ message: error, status: 500 });
    }
  }
}

async function addPool(data: any) {
  await prisma.$transaction([
    prisma.history.create({
      data: {
        authorId: data.authorId,
        action: 'add pool',
        tokenFrom: '',
        amountFrom: 0,
        locationBlockchainFrom: '',
        locationAppFrom: '',
        locationTypeFrom: '',
        tokenTo: data.priceA + '-' + data.priceB,
        amountTo: 0,
        locationBlockchainTo: data.locationBlockchain,
        locationAppTo: data.locationApp,
        locationTypeTo: data.locationType,
        processAt: new Date(),
      }
    }),
    prisma.pool.create({
      data: {
        authorId: data.authorId,
        tokenA: data.tokenA,
        amountA: data.amountA,
        priceA: data.priceA,
        tokenB: data.tokenB,
        amountB: data.amountB,
        priceB: data.priceB,
        locationBlockchain: data.locationBlockchain,
        locationApp: data.locationApp,
        locationType: data.locationType,
      }
    }),
  ]);
}