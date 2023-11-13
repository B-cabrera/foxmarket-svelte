/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */

import { json, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/utils/prismaClient';

export const GET: RequestHandler = async () => {
	const allListings = await prisma.listing.findMany({
		where: { sold: false },
	});

	return json({ listings: allListings });
};
