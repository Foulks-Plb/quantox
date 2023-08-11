import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import { getSession } from 'next-auth/react';
import { getPrices } from '@/utils/ts/api-coingecko';
import { fixed2 } from '@/utils/ts/pipe';
import { IReward, IWalletReward } from '@/utils/types/wallet';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IWalletReward>,
) {
  if (req.method === 'GET') {
    let listOfRewards = [];
    getRewards(req).then((data: any) => {
      listOfRewards = [...new Set(data.map((token: IReward) => token.token))];
      getPrices(listOfRewards).then((prices: any) => {
        let totalWallet = 0;
        const rewards: IReward[] = data.map((reward: IReward) => {
          if (!prices[reward.token]) {
            return {
              ...reward,
              value: 0,
            };
          } else {
            const price = prices[reward.token].usd * reward.amount;
            totalWallet += price;
            return {
              ...reward,
              value: fixed2(price),
            };
          }
        });
        res.status(200).json({
          total: fixed2(totalWallet),
          rewards: rewards,
        });
      });
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
