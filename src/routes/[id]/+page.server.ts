/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */

import type { Listing } from '@prisma/client';
import type { Actions, PageServerLoad } from './$types';
import prisma from '$lib/utils/prismaClient';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch, params, locals }) => {
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

	const buyerInfo = await fetch(`/api/item/${itemID}/buyers`);
	const { buyers } = await buyerInfo.json();

	// check if conversation exists already
	const chatResult = await prisma.chat.findFirst({
		where: {
			itemId: item.id,
			buyerId: locals.data?.userID,
			sellerId: item.sellerId
		}
	});

	return {
		theItem: item as ListingWithFavoriteBool,
		sellerUsername: username as string,
		sellerItemsSold: itemsSold as number,
		hasChat: chatResult != null,
		buyers: buyers as { username: string, id: string }[]
	};
};


export const actions = {
	rate: async (event) => {
		const { request, fetch } = event;
		const data = await request.formData();
		const rating = parseInt(data.get('rating') as string);
		const transactionID = data.get('transaction') as string;
		const buyerID = data.get('buyer') as string;

		const response = await fetch(`/api/users/${buyerID}/rate`, {
			method: 'POST',
			body: JSON.stringify({
				rating,
				transactionID
			})
		});

		if (response.ok) {
			return { success: true }
		}

		return fail(400, { errors: [(await response.json()).message] });
	}
} satisfies Actions;
