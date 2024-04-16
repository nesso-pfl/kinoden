export const envValues = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  authCallbackUrl: process.env.NEXT_PUBLIC_AUTH_CALLBACK_URL!,
} as const;
