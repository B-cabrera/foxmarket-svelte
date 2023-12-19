/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */

import type { Listing } from '@prisma/client';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
	const itemID = params.id;

	// get the listing info
	const data = await fetch(`/api/item/${itemID}`);
	const { item } = await data.json();

	return {
		theItem: item as Listing,
	};
};
