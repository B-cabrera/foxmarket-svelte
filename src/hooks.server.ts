/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-unresolved */

import type { Handle } from '@sveltejs/kit';
import supabaseClient from '$lib/utils/supabaseClient';

export const handle: Handle = async ({ event, resolve }) => {
	const accessToken = event.cookies.get('access');
	const refreshToken = event.cookies.get('refresh');

	try {
		// check if is user is authorized
		if (refreshToken && accessToken) {
			await supabaseClient.auth.setSession({
				access_token: accessToken,
				refresh_token: refreshToken,
			});
		} else {
			// user is not authorized
			event.locals.error = { status: 400, message: 'User is not authorized' };

			const response = await resolve(event);
			return response;
		}

		const { error, data } = await supabaseClient.auth.getSession();

		if (error) {
			console.error(error);

			event.locals.error = { status: 500, message: 'Error getting user' };

			const response = await resolve(event);
			return response;
		}

		// User is authorized
		event.locals.data = { loggedIn: true, userID: data.session?.user.id };

		const response = await resolve(event);
		return response;
	} catch (error) {
		const err = error as Error;

		event.locals.error = { status: 500, message: err.message };

		const response = await resolve(event);
		return response;
	}
};
