/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

import { z } from 'zod';
import { PASSWORD_MIN } from './signUpSchema';

const logInSchema = z.object({
	email: z.string().email().endsWith('@marist.edu').trim(),
	password: z.string().min(PASSWORD_MIN),
});

type logInInfo = z.infer<typeof logInSchema>;

export default function validateLogInInfo(logInInfo: logInInfo): boolean {
	return logInSchema.safeParse(logInInfo).success;
}
