// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { getPricesCoingecko } from '@/utils/ts/api-coingecko';
import { Wallet, Token } from '@/utils/types/wallet';
import { fixed2 } from '@/utils/ts/pipe';
import { getServerSession } from 'next-auth';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Wallet>,
) {
  if (req.method === 'GET') {
    let listOfTokens = [];
    getTokens(req).then((data: any[]) => {
      listOfTokens = [...new Set(data.map((token: Token) => token.token))];
      getPrices(listOfTokens).then((prices: any) => {
        let totalWallet = 0;
        const tokens: Token[] = data.map((token: Token) => {
          if (!prices[token.token]) {
            return {
              ...token,
              value: 0,
            };
          } else {
            const price = prices[token.token].usd * token.amount;
            totalWallet += price;
            return {
              ...token,
              value: fixed2(price),
            };
          }
        });
        res.status(200).json({
          total: fixed2(totalWallet),
          tokens: [...tokens],
        });
      });
    });
  }
}

async function getTokens(req: NextApiRequest) {
  const session = await getServerSession(req)
  const tokens = await prisma.token.findMany({
    where: {
      authorId: session?.user.id,
    },
  });
  return tokens;
}

async function getPrices(tokensArray: any[]) {
  if (tokensArray.length === 0) return {};
  return await getPricesCoingecko(tokensArray.join(','));
}
