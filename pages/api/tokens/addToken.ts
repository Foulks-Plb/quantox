import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  if (req.method === 'POST') {
    try {
      try {
        if (req.body.action === 'add') {
          if (req.body.isReward) {
            await addReward(req.body);
          } else {
            await addToken(req.body);
          }
        } else if (req.body.action === 'swap') {
          await swapToken(req.body);
        }
      } catch (error) {
        return res.status(500).json({ message: error, status: 500 });
      }
      return res.status(200).json({ message: 'Action is saved', status: 200 });
    } catch (error) {
      return res.status(500).json({ message: error, status: 500 });
    }
  }
}

async function addToken(data: any) {
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

async function addReward(data: any) {
  await prisma.$transaction([
    prisma.history.create({
      data: {
        authorId: data.authorId,
        action: 'reward',
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
    prisma.reward.upsert({
      where: {
        token_authorId_tokenId: {
          authorId: data.authorId,
          token: data.to.token,
          tokenId: data.tokenSource.id,
        },
      },
      update: {
        amount: {
          increment: data.to.amount,
        }
      },
      create: {
        authorId: data.authorId,
        tokenId: data.tokenSource.id,
        token: data.to.token,
        amount: data.to.amount,
      },
    }),
  ]);
}

async function swapToken(data: any) {
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