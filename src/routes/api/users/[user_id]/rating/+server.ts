import { json, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/utils/prismaClient';

export const GET: RequestHandler = async ({ params }) => {
	const { user_id } = params;

	const rating = await prisma.rating.aggregate({
		where: {
			ratedId: user_id
		},
		_avg: {
			rating: true
		}
	});

	return json({ rating: rating._avg.rating });
};
