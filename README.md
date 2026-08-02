# Simulador GNV - Clientes Nuevos

## Funcionalidad
- Flujo en cuatro etapas: Datos básicos, Oferta disponible, Simulación y Resultado.
- La antigüedad y el grupo del vehículo se calculan internamente, pero no se muestran.
- La simulación conserva las fórmulas del Excel adjunto:
  - seguro Vida Integral: 10% del monto solicitado;
  - Solidario: plazo x S/ 8;
  - Ruta protegida: S/ 60;
  - Solidario + Ruta: plazo x S/ 8 + S/ 60;
  - TEA por búsqueda aproximada;
  - cuota con PMT mensual;
  - factor por tabla del segmento.

## Variables de entorno en Vercel
- `AUTHORIZED_USERS_JSON`: JSON de DNI y dígito de chequeo.
  Ejemplo: `{"00252325":"1","00252326":"X"}`
- `GOOGLE_APPS_SCRIPT_URL`: URL del Web App desplegado en Apps Script.
- `GNV_SHARED_SECRET`: clave compartida entre Vercel y Apps Script.

## Google Sheets
1. Crear un Google Sheet privado.
2. Crear la hoja `Consultas`.
3. Copiar la cabecera de `google-apps-script/headers.csv`.
4. Abrir Extensiones > Apps Script y pegar `google-apps-script/Code.gs`.
5. En Propiedades del script crear `GNV_SHARED_SECRET`.
6. Desplegar como aplicación web.
7. Compartir la hoja solo con administradores autorizados.

## Pendiente de definición
- Dígitos de chequeo de los DNI 00252326, 00252327 y 40659320.
- Fórmula/costo de la opción Gravamen, si debe incorporarse.
