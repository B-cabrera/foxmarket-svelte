/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */

import { fail, json } from '@sveltejs/kit';
import prisma from '$lib/utils/prismaClient';
import type { RequestHandler } from './$types';
import type { MessageWithoutID } from '../../proxy+layout.server';

export const POST: RequestHandler = async ({ request }) => {
	const conversationAndMessages = (await request.json()).messages as [string, MessageWithoutID[]][];
	const allMessages: MessageWithoutID[] = [];

	// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
	conversationAndMessages.forEach(async ([_, messages]) => {
		for (let message of messages) {
			// basically removing the username field out of the messages
			const newMessage: MessageWithoutID = {
				conversationId: message.conversationId,
				content: message.content,
				timeSent: message.timeSent,
				senderId: message.senderId,
				receiverId: message.receiverId,
			};

			allMessages.push(newMessage);
		}
	});

	try {
		await prisma.message.createMany({
			data: allMessages,
		});

		return json({ message: 'Messages saved successfully' });
	} catch (error) {
		const cleanError = error as Error;
		throw fail(500, { message: cleanError.message });
	}
};
