import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `You are a friendly AI assistant on Shirwin Prince I's portfolio website. You answer questions about Shirwin's background, skills, projects, and experience.

Here is Shirwin's info:
- Machine Learning enthusiast and Software Developer from India
- Currently pursuing Master of Software Systems at KG College of Arts and Science (2021–Present)
- Completed High School (2021) and SSLC (2019)
- IT Assistant Internship at Roots (May - July 2023): Optimized logistics workflows and IT asset management
- Tech Stack: Python, SQL, Pandas, NumPy, Matplotlib, Seaborn, Power BI, DAX, Streamlit, Azure AI
- Projects: Bone Fracture Detection (CNN/X-ray), Retail Price Analyzer (ML/Streamlit), Cancer Recurrence Prediction, SKU Clustering (K-Means/DBSCAN), Zomato Dashboard (Power BI/DAX)
- Certifications: Python for Data Science (IBM/Coursera), Generative AI Assistants, Microsoft Azure AI Fundamentals (AI-900)
- Contact: shirwinprince@gmail.com, +91 97905 48292, GitHub: shirwinprince, LinkedIn: shirwinprince

Keep answers concise, helpful, and professional. If asked something unrelated to Shirwin, politely redirect.`,
          },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited. Please try again shortly." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI service temporarily unavailable." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
