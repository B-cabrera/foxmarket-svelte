/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */

import { error, json, type RequestHandler } from '@sveltejs/kit';
import type { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import prisma from '$lib/utils/prismaClient';

export const POST: RequestHandler = async ({ request }) => {
	const { listingID, favoritingUser } = await request.json();

	try {
		await prisma.favorite.create({
			data: {
				userId: favoritingUser,
				listingId: listingID,
			},
		});
	} catch (err) {
		const typedError = err as PrismaClientKnownRequestError;

		// user has already favorite the post
		if (typedError.code === 'P2002') {
			throw error(409, {
				message: 'User has already favorited this listing.',
			});
		}

		throw error(500, {
			message: typedError.message,
		});
	}

	return json({});
};

export const DELETE: RequestHandler = async ({ request }) => {
	const { listingID, favoritingUser } = await request.json();

	try {
		await prisma.favorite.delete({
			where: {
				userId_listingId: {
					userId: favoritingUser,
					listingId: listingID,
				},
			},
		});
	} catch (err) {
		const typedError = err as PrismaClientKnownRequestError;

		// user hasn't already favorited the post
		if (typedError.code === 'P2025') {
			throw error(409, {
				message: 'Listing has not been previously favorited by user.',
			});
		}

		throw error(500, {
			message: typedError.message,
		});
	}

	return json({});
};
