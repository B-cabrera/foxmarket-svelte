/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, fetch }) => {
	const username = locals.data!.username!;
	const userID = locals.data!.userID!;

	const ratingInfo = await fetch(`/api/users/${userID}/rating`);
	const { rating } = await ratingInfo.json();

	return {
		username,
		rating
	}
};
