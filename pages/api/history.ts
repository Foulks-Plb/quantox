import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import { authorId } from '@/utils/constant';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any[]>,
) {
  if (req.method === 'GET') {
    getHistory().then((data: any) => {
      res.status(200).json(data);
    })
  }
}

async function getHistory() {
  const history = await prisma.history.findMany({
    where: {
      authorId: authorId
    },
    orderBy: {
      processAt: 'desc'
    }
  })
  return history
}
