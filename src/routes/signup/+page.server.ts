/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { validateSignUpInfo } from '$lib/validation/signUpSchema';

// eslint-disable-next-line import/prefer-default-export
export const actions = {
	default: async (event) => {
		const { request } = event;
		const data = await request.formData();

		// get user info from form
		const username = data.get('username') as string;
		const email = data.get('email') as string;
		const password = data.get('password') as string;
		const confirmPassword = data.get('password2') as string;

		// validate user input to ensure proper information
		const result = validateSignUpInfo({
			username,
			email,
			password,
			confirmPassword,
		});

		// on validation failure
		if (!result.success) {
			return fail(400, { errors: result.errors });
		}

		// send the sign up request
		const response = await event.fetch('/api/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username,
				email,
				password,
			}),
		});

		// send to _ on registration success (not final)
		if (response.ok) {
			// TODO: redirect to feed or profile page
			throw redirect(302, '/');
		}

		// on registration failure
		return fail(400, { errors: [(await response.json()).message] });
	},
} satisfies Actions;
