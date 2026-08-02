const SHEET_NAME = "Consultas";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const expectedSecret =
      PropertiesService.getScriptProperties().getProperty("GNV_SHARED_SECRET");

    if (!expectedSecret || data.secret !== expectedSecret) {
      return jsonResponse({ ok: false, message: "No autorizado." });
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    if (!sheet) {
      return jsonResponse({
        ok: false,
        message: `No existe la hoja ${SHEET_NAME}.`,
      });
    }

    sheet.appendRow([
      data.idConsulta,
      data.fechaHora,
      data.dniUsuario,
      data.dniCliente,
      data.segmentoCliente,
      data.marcaVehiculo,
      data.anioModelo,
      data.antiguedad,
      data.segmentoVehiculo,
      data.placa,
      data.montoMaximo,
      data.plazoMaximo,
      data.factorMaximo,
      data.montoSolicitado,
      data.plazo,
      data.seguroObligatorio,
      data.seguroVoluntario,
      data.cuota,
      data.factorRecaudoSeleccionado,
      data.factorCalculado,
      data.resultadoOferta,
      data.deviceId,
      data.ip,
      data.userAgent,
      data.versionAplicacion,
      "PENDIENTE",
    ]);

    return jsonResponse({ ok: true });
  } catch (error) {
    return jsonResponse({ ok: false, message: error.message });
  }
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
