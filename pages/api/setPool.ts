import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  if (req.method === 'POST') {
    try {
      createPool(req.body);
      return res.status(200).json({ message: 'Action is saved', status: 200 });
    } catch (error) {
      return res.status(500).json({ message: error, status: 500 });
    }
  }
}

async function createPool(data: any) {
  try {
    await addPool(data);
    // else if (data.action === 'swap') {
    //   await swapHistory(data);
    // }

  } catch (error) {
    console.error(error);
  }
}


async function addPool(data: any) {
  await prisma.$transaction([
    prisma.pool.upsert({
      where: {
        locationBlockchain_locationApp_locationType_tokenA_tokenB_authorId: {
          authorId: 'clipva66i00005i10u8a8aegi',
          locationBlockchain: 'ethereum',
          locationApp: 'curve',
          locationType: 'centralised',
          tokenA: 'bitcoin',
          tokenB: 'ethereum',
        },
      },
      update: {
        amountA: {
          increment: 0,
        },
        amountB: {
          increment: 0,
        }
      },
      create: {
        authorId: 'clipva66i00005i10u8a8aegi',
        tokenA: 'bitcoin',
        amountA: 1,
        priceA: 25000,
        tokenB: 'ethereum',
        amountB: 18,
        priceB: 1388.89,
        locationBlockchain: 'ethereum',
        locationApp: 'curve',
        locationType: 'centralised',
      },
    }),
  ]);
}

async function swapHistory(data: any) {
  await prisma.$transaction([
    prisma.history.create({
      data: {
        authorId: data.authorId,
        action: data.action,
        tokenFrom: data.from.token,
        amountFrom: data.from.amount,
        locationBlockchainFrom: data.from.locationBlockchain,
        locationAppFrom: data.from.locationApp,
        locationTypeFrom: data.from.locationType,
        tokenTo: data.to.token,
        amountTo: data.to.amount,
        locationBlockchainTo: data.to.locationBlockchain,
        locationAppTo: data.to.locationApp,
        locationTypeTo: data.to.locationType,
        processAt: new Date(),
      }
    }),
    prisma.token.update({
      where: {
        locationBlockchain_locationApp_locationType_token_authorId: {
          authorId: data.authorId,
          locationBlockchain: data.from.locationBlockchain,
          locationApp: data.from.locationApp,
          locationType: data.from.locationType,
          token: data.from.token,
        },
      },
      data: {
        amount: {
          decrement: data.from.amount,
        }
      },
    }),
    prisma.token.upsert({
      where: {
        locationBlockchain_locationApp_locationType_token_authorId: {
          authorId: data.authorId,
          locationBlockchain: data.to.locationBlockchain,
          locationApp: data.to.locationApp,
          locationType: data.to.locationType,
          token: data.to.token,
        },
      },
      update: {
        amount: {
          increment: data.to.amount,
        }
      },
      create: {
        authorId: data.authorId,
        amount: data.to.amount,
        token: data.to.token,
        locationBlockchain: data.to.locationBlockchain,
        locationApp: data.to.locationApp,
        locationType: data.to.locationType,
      },
    }),
  ]);
}