/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */

import { createBrowserClient } from '@supabase/ssr';
import type { LayoutLoad } from './$types';
import { PUBLIC_SUPABASE_ANON, PUBLIC_SUPABASE_URL } from '$env/static/public';

export const load = (async ({ data }) => {
	const supabaseBrowserClient = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON);
	const userChannel = supabaseBrowserClient.channel(data.userID!).subscribe();

	return {
		...data,
		supabaseBrowserClient,
		userChannel,
	};
}) satisfies LayoutLoad;
