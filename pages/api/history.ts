import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import { getSession } from 'next-auth/react';
import { IPagination } from '@/utils/types/backend';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any[]>,
) {
  if (req.method === 'GET') {
    getHistory(req).then((data: any) => {
      res.status(200).json(data);
    })
  }
}

async function getHistory(req: NextApiRequest) {
  const session = await getSession({ req })
  const pagination: IPagination = {
    take: Number(req.query.take),
    skip: Number(req.query.skip),
  };

  const get = await prisma.$transaction([
    prisma.history.count({
      where: {
        authorId: session?.user.id
      },
    }),
    prisma.history.findMany({
      take: pagination.take,
      skip: (pagination.skip - 1) * pagination.take,
      where: {
        authorId: session?.user.id
      },
      orderBy: {
        processAt: 'desc'
      }
    })
  ])
  const history: IPagination = { count: get[0], take: pagination.take, skip: pagination.skip, data: get[1] };
  return history
}
