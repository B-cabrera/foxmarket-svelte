/* eslint-disable operator-linebreak */
/* eslint-disable import/extensions */
/* eslint-disable object-curly-newline */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */
import { fail } from '@sveltejs/kit';
import type { Dorm } from '@prisma/client';
import type { RequestHandler } from './$types';
import supabaseClient from '$lib/utils/supabaseClient';
import prisma from '$lib/utils/prismaClient';

export const POST: RequestHandler = async ({ request, locals }) => {
	const listingData = await request.formData();
	const { title, description, price, brand, size, location } = JSON.parse(
		listingData.get('json') as string,
	);
	const listingImage = listingData.get('file') as File;
	const imageID = crypto.randomUUID() as string;
	const titleString = title as string;
	const imageTitleTransformation = titleString.split(' ').join('_') + imageID;
	const locationString = location as Dorm;

	// upload image first
	const { data, error } = await supabaseClient.storage
		.from('listings_photos')
		.upload(`${imageTitleTransformation}.${listingImage.type.split('/')[1]}`, listingImage);

	// on image upload success
	if (data) {
		const { data: fileInfo } = supabaseClient.storage
			.from('listings_photos')
			.getPublicUrl(data.path);

		await prisma.listing.create({
			data: {
				listingTitle: title,
				description,
				price,
				brand,
				size,
				location: locationString as Dorm,
				imageUrl: fileInfo.publicUrl,
				// eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
				sellerId: locals.data?.userID!,
			},
		});
	}

	// on signup failure
	if (error) {
		throw fail(500, {
			message: error.message,
		});
	}

	return new Response();
};
