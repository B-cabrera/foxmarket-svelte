/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */

import type { Listing } from '@prisma/client';
import type { PageServerLoad } from './$types';
import prisma from '$lib/utils/prismaClient';

export const load: PageServerLoad = async ({ locals, fetch }) => {
	const username = locals.data!.username!;
	const userID = locals.data!.userID!;

	const ratingInfo = await fetch(`/api/users/${userID}/rating`);
	const { rating } = await ratingInfo.json();


	const data = await fetch(`/api/items/${userID}`);
	const { listings } = await data.json();

	// one time thing ig, i dont need a route for unrated transaction
	const unratedTransactions = await prisma.transaction.findMany({
		where: {
			OR: [
				{
					AND: [
						{ sellerId: userID },
						{ hasSellerRated: false }
					]
				},
				{
					AND: [
						{ buyerId: userID },
						{ hasBuyerRated: false }
					]
				}
			],
		},
		include: {
			buyer: true,
			seller: true
		}
	});

	return {
		username,
		userID,
		rating: rating as number | null,
		listings: listings as Listing[],
		unratedTransactions
	}
};
