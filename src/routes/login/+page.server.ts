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
			return fail(400, { error: true });
		}

		// send login request here!!!

		throw redirect(302, '/feed');
	},
};
