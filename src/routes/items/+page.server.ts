/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */

import type { Listing } from '@prisma/client';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { validateNewListing } from '$lib/validation/newListingSchema';
import type Dorms from '$lib/utils/Dorms';
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
		const { request } = event;
		const data = await request.formData();

		const title = data.get('title') as string;
		const description = data.get('description') as string;
		const price = parseInt(data.get('price') as string, 10);
		const brand = data.get('brand') as string;
		const size = data.get('size') as Sizes;
		const location = data.get('location') as Dorms;
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

		return { success: true };
	},
} satisfies Actions;
