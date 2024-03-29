/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */

import type { Listing } from '@prisma/client';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const data = await fetch('/api/items');
	const { listings } = await data.json();

	return {
		listings: listings as Listing[],
	};
};

export const actions = {
	favorite: async ({ request, locals, fetch }) => {
		const data = await request.formData();
		const listingToFavorite = data.get('listing_id') as string;
		const favoritingUser = locals.data?.userID!;

		const response = await fetch('/api/favorite', {
			method: 'POST',
			body: JSON.stringify({
				listingID: listingToFavorite,
				favoritingUser,
			}),
		});

		if (response.ok) {
			throw redirect(302, '/feed');
		}

		return fail(response.status, { errors: [(await response.json()).message] });
	},

	unfavorite: async ({ request, locals, fetch }) => {
		const data = await request.formData();
		const listingToFavorite = data.get('listing_id') as string;
		const favoritingUser = locals.data?.userID!;

		const response = await fetch('/api/favorite', {
			method: 'DELETE',
			body: JSON.stringify({
				listingID: listingToFavorite,
				favoritingUser,
			}),
		});

		if (response.ok) {
			throw redirect(302, '/feed');
		}

		return fail(response.status, { errors: [(await response.json()).message] });
	},
} satisfies Actions;
