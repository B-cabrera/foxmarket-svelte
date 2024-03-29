/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */
import type { Message } from '@prisma/client';
import type { LayoutServerLoad } from './$types';
import supabaseClient from '$lib/utils/supabaseClient';

let isListenerSetup = false;

export const load: LayoutServerLoad = async ({ locals }) => {
	const userID = locals.data?.userID;

	if (isListenerSetup || userID === undefined) return { userID };

	supabaseClient
		.channel(userID)
		.on('broadcast', { event: 'outMessage' }, async (payload) => {
			const newMessage = payload.payload.newMessage as Message;
			const receiverChannel = supabaseClient.channel(newMessage.receiverId);

			// send message to the reciever
			receiverChannel.subscribe(async (status) => {
				if (status === 'SUBSCRIBED') {
					const result = await receiverChannel.send({
						type: 'broadcast',
						event: 'inMessage',
						payload: {
							newMessage,
						},
					});

					// HANDLE SEND ERROR HERE
					console.log(result);
				}
			});
		})
		.subscribe();

	isListenerSetup = true;

	return { userID };
};
