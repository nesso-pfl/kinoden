/*
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.42.5";

Deno.serve(async (req) => {
  const origin = req.headers.get("origin")?.includes("http://localhost:3000")
    ? "http://localhost:3000"
    : "https://kinoden-pfl.nesso-pfl.click";
  console.log(req);
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const authorization = req.headers.get("Authorization");
  if (!supabaseUrl || !supabaseServiceRoleKey || !authorization)
    throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set");

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
    },
  });
  const jwt = authorization.split(" ")[1];
  const user = await supabase.auth.getUser(jwt);
  if (user.data.user?.user_metadata.userRole !== "admin") {
    return new Response(undefined, {
      status: 401,
    });
  }

  const {
    data: { users },
    error,
  } = await supabase.auth.admin.listUsers();
  const data = {
    users,
  };
  console.log(users, error);

  return new Response(JSON.stringify(data), {
    headers: {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      "Content-Type": "application/json",
    },
  });
});
*/

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/hello-world' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
