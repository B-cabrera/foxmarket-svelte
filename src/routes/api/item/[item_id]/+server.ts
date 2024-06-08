/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */

import { fail, json, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/utils/prismaClient';
import Dorms from '$lib/utils/Dorms';
import { validateListingUpdate } from '$lib/validation/listingUpdateSchema';

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
	let validationResult = await validateListingUpdate(data);

	if (!validationResult.success) throw fail(400, { issues: validationResult.errors });

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
		const currentItemInfo = await prisma.listing.findFirst({
			where: {
				id: itemID
			}
		});

		if (currentItemInfo?.sold) return new Response(JSON.stringify({ message: 'Item is sold.' }), { status: 409 });

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
