import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}


export const supabase = createClient<any>(supabaseUrl, supabaseAnonKey);

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Job = Database['public']['Tables']['jobs']['Row'];
export type Task = Database['public']['Tables']['tasks']['Row'];
export type Document = Database['public']['Tables']['documents']['Row'];
export type Interview = Database['public']['Tables']['interviews']['Row'];