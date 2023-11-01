/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

import { createClient } from '@supabase/supabase-js';
import { SUPABASE_ANON, SUPABASE_URL } from '$env/static/private';

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON);

export default supabaseClient;
