/* eslint-disable import/prefer-default-export */
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => ({
	userID: locals.data?.userID,
});
