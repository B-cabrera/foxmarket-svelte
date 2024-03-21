/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */

import type { Listing } from '@prisma/client';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { validateNewListing } from '$lib/validation/newListingSchema';
import Dorms from '$lib/utils/Dorms';
import type Sizes from '$lib/utils/Sizes';

export const load: PageServerLoad = async ({ fetch, locals }) => {
	// get all the listings that belong to this user
	const data = await fetch(`/api/items/${locals.data?.userID}`);
	const { listings } = await data.json();

	return {
		listings: listings as Listing[],
	};
};

export const actions = {
	default: async (event) => {
		const { request, fetch } = event;
		const data = await request.formData();

		const title = data.get('title') as string;
		const description = data.get('description') as string;
		const price = parseInt(data.get('price') as string, 10);
		const brand = data.get('brand') as string;
		const size = data.get('size') as Sizes;
		const locationString = data.get('location') as string;
		const location = Object.values(Dorms)[
			Object.keys(Dorms).indexOf(locationString as unknown as Dorms)
		] as Dorms;

		const image = data.get('file') as File;

		const result = validateNewListing({
			title,
			description,
			price,
			brand,
			size,
			location,
			image,
		});

		// on validation failure
		if (!result.success) {
			return fail(400, { errors: result.errors });
		}

		const listingInfo = new FormData();
		listingInfo.append('file', image);
		listingInfo.append(
			'json',
			JSON.stringify({
				title,
				description,
				price,
				brand,
				size,
				location: locationString,
			}),
		);

		const response = await fetch('/api/item', {
			method: 'POST',
			body: listingInfo,
		});

		if (response.ok) {
			throw redirect(302, '/items');
		}

		return fail(400, { errors: [(await response.json()).message] });
	},
} satisfies Actions;
