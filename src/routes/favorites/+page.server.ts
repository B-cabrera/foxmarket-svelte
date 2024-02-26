/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */

import type { Listing } from '@prisma/client';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, locals }) => {
	// get all the listings that were favorited by the user
	const data = await fetch(`/api/favorites/${locals.data?.userID}`);
	const { listings } = await data.json();

	return {
		listings: listings as Listing[],
	};
};
