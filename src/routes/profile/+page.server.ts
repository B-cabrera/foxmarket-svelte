/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const username = locals.data!.username!;

	return {
		username
	}
};
