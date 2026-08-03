const DEFAULT_AUTHORIZED_DNIS = [
  "00252325",
  "00252326",
  "00252327",
  "40659320",
];

function parseAuthorizedDnis() {
  try {
    const configured = JSON.parse(
      process.env.AUTHORIZED_DNIS_JSON || "[]"
    );

    return Array.isArray(configured) && configured.length > 0
      ? configured.map(String)
      : DEFAULT_AUTHORIZED_DNIS;
  } catch {
    return DEFAULT_AUTHORIZED_DNIS;
  }
}

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido." });
  }

  const dni = String(req.body?.dni || "");
  const authorizedDnis = parseAuthorizedDnis();

  if (!/^\d{8}$/.test(dni)) {
    return res.status(400).json({
      message: "El DNI del usuario debe contener exactamente 8 dígitos.",
    });
  }

  if (!authorizedDnis.includes(dni)) {
    return res.status(403).json({
      message: "El DNI del usuario no está autorizado.",
    });
  }

  return res.status(200).json({ valid: true });
}
