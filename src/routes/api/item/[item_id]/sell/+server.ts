import prisma from "$lib/utils/prismaClient";
import { json, type RequestHandler } from "@sveltejs/kit";

export const PATCH: RequestHandler = async ({ request, params, locals }) => {
	// will use the buyer information in ratings, not rn though 
	const data = await request.json();
	const { item_id } = params;

	try {
		await prisma.listing.update({
			where: {
				id: item_id
			},
			data: {
				sold: true
			}
		});

		const transaction = await prisma.transaction.create({
			data: {
				sellerId: locals.data!.userID!,
				buyerId: data.buyerID,
				itemId: item_id!,
				time: new Date(Date.now())
			}
		})

		return json({ message: "Item marked as sold", transactionID: transaction.id });
	} catch (error) {
		const cleanError = error as Error;

		return new Response(JSON.stringify({ message: cleanError.message }), { status: 500 })
	}

};

