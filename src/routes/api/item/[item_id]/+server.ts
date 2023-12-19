/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */

import { json, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/utils/prismaClient';

export const GET: RequestHandler = async ({ params }) => {
	const itemID = params.item_id;

	const item = await prisma.listing.findFirst({
		where: {
			id: itemID,
		},
	});

	return json({ item });
};
