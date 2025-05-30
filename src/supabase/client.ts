import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ppceovzlwaxfomhfcsrd.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwY2Vvdnpsd2F4Zm9taGZjc3JkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1MDAzNjMsImV4cCI6MjA2NDA3NjM2M30.r5qr4hnMVjpcFCx1SQrvwpm3BrbRhrB53FNSwxTdZMQ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);