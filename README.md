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
- `AUTHORIZED_DNIS_JSON`: arreglo JSON con los DNI autorizados, sin dígito de chequeo.
  Ejemplo: `["00252325","00252326","00252327","40659320"]`
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


## Validaciones incorporadas
- Placa: exactamente 6 caracteres alfanuméricos.
- Dígito de chequeo: usa pesos `3, 2, 7, 6, 5, 4, 3, 2`, posición `11 - (suma % 11)` y mapa numérico `67890123456`.

- Factor de recaudo: editable en la simulación, sin exceder el máximo de la oferta.
- La alerta compara el factor requerido por la cuota con el factor seleccionado.


## Casos de validación del dígito de chequeo

- DNI `00252325` → dígito `1`
- DNI `40659320` → dígito `2`

## Cambios v5
- “Datos básicos” cambia a “Datos”.
- “Oferta disponible” cambia a “Oferta Pre Aprobada”.
- Factores máximos actualizados según segmento, antigüedad y grupo.
- “Vida Integral” cambia a “Vida Integral/Desgravamen”.
- Mensaje exitoso simplificado.


## Cambios v6
- Se oculta el campo editable de factor de recaudo.
- Se oculta el resumen intermedio del factor en la sección de simulación.
- El factor calculado se muestra solo en el resultado final.
- Se oculta el mensaje visual de éxito.
- Control de plazo por producto:
  - VIP, PREFERENTE, NORMAL, INCLUSION y EVALUACION: plazo mínimo 12 meses.
  - NA: plazo mínimo y máximo de 6 meses.
- Las tablas de cálculo de factor se actualizaron con el Excel V.3 adjunto.


## Cambio temporal v7
- Se retiró de la pantalla el campo “Dígito de chequeo”.
- Se desactivó la validación del dígito de chequeo en frontend y backend.
- Se mantiene la validación del DNI de usuario:
  - exactamente 8 dígitos numéricos;
  - existencia en `AUTHORIZED_DNIS_JSON`.

## Cambios v8
- Nuevo rango de antigüedad: 21 a 25 años.
- VIP, PREFERENTE, NORMAL, INCLUSION y EVALUACION: oferta exacta de S/ 1,000.
- NA: oferta exacta de S/ 500.
- Antigüedad máxima permitida: 25 años.

## Cambios v9
- Se actualizó el cuadro de máximos para INCLUSIÓN y EVALUACIÓN a 60% de factor de recaudo máximo.
