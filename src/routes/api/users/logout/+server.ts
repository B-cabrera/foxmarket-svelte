/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */

import { error as failure, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import supabaseClient from '$lib/utils/supabaseClient';

export const POST: RequestHandler = async ({ cookies }) => {
	// log user out with supabase
	const { error } = await supabaseClient.auth.signOut();

	if (error) {
		throw failure(500, {
			message: 'Error logging user out',
		});
	}

	cookies.set('access', '', {
		secure: true,
		httpOnly: true,
		path: '/',
		expires: new Date(0),
	});

	cookies.set('refresh', '', {
		secure: true,
		httpOnly: true,
		path: '/',
		expires: new Date(0),
	});

	return json({ message: 'User successfully logged out' });
};
