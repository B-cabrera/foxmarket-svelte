/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */

import { fail, json, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/utils/prismaClient';
import Dorms from '$lib/utils/Dorms';

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

export const PATCH: RequestHandler = async ({ params, request }) => {
	const itemID = params.item_id;
	let data = await request.json();

	// hacky way to rename "title" prop to "listingTitle"
	if (data.title) {
		const { title } = data;

		delete data.title;

		data = { ...data, listingTitle: title };
	}

	// hacky way to transform location string to enum
	if (data.location) {
		const { location } = data;

		data.location = Object.keys(Dorms)[Object.values(Dorms).indexOf(location)];
	}

	try {
		await prisma.listing.update({
			where: {
				id: itemID,
			},
			data,
		});

		return json({ message: 'Listing Updated Successfully' });
	} catch (error) {
		throw fail(500, { message: (error as Error).message });
	}
};
