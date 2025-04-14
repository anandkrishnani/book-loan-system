import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type BookRow = {
  id: string;
  title: string;
  borrower: string;
  borrow_date: string;
  due_date: string;
  returned: boolean;
  created_at: string;
}; 