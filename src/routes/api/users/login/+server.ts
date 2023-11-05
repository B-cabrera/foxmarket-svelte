/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */

import { error as failure, json, type RequestHandler } from '@sveltejs/kit';
import supabaseClient from '$lib/utils/supabaseClient';

export const POST: RequestHandler = async ({ request, cookies }) => {
	// getting user info from request
	const info = await request.json();
	const { email, password } = info;

	// user registration with supabase client
	const { data, error } = await supabaseClient.auth.signInWithPassword({
		email,
		password,
	});

	// on login success
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

	// on login failure
	if (error) {
		throw failure(error.status!, 'Invalid credentials');
	}

	return json({ user: data.user?.id });
};
