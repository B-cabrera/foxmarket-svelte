/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_ANON, PUBLIC_SUPABASE_URL } from '$env/static/public';

const supabaseClient = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON);

export default supabaseClient;
