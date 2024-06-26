/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */

import { json, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/utils/prismaClient';
import type { Prisma } from '@prisma/client';
import { _fuzzySearch } from '../brands/+server';

function generatePrismaFilterObjsFromFilters(params: URLSearchParams) {
	let filterObjs: Prisma.ListingWhereInput[] = [];
	let keyList = Array.from(params.keys());
	let addedKeys: string[] = [];

	keyList.forEach((key) => {
		if (addedKeys.includes(key) || key == 'search') return;

		addedKeys.push(key);
		const input: Prisma.ListingWhereInput = key == 'price' ? { AND: [] } : { OR: [] };
		const inputList = input.AND! as Prisma.ListingWhereInput[] ?? input.OR!;

		params.getAll(key).forEach((value) => {
			const keyAsValidIndex = key as 'location' | 'price' | 'brand' | 'size';
			const entry: Prisma.ListingWhereInput = {};

			if (keyAsValidIndex == 'price') {
				const operation = value.split('e');
				const comparisonObj: Prisma.DecimalFilter = operation[0] == 'gt' ? { gte: operation[1] } : { lte: operation[1] };

				entry[keyAsValidIndex] = comparisonObj;
			} else {
				entry[keyAsValidIndex] = value;
			}

			inputList.push(entry);
		});

		filterObjs.push(input);
	});

	return filterObjs;
}

function generateFuzzySearchQueryFromSearch(params: URLSearchParams) {
	let filterObjs: Prisma.ListingWhereInput = { OR: [] };

	if (params.has('search')) {
		const searchTerm = params.get('search')!;

		filterObjs.OR?.push(_fuzzySearch('listingTitle', searchTerm)!);
		filterObjs.OR?.push(_fuzzySearch('description', searchTerm)!);
		filterObjs.OR?.push(_fuzzySearch('brand', searchTerm)!);
	}


	return filterObjs;
}

export const GET: RequestHandler = async ({ locals, url }) => {
	const filterObjs = generatePrismaFilterObjsFromFilters(url.searchParams);
	const searchObj = generateFuzzySearchQueryFromSearch(url.searchParams);

	const allListings = await prisma.listing.findMany({
		where: {
			AND: [{ sold: false },
			...filterObjs,
				searchObj
			],
		},
		include: {
			favoritedBy: true,
		},
	});

	const listingsWithFavBool = allListings.map((listing) => {
		const isFavoritedByCurrentUser = listing.favoritedBy.some(
			(favorite) => favorite.userId.toString() === locals.data?.userID,
		);

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { favoritedBy, ...restOfListing } = listing;

		return { ...restOfListing, isFavoritedByCurrentUser };
	});

	return json({ listings: listingsWithFavBool });
};
