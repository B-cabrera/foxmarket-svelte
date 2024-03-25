/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

import type { Chat } from '@prisma/client';
import type { PageServerLoad } from './$types';

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

	return {
		buyingChats: buyingChats as ChatInformation[],
		sellingChats: sellingChats as ChatInformation[],
	};
};
