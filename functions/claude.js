// Hadrion — Cloudflare Pages Function
// Ruta: functions/claude.js

export async function onRequest(context) {
  const { request, env } = context;

  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  // Manejar preflight CORS
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405, headers: corsHeaders });
  }

  const GROQ_API_KEY = env.GROQ_API_KEY;
  if (!GROQ_API_KEY) {
    return new Response(
      JSON.stringify({ error: { message: "GROQ_API_KEY no configurada" } }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response("Invalid JSON", { status: 400, headers: corsHeaders });
  }

  const { messages = [], system = "" } = body;

  const systemPrompt = system ||
    "Sos una terapeuta clínica experta en Uruguay (fonoaudióloga, psicóloga, psicopedagoga o similar). " +
    "Respondés siempre en español rioplatense, de forma profesional y clara. " +
    "Cuando generás informes los hacés completos y listos para entregar. " +
    "No usás asteriscos ni markdown. Usás texto plano con saltos de línea. " +
    "Si tenés datos del paciente en el contexto los usás para personalizar la respuesta.";

  const groqMessages = [{ role: "system", content: systemPrompt }];
  const recentMessages = messages.slice(-20);
  for (const msg of recentMessages) {
    if (msg.role === "user" || msg.role === "assistant") {
      groqMessages.push({ role: msg.role, content: msg.content });
    }
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: groqMessages,
        max_tokens: 2048,
        temperature: 0.7,
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      return new Response(
        JSON.stringify({ error: { message: `Error de Groq: ${response.status}` } }),
        { status: response.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || "Sin respuesta";

    return new Response(
      JSON.stringify({ content: [{ type: "text", text }] }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (err) {
    return new Response(
      JSON.stringify({ error: { message: "Error de conexión con Groq" } }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
}
