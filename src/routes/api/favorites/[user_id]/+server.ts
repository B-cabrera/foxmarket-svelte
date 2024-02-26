/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */

import { json, type RequestHandler } from '@sveltejs/kit';
import type { Listing } from '@prisma/client';
import prisma from '$lib/utils/prismaClient';

export const GET: RequestHandler = async ({ params }) => {
	const userID = params.user_id;
	const userListings: Listing[] = [];

	const userFavorites = await prisma.favorite.findMany({
		where: { userId: userID }, // get all items that were favorited by this user
		include: {
			listing: true,
		},
	});

	userFavorites.forEach((favorite) => {
		userListings.push(favorite.listing);
	});

	return json({ listings: userListings });
};
