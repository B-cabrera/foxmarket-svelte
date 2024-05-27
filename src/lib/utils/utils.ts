import type { ChatInformation } from '../../routes/chats/+page.server';

// check if we should reroute based on current path
function checkValidRerouteLocation(currentPath: string) {
	return !['/', '/signup', '/login', '/api/users/login', '/api/users'].includes(currentPath);
}

// check if path is valid to visit when authed
function checkValidAuthedPage(currentPath: string) {
	return ['/', '/signup', '/login'].includes(currentPath);
}

function addChatsToMap(chats: ChatInformation[], chatMap: Map<string, ChatInformation>) {
	chats.forEach((chat) => {
		const conversationId = chat.id;

		chatMap.set(conversationId, chat);
	});
}

const MESSAGE_CHUNK_AMOUNT = -9;

export { checkValidRerouteLocation, checkValidAuthedPage, addChatsToMap, MESSAGE_CHUNK_AMOUNT };
