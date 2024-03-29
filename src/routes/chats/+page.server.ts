/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

import type { Chat } from '@prisma/client';
import type { PageServerLoad } from './$types';
import { addChatsToMap } from '$lib/utils/utils';

export interface ChatInformation extends Chat {
	item: {
		listingTitle: string;
		imageUrl: string;
	};
	seller?: {
		username: string;
	};
	buyer?: {
		username: string;
	};
	Message: {
		id: string;
		conversationId: string;
		timeSent: Date;
		senderId: string;
		receiverId: string;
		content: string;
	}[];
}

export const load: PageServerLoad = async ({ fetch, locals }) => {
	const data = await fetch(`/api/chats/${locals.data?.userID}`);
	const { buyingChats, sellingChats } = await data.json();
	const buyingChatMap = new Map<string, ChatInformation>();
	const sellingChatMap = new Map<string, ChatInformation>();

	addChatsToMap(buyingChats, buyingChatMap);
	addChatsToMap(sellingChats, sellingChatMap);

	return {
		buyingChatMap: buyingChatMap as Map<string, ChatInformation>,
		sellingChatMap: sellingChatMap as Map<string, ChatInformation>,
	};
};
