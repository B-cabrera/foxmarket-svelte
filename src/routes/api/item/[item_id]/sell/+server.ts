import prisma from "$lib/utils/prismaClient";
import { json, type RequestHandler } from "@sveltejs/kit";

export const PATCH: RequestHandler = async ({ request }) => {
	const data = await request.json();

	// mark the item as sold here
	console.log({ data });

	return json({});
};

