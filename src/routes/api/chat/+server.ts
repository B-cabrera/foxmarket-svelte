/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */

import { fail, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import prisma from '$lib/utils/prismaClient';
import type { MessageWithoutID } from '../../+layout.server';

export const POST: RequestHandler = async ({ request }) => {
	const { buyerId, sellerId, itemId, message } = await request.json();

	try {
		// create the conversation first
		const conversationInfo = await prisma.chat.create({
			data: {
				itemId,
				sellerId,
				buyerId
			},
			select: {
				id: true
			}
		});

		const newMessage: MessageWithoutID = {
			conversationId: conversationInfo.id,
			content: message,
			timeSent: new Date(Date.now()),
			senderId: buyerId,
			receiverId: sellerId,
		};

		// send the starting message
		await prisma.message.create({
			data: newMessage
		})

		return json({});
	} catch (error) {
		const cleanError = error as Error;

		throw fail(500, { message: cleanError.message })
	}
};
