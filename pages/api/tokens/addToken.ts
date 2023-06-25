import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  if (req.method === 'POST') {
    try {
      createHistory(req.body);
      return res.status(200).json({ message: 'Action is saved', status: 200 });
    } catch (error) {
      return res.status(500).json({ message: error, status: 500 });
    }
  }
}

async function createHistory(data: any) {
  try {
    if (data.action === 'add') {
      await addHistory(data);
    } else if (data.action === 'swap') {
      await swapHistory(data);
    }

  } catch (error) {
    console.error(error);
  }
}


async function addHistory(data: any) {
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