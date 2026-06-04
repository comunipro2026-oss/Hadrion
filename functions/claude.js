// ================================================
// HADRION — Cloudflare Pages Function
// Ruta: functions/claude.js
// Acepta formato Anthropic Y formato Groq simple
// ================================================

export async function onRequest(context) {
  const { request, env } = context;

  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return new Response(
      JSON.stringify({ error: { message: "Method Not Allowed" } }),
      {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  const GROQ_API_KEY = env.GROQ_API_KEY;
  if (!GROQ_API_KEY) {
    return new Response(
      JSON.stringify({
        error: { message: "GROQ_API_KEY no configurada en Cloudflare Pages." },
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ error: { message: "JSON inválido" } }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  // ── Acepta ambos formatos ──────────────────────────────────────────────────
  // Formato 1 (Anthropic): { model, max_tokens, system, messages }
  // Formato 2 (simple): { system, messages }
  const { messages = [], system = "" } = body;

  const systemPrompt =
    system ||
    "Sos una terapeuta clínica experta en Uruguay (fonoaudióloga, psicóloga, psicopedagoga o similar). " +
      "Respondés siempre en español rioplatense, de forma profesional y clara. " +
      "Cuando generás informes los hacés completos y listos para entregar. " +
      "No usás asteriscos ni markdown. Usás texto plano con saltos de línea.";

  // Construir mensajes para Groq
  const groqMessages = [{ role: "system", content: systemPrompt }];
  const recentMessages = messages.slice(-20);
  for (const msg of recentMessages) {
    if (
      (msg.role === "user" || msg.role === "assistant") &&
      msg.content?.trim()
    ) {
      groqMessages.push({ role: msg.role, content: msg.content.trim() });
    }
  }

  const hasUserMsg = groqMessages.some((m) => m.role === "user");
  if (!hasUserMsg) {
    return new Response(
      JSON.stringify({
        error: { message: "No hay mensajes de usuario válidos" },
      }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  try {
    const groqRes = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: groqMessages,
          max_tokens: 2048,
          temperature: 0.7,
        }),
      }
    );

    if (!groqRes.ok) {
      let msg = `Error Groq HTTP ${groqRes.status}`;
      try {
        const e = await groqRes.json();
        msg = e?.error?.message || msg;
      } catch {}
      if (groqRes.status === 401)
        msg =
          "API Key de Groq inválida. Actualizala en Cloudflare Pages → Settings → Variables.";
      if (groqRes.status === 429)
        msg = "Límite de Groq alcanzado. Esperá unos segundos.";
      return new Response(JSON.stringify({ error: { message: msg } }), {
        status: groqRes.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await groqRes.json();
    const text = data.choices?.[0]?.message?.content;

    if (!text) {
      return new Response(
        JSON.stringify({ error: { message: "Groq no devolvió contenido." } }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Devolver en formato Anthropic (compatible con ambos componentes del frontend)
    return new Response(JSON.stringify({ content: [{ type: "text", text }] }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: {
          message: `Error de conexión: ${err.message || "desconocido"}`,
        },
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
}
