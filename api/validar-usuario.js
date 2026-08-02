function parseUsers() {
  try {
    return JSON.parse(process.env.AUTHORIZED_USERS_JSON || "{}");
  } catch {
    return {};
  }
}

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido." });
  }

  const dni = String(req.body?.dni || "");
  const digito = String(req.body?.digitoChequeo || "").toUpperCase();
  const users = parseUsers();

  // Usuario de demostración basado en el ejemplo recibido.
  if (Object.keys(users).length === 0) {
    users["00252325"] = "1";
  }

  if (!/^\d{8}$/.test(dni)) {
    return res.status(400).json({
      message: "El DNI del usuario debe contener exactamente 8 dígitos.",
    });
  }

  if (!(dni in users)) {
    return res.status(403).json({
      message: "El DNI del usuario no está autorizado.",
    });
  }

  if (String(users[dni]).toUpperCase() !== digito) {
    return res.status(403).json({
      message: "El dígito de chequeo no corresponde al DNI ingresado.",
    });
  }

  return res.status(200).json({ valid: true });
}
