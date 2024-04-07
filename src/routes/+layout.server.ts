/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */
import type { Message } from '@prisma/client';
import type { LayoutServerLoad } from './$types';
import supabaseClient from '$lib/utils/supabaseClient';

let isListenerSetup = false;
let currentTimer: NodeJS.Timeout | null = null;
const messageBatch = new Map<string, Message[]>();
const MESSAGE_WAIT_MS = 500;

export interface MessageWithoutID extends Omit<Message, 'id'> {
	id?: string;
}

export const load: LayoutServerLoad = async ({ locals, fetch }) => {
	const userID = locals.data?.userID;

	if (isListenerSetup || userID === undefined) return { userID };

	supabaseClient
		.channel(userID)
		.on('broadcast', { event: 'outMessage' }, async (payload) => {
			const newMessage = payload.payload.newMessage as Message;
			const receiverChannel = supabaseClient.channel(newMessage.receiverId);

			if (currentTimer) {
				clearTimeout(currentTimer);
			}

			if (!messageBatch.has(newMessage.conversationId)) {
				messageBatch.set(newMessage.conversationId, []);
			}

			messageBatch.get(newMessage.conversationId)?.push(newMessage);

			currentTimer = setTimeout(() => {
				receiverChannel.subscribe(async (status) => {
					if (status === 'SUBSCRIBED') {
						const result = await receiverChannel.send({
							type: 'broadcast',
							event: 'inMessage',
							payload: {
								messages: Array.from(messageBatch.entries()),
							},
						});

						if (result !== 'ok') {
							// TODO: HANDLE SEND ERROR HERE
							console.log(result);
						} else {
							// send to server to save
							await fetch('/api/chats', {
								method: 'POST',
								body: JSON.stringify({
									messages: Array.from(messageBatch.entries()),
								}),
							});

							// TODO: handle save error here
						}

						// reset batch after sending
						messageBatch.clear();
						currentTimer = null;
					}
				});
			}, MESSAGE_WAIT_MS);

			// send message to the reciever
		})
		.subscribe();

	isListenerSetup = true;

	return { userID };
};
