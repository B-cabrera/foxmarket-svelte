/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */

import { json, error as failure } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import supabaseClient from '$lib/utils/supabaseClient';

export const POST: RequestHandler = async ({ request, cookies }) => {
	// getting user info from request
	const info = await request.json();
	const { username, email, password } = info;

	// user registration with supabase client
	const { data, error } = await supabaseClient.auth.signUp({
		email,
		password,
		options: {
			data: {
				username,
			},
		},
	});

	// on signup success
	if (data.user) {
		// add the set cookie headers
		cookies.set('access', data.session!.access_token, {
			secure: true,
			httpOnly: true,
			path: '/',
		});

		cookies.set('refresh', data.session!.refresh_token, {
			secure: true,
			httpOnly: true,
			path: '/',
		});
	}

	// on signup failure
	if (error) {
		// duplicate user errors
		if (error.message.includes('duplicate') || error.message.includes('already')) {
			throw failure(400, 'User already exists');
		}

		// all other errors (not final)
		// TODO: handle other errors
		throw failure(500, error.message);
	}

	return json({ username });
};
