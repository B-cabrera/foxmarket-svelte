/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */

import type { Listing } from '@prisma/client';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const data = await fetch('/api/items');
	const { listings } = await data.json();

	return {
		listings: listings as Listing[],
	};
};

export const actions = {
	favorite: async ({ request, locals }) => {
		const data = await request.formData();
		const listingToFavorite = data.get('listing_id') as string;
		const favoritingUser = locals.data?.userID!;

		// TODO: call favorite API here
		console.log(listingToFavorite, favoritingUser); // temp, will remove
	},
} satisfies Actions;
