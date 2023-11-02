/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

import { z } from 'zod';
import { PASSWORD_MIN, USERNAME_MAX, USERNAME_MIN } from './signUpSchema';

const logInSchema = z.object({
	username: z
		.string()
		.min(USERNAME_MIN)
		.max(USERNAME_MAX)
		.trim()
		.refine(
			(username) => /^[A-Za-z0-9_]+$/.test(username), // only letter, numbers, and underscores
		),
	password: z.string().min(PASSWORD_MIN),
});

type logInInfo = z.infer<typeof logInSchema>;

export default function validateLogInInfo(logInInfo: logInInfo): boolean {
	return logInSchema.safeParse(logInInfo).success;
}
