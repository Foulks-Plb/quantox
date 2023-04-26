import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import { authorId } from '@/utils/constant';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any[]>,
) {
  if (req.method === 'POST') {
    createHistory(req.body)
  }
}

async function createHistory(data: any) {
  try {
    await prisma.$transaction([
      prisma.history.create({
        data: data
      }),
      prisma.token.upsert({
        where: {
          locationBlockchain_locationApp_locationType_token_authorId: {
            authorId: authorId,
            locationBlockchain: data.locationBlockchain,
            locationApp: data.locationApp,
            locationType: data.locationType,
            token: data.token,
          },
        },
        update: {
          amount: {
            increment: data.amount,
          }
        },
        create: {
          authorId: authorId,
          amount: data.amount,
          token: data.token,
          locationBlockchain: data.locationBlockchain,
          locationApp: data.locationApp,
          locationType: data.locationType,
        },
      }),
    ]);
  } catch (error) {
    console.error(error);
  }
}
