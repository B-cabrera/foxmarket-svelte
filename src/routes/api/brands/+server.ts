/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */

import prisma from "$lib/utils/prismaClient";
import { fail, json, type RequestHandler } from "@sveltejs/kit";
/**
 *
 * Transforms a plain search string into fuzzy search where filters using matching operators
 * credits to https://github.com/prisma/prisma/issues/7986#issuecomment-2052000609, this is where I got the function from
 */
export const fuzzySearch = (field: string, search?: string) => {
	if (!search || !search.length) return undefined;

	// Trim spaces and split into an array of words
	const words = search.replace(/\s+/g, ' ').trim().split(' ');

	/**
	 * Use the % operator to wrap the first and last words
	 * More info: https://www.prisma.io/docs/orm/prisma-client/queries/filtering-and-sorting#how-does-filtering-work-at-the-database-level
	 */
	const startsWith = `%${words[0]}%`;
	const endsWith = words.length > 1 ? `%${words[words.length - 1]}%` : undefined;

	/**
	 * Use the <-> operator in the middle words, this ensures that the words are somewhere in the searched string also checking the words order
	 * More info: https://www.prisma.io/docs/orm/prisma-client/queries/full-text-search#querying-the-database
	 */
	const middleWords = words.filter((_, i) => i !== 0 && i !== words.length - 1).join(' <-> ');

	const filters = {
		AND: [
			{
				[field]: middleWords.length
					? {
						search: middleWords,
					}
					: {},
			},
			{
				[field]: startsWith.length
					? {
						startsWith,
						mode: 'insensitive',
					}
					: {},
			},
			{
				[field]: endsWith?.length
					? {
						endsWith,
						mode: 'insensitive',
					}
					: {},
			},
		],
	};

	return filters;
};

export const GET: RequestHandler = async ({ url }) => {
	const search = url.searchParams.get('search');

	if (!search) throw fail(400, { message: 'Search term not provided' });

	try {
		const results = await prisma.brand.findMany({
			where: {
				...fuzzySearch('brandName', search)
			},
			take: 7
		});

		return json({ results });
	} catch (error) {
		const cleanError = error as Error;

		throw fail(500, { message: cleanError.message });
	}


};
