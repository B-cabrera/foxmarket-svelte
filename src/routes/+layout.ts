/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */

import { createBrowserClient } from '@supabase/ssr';
import { writable, type Writable } from 'svelte/store';
import type { LayoutLoad } from './$types';
import { PUBLIC_SUPABASE_ANON, PUBLIC_SUPABASE_URL } from '$env/static/public';
import type { MessageWithoutID } from './proxy+layout.server';

export const load = (async ({ data }) => {
	const supabaseBrowserClient = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON);
	const userChannel = supabaseBrowserClient.channel(data.userID!).subscribe();
	const messageStore: Writable<[string, MessageWithoutID[]][]> = writable();

	return {
		...data,
		supabaseBrowserClient,
		userChannel,
		messageStore,
	};
}) satisfies LayoutLoad;
