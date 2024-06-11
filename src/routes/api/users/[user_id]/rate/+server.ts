import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request, params }) => {
	const { user_id } = params;
	const { rating, transactionID } = await request.json();

	console.log({ rating, transactionID, user_id });

	return json({});
};
