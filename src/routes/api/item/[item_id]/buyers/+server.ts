import prisma from "$lib/utils/prismaClient";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ params, locals }) => {
	const { item_id } = params;
	const userID = locals.data?.userID;

	try {
		const buyerChats = await prisma.chat.findMany({
			where: {
				itemId: item_id,
				sellerId: userID
			},
			include: {
				buyer: {
					select: {
						id: true,
						username: true
					}
				}
			}
		});
		const buyers = buyerChats.map((buyerChat) => {
			return {
				id: buyerChat.buyer.id,
				username: buyerChat.buyer.username,
			}
		})

		return json({ buyers });
	} catch (error) {
		const cleanError = (error as Error);

		return new Response(JSON.stringify({message: cleanError.message}), {status: 500});
	}
};

