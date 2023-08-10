import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import { getSession } from 'next-auth/react';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any[]>,
) {
  if (req.method === 'GET') {
    getRewards(req).then((data: any) => {
      res.status(200).json(data);
    })
  }
}

async function getRewards(req: NextApiRequest) {
  const session = await getSession({ req })

  const rewards = await prisma.reward.findMany({
    where: {
      authorId: session?.user.id,
    },
  });
  return rewards
}
