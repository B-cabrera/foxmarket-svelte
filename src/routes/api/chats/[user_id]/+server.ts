/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */

import { json } from '@sveltejs/kit';
import prisma from '$lib/utils/prismaClient';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
  const userID = params.user_id;

  const buyingChats = await prisma.chat.findMany({
    where: {
      buyerId: userID,
    },
    include: {
      Message: {
        orderBy: {
          timeSent: 'asc',
        },
      },
      seller: {
        select: {
          username: true,
        },
      },
      item: {
        select: {
          listingTitle: true,
          imageUrl: true,
        },
      },
    },
  });

  const sellingChats = await prisma.chat.findMany({
    where: {
      sellerId: userID,
    },
    include: {
      Message: {
        orderBy: {
          timeSent: 'asc',
        },
      },
      buyer: {
        select: {
          username: true,
        },
      },
      item: {
        select: {
          listingTitle: true,
          imageUrl: true,
        },
      },
    },
  });

  return json({ buyingChats, sellingChats });
};
