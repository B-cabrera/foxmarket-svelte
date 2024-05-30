/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { z } from 'zod';
import Dorms from '$lib/utils/Dorms';
import Sizes from '$lib/utils/Sizes';
import prisma from '$lib/utils/prismaClient';

const updatelistingSchema = z
	.object({
		title: z.string().min(1).max(30),
		description: z.string().min(1).max(100),
		price: z.number().positive(),
		location: z.nativeEnum(Dorms),
		brand: z.string().min(1).max(30),
		image: z.instanceof(File),
		size: z.nativeEnum(Sizes),
	})
	.partial();

type listingUpdate = z.infer<typeof updatelistingSchema>;

type ValidationSuccess = {
	success: true;
};
type ValidationFailure = {
	success: false;
	errors: string[];
};
type ValidationResponse = ValidationSuccess | ValidationFailure;

export async function validateListingUpdate(listingUpdate: listingUpdate): Promise<ValidationResponse> {
	const result = updatelistingSchema.safeParse(listingUpdate);

	if (result.success) {
		if (listingUpdate.brand) {
			const result = await prisma.brand.findFirst({
				where: {
					brandName: listingUpdate.brand
				}
			});

			if (!result) return { success: false, errors: ["Unrecognized Brand"] }
		}

		return { success: true };
	}

	// list of errors
	const errors: string[] = [];

	result.error.issues.forEach((issue) => errors.push(issue.message));

	return { success: false, errors };
}
