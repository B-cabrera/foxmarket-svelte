/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */

import type { Listing } from '@prisma/client';
import type { PageServerLoad } from './$types';
import prisma from '$lib/utils/prismaClient';

export const load: PageServerLoad = async ({ fetch, params }) => {
	interface ListingWithFavoriteBool extends Listing {
		isFavoritedByCurrentUser?: string;
	}
	const itemID = params.id;

	// get the listing info
	const itemData = await fetch(`/api/item/${itemID}`);
	const { item } = await itemData.json();

	// get the sellers information
	const sellerInfo = await fetch(`/api/users/${item.sellerId}`);
	const { username, itemsSold } = await sellerInfo.json();

	// check if conversation exists already
	const chatResult = await prisma.chat.findFirst({
		where: {
			itemId: item.id,
			buyerId: item.buyerId,
			sellerId: item.sellerId
		}
	});

	return {
		theItem: item as ListingWithFavoriteBool,
		sellerUsername: username as string,
		sellerItemsSold: itemsSold as number,
		hasChat: chatResult != null
	};
};
