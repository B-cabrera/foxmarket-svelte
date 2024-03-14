/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */

import { fail, redirect } from '@sveltejs/kit';
import validateLogInInfo from '$lib/validation/logInSchema';

export const actions = {
	default: async (event) => {
		const { request } = event;

		const data = await request.formData();
		const email = data.get('email') as string;
		const password = data.get('password') as string;

		const result = validateLogInInfo({
			email,
			password,
		});

		// validation failed
		if (!result) {
			return fail(400, { error: true, email });
		}

		// send the login up request
		const response = await event.fetch('/api/users/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		});

		// send to _ on login success (not final)
		if (response.ok) {
			// TODO: redirect to feed or profile page
			throw redirect(302, '/feed');
		}

		return fail(400, { error: true, email });
	},
};
