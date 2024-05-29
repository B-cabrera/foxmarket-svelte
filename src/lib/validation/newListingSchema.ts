/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { z } from 'zod';
import Dorms from '$lib/utils/Dorms';
import Sizes from '$lib/utils/Sizes';

const listingSchema = z.object({
	title: z.string().min(1).max(30),
	description: z.string().min(1).max(100),
	price: z.number().positive(),
	location: z.nativeEnum(Dorms),
	brand: z.string().min(1).max(30),
	image: z.instanceof(File),
	size: z.nativeEnum(Sizes),
});

type newListing = z.infer<typeof listingSchema>;

type ValidationSuccess = {
	success: true;
};
type ValidationFailure = {
	success: false;
	errors: string[];
};
type ValidationResponse = ValidationSuccess | ValidationFailure;

export async function validateNewListing(newListing: newListing): Promise<ValidationResponse> {
	const result = listingSchema.safeParse(newListing);

	if (result.success) {
		const response = await fetch(`https://api.brandfetch.io/v2/search/${newListing.brand}`);
		const data = await response.json();
		const typedResponse = data as {name: string}[];
		let foundExactMatch = false;

		typedResponse.forEach((brand) => {
			if (brand.name === newListing.brand) foundExactMatch = true;
		})

		if (!foundExactMatch) return {success: false, errors: ["Unrecognized Brand"]}

		return { success: true };
	}

	// list of errors
	const errors: string[] = [];

	result.error.issues.forEach((issue) => errors.push(issue.message));

	return { success: false, errors };
}
