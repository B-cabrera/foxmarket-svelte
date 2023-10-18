/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import validateSignUpInfo from '$lib/validation/signUpSchema';
// eslint-disable-next-line import/prefer-default-export
export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const username = data.get('username') as string;
		const email = data.get('email') as string;
		const password = data.get('password') as string;
		const confirmPassword = data.get('password2') as string;

		const result = validateSignUpInfo({
			username,
			email,
			password,
			confirmPassword,
		});

		if (!result.success) {
			return fail(400, { errors: result.errors });
		}

		return { success: true };

		// TODO: send sign up request
	},
} satisfies Actions;
