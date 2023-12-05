/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */

import { json, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/utils/prismaClient';

export const GET: RequestHandler = async ({ params }) => {
	const userID = params.user_id;

	const userListings = await prisma.listing.findMany({
		where: { sellerId: userID }, // get all items that were sold by this user
	});

	return json({ listings: userListings });
};
