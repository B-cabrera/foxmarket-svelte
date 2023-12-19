/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */

import type { Listing } from '@prisma/client';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
	const itemID = params.id;

	// get the listing info
	const itemData = await fetch(`/api/item/${itemID}`);
	const { item } = await itemData.json();

	// get the sellers information
	const sellerInfo = await fetch(`/api/users/${item.sellerId}`);
	const { username, itemsSold } = await sellerInfo.json();

	return {
		theItem: item as Listing,
		sellerUsername: username as string,
		sellerItemsSold: itemsSold as number,
	};
};
