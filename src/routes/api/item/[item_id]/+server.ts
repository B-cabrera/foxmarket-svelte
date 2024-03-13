/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */

import { json, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/utils/prismaClient';

export const GET: RequestHandler = async ({ params, locals }) => {
	const itemID = params.item_id;

	const item = await prisma.listing.findFirst({
		where: {
			id: itemID,
		},
		include: {
			favoritedBy: true,
		},
	});

	const isFavoritedByCurrentUser = item?.favoritedBy.some(
		(favorite) => favorite.userId.toString() === locals.data?.userID,
	);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { favoritedBy, ...restOfListing } = item!;

	return json({ item: { ...restOfListing, isFavoritedByCurrentUser } });
};
