import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const username = "shirwinprince";
    
    // Fetch contribution data via GitHub's GraphQL-like contrib calendar
    // We'll use the public contributions page which returns SVG
    const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);
    
    if (!response.ok) {
      throw new Error(`GitHub API returned ${response.status}`);
    }
    
    const data = await response.json();
    
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("GitHub activity error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
