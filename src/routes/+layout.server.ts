/* eslint-disable import/prefer-default-export */
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (locals.error) return { loggedIn: false };

	return { loggedIn: true };
};
