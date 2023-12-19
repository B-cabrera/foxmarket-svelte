/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */

import { json, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/utils/prismaClient';

export const GET: RequestHandler = async ({ params }) => {
	const userID = params.user_id;

	// get the users username
	const userInformation = await prisma.user.findUnique({
		where: {
			id: userID,
		},
		select: {
			username: true,
			listings: {
				where: {
					sold: true,
				},
				select: {
					id: true,
				},
			},
		},
	});

	return json({
		username: userInformation?.username,
		itemsSold: userInformation?.listings.length,
	});
};
