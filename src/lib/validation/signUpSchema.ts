import { z } from 'zod';

export const USERNAME_MIN = 3;
export const USERNAME_MAX = 15;
export const PASSWORD_MIN = 8;

const errorMessages = {
	// Username Errors
	usernameMinError: { message: `Username should be at least ${USERNAME_MIN} characters` },
	usernameMaxError: { message: `Username should be no longer than ${USERNAME_MAX} characters` },
	usernameWhiteSpaceError: { message: 'Username should contain no spaces' },
	usernameInvalidCharsError: {
		message: 'Username can only contain letters, numbers, and underscores',
	},

	// Email Errors
	notMaristEmailError: { message: 'Email should be a Marist email address.' },

	// Password Errors
	passwordMinError: { message: `Password should be at least ${PASSWORD_MIN} characters` },
	passwordMatchError: { message: "Passwords don't match" },
};

const signUpSchema = z
	.object({
		username: z
			.string()
			.min(USERNAME_MIN, errorMessages.usernameMinError)
			.max(USERNAME_MAX, errorMessages.usernameMaxError)
			.trim()
			.refine(
				(username) => /^[A-Za-z0-9_]+$/.test(username), // only letter, numbers, and underscores
				errorMessages.usernameInvalidCharsError,
			),
		email: z.string().email().endsWith('@marist.edu', errorMessages.notMaristEmailError).trim(),
		password: z.string().min(PASSWORD_MIN, errorMessages.passwordMinError),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, errorMessages.passwordMatchError);

type signUpInfo = z.infer<typeof signUpSchema>;

type ValidationSuccess = {
	success: true;
};
type ValidationFailure = {
	success: false;
	errors: string[];
};
type ValidationResponse = ValidationSuccess | ValidationFailure;

export function validateSignUpInfo(signUpInfo: signUpInfo): ValidationResponse {
	const result = signUpSchema.safeParse(signUpInfo);

	if (result.success) {
		return { success: true };
	}

	// list of errors
	const errors: string[] = [];

	result.error.issues.forEach((issue) => errors.push(issue.message));

	return { success: false, errors };
}
