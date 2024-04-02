import { createClient } from "@supabase/supabase-js";
import { envValues } from "../env-values";
import { Database } from "./database.type";

export const supabase = createClient<Database>(envValues.supabaseUrl, envValues.anonKey);
