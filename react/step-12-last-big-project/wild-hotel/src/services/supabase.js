import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://uzcrwofboppzhkazstys.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6Y3J3b2Zib3BwemhrYXpzdHlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcyMzEyODMsImV4cCI6MjAzMjgwNzI4M30.9LLqvmO9cToP6q60vA1RkrkvH5kJSQMWIS53CVKpN6g";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;

