/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */

import { json, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/utils/prismaClient';

export const GET: RequestHandler = async ({ locals }) => {
	const allListings = await prisma.listing.findMany({
		where: { sold: false },
		include: {
			favoritedBy: true,
		},
	});

	const listingsWithFavBool = allListings.map((listing) => {
		const isFavoritedByCurrentUser = listing.favoritedBy.some(
			(favorite) => favorite.userId.toString() === locals.data?.userID,
		);

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { favoritedBy, ...restOfListing } = listing;

		return { ...restOfListing, isFavoritedByCurrentUser };
	});

	return json({ listings: listingsWithFavBool });
};
