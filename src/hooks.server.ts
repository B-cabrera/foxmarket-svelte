/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-unresolved */

import { redirect, type Handle } from '@sveltejs/kit';
import supabaseClient from '$lib/utils/supabaseClient';
import checkValidRerouteLocation from '$lib/utils/utils';

export const handle: Handle = async ({ event, resolve }) => {
	const accessToken = event.cookies.get('access');
	const refreshToken = event.cookies.get('refresh');
	const shouldRedirect = checkValidRerouteLocation(event.url.pathname);

	// Check for invalid cookies initially
	if (!refreshToken || !accessToken) {
		// user is not authorized

		if (shouldRedirect) throw redirect(303, '/login');

		const response = await resolve(event);
		return response;
	}

	// try setting session (won't work if cookies are invalid)
	const { error } = await supabaseClient.auth.setSession({
		access_token: accessToken,
		refresh_token: refreshToken,
	});

	// on setting session error
	if (error) {
		console.error(error.message);

		if (shouldRedirect) throw redirect(303, '/login');

		const response = await resolve(event);
		return response;
	}

	// retrieving session data to verify user is authed
	const { error: fail, data } = await supabaseClient.auth.getSession();

	if (fail) {
		console.error(fail);

		if (shouldRedirect) throw redirect(303, '/login');

		const response = await resolve(event);
		return response;
	}

	// User is authorized`
	event.locals.data = { userID: data.session?.user.id };

	const response = await resolve(event);
	return response;
};
