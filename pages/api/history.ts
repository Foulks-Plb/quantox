import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import { getSession } from 'next-auth/react';

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
  const history = await prisma.history.findMany({
    where: {
      authorId: session?.user.id
    },
    orderBy: {
      processAt: 'desc'
    }
  })
  return history
}
