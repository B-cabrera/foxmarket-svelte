/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */

import { fail, json } from '@sveltejs/kit';
import prisma from '$lib/utils/prismaClient';
import type { RequestHandler } from './$types';
import type { MessageWithoutID } from '../../../../+layout.server';



export const PATCH: RequestHandler = async ({ request }) => {
	const messagesToBeMarked = (await request.json()) as MessageWithoutID[];

	try {
		for (let i = 0; i < messagesToBeMarked.length; i++) {
			const message = messagesToBeMarked[i];

			await prisma.message.updateMany({
				where: {
					AND: [{ timeSent: message.timeSent }, { content: message.content }],
				},
				data: {
					read: true,
				},
			});
		}

	} catch (error) {
		// handle the query errors here
		const cleanError = error as Error;

		throw fail(500, { message: cleanError.message });
	}

	return json({});
};
