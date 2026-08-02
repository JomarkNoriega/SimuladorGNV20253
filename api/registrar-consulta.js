export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido." });
  }

  const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
  const secret = process.env.GNV_SHARED_SECRET;

  if (!scriptUrl || !secret) {
    return res.status(503).json({
      message: "La integración con Google Sheets aún no está configurada.",
    });
  }

  const forwarded = req.headers["x-forwarded-for"];
  const ip = Array.isArray(forwarded)
    ? forwarded[0]
    : String(forwarded || req.socket?.remoteAddress || "").split(",")[0].trim();

  const payload = {
    ...req.body,
    idConsulta:
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    fechaHora: new Date().toISOString(),
    ip,
    userAgent: req.headers["user-agent"] || "",
    secret,
  };

  const response = await fetch(scriptUrl, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.ok === false) {
    return res.status(502).json({
      message: data.message || "Google Sheets rechazó el registro.",
    });
  }

  return res.status(200).json({ ok: true, idConsulta: payload.idConsulta });
}
