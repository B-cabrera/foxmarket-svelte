import prisma from "$lib/utils/prismaClient";
import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request, params, locals }) => {
	const { user_id } = params;
	const { rating, transactionID } = await request.json();

	try {
		await prisma.rating.create({
			data: {
				raterId: locals.data!.userID!,
				ratedId: user_id!,
				rating
			}
		});

		// this might be bad but idk.... will change later if it is an inefficiency
		const transaction = await prisma.transaction.findFirst({
			where: {
				id: parseInt(transactionID)
			}
		});
		const isBuyer = transaction!.buyerId == user_id;
		const updateField = isBuyer ? { hasSellerRated: true } : { hasBuyerRated: true };

		await prisma.transaction.update({
			where: {
				id: parseInt(transactionID)
			},
			data: {
				...updateField
			}
		});

		return json({ message: 'User rated succesfully' });
	} catch (error) {
		const cleanError = error as Error;
		console.log(cleanError);

		return new Response(JSON.stringify({ message: cleanError.message }), { status: 500 })
	}

};
