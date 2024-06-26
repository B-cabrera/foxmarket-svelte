/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */

import prisma from "$lib/utils/prismaClient";
import { MESSAGE_CHUNK_AMOUNT } from "$lib/utils/utils";
import { fail, json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ params }) => {
	const conversationId = params.conversation_id;
	const lastMessageId = params.message_id;

	try {
		const messages = await prisma.message.findMany({
			where: {
				conversationId: conversationId,
			},
			orderBy: {
				timeSent: 'asc',
			},
			cursor: {
				id: lastMessageId
			},
			skip: 1,
			take: MESSAGE_CHUNK_AMOUNT,
		});

		return json({ messages });
	} catch (error) {
		const cleanError = error as Error;

		throw fail(500, { message: cleanError.message });
	}
};
