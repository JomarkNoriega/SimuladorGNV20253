const DEFAULT_AUTHORIZED_DNIS = [
  "00252325",
  "00252326",
  "00252327",
  "40659320",
];

const DNI_WEIGHTS = [3, 2, 7, 6, 5, 4, 3, 2];
const DNI_NUMBER_MAP = "67890123456";

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

function calculateCheckDigit(dni) {
  const sum = dni
    .split("")
    .reduce(
      (total, digit, index) =>
        total + Number(digit) * DNI_WEIGHTS[index],
      0
    );

  const position = 11 - (sum % 11);
  const index = position - 1;

  return DNI_NUMBER_MAP.charAt(index);
}

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido." });
  }

  const dni = String(req.body?.dni || "");
  const digito = String(req.body?.digitoChequeo || "");
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

  if (!/^\d$/.test(digito)) {
    return res.status(400).json({
      message: "El dígito de chequeo debe ser numérico.",
    });
  }

  if (calculateCheckDigit(dni) !== digito) {
    return res.status(403).json({
      message: "El dígito de chequeo no corresponde al DNI ingresado.",
    });
  }

  return res.status(200).json({ valid: true });
}
