# Día 32 — Reportes HTML, Allure y evidencias - Olmedo Celeste

## HTML clásico + Allure

### Documento HTML clásico

- **Dónde queda el JSON:** `artifacts/cucumber/cucumber-report.json`
- **Dónde queda el HTML:** `artifacts/cucumber/html/index.html`
- **Cómo se genera:** `npm run bdd:report:share`
- **Cómo se abre:** abrir `artifacts/cucumber/html/index.html` en el navegador.

### Allure (comando `generate` + carpeta de salida)

- **Resultados crudos por job:** `allure-results/`
- **Comando para generar reporte:** `npm run allure:generate`
- **Carpeta de salida del reporte:** `reports/allure-report/`
- **Cómo abrirlo:** `npm run allure:open` o abrir `reports/allure-report/index.html`.

---

## Cómo exporto el reporte para un cliente

- **Zip entregable completo:** `npm run evidence:zip`
  - Genera `reports/evidencias-job.zip` con `reports/allure-report/`, `reports/logs/` y `reports/screenshots/`.
- **Single-file:** `npm run allure:generate:single`
  - Usa `--single-file` de Allure y deja el resultado en `reports/allure-report/`.

### Cómo lo recibe el cliente (3–5 líneas)

Descomprime `reports/evidencias-job.zip` en una carpeta local.  
Abre `reports/allure-report/index.html` en su navegador para ver escenarios, pasos y adjuntos.  
Si se envía modalidad single-file, abre directamente el `.html` generado por Allure en `reports/allure-report/`.  
El log técnico de depuración está en `reports/logs/pw-api-<timestamp>.log`.

---

## Cómo adjunto el log `DEBUG=pw:api` por job

### Decisión tomada

- **Decisión:** adjuntar en Allure la **porción de log por escenario** (en hook `After`) y guardar además el archivo completo por job en disco.
- **Por qué:** Cucumber no brinda el mismo `World` para hacer `this.attach` global en `AfterAll`, por escenario se mantiene trazabilidad clara y el job completo igual queda entregable para CI/cliente.

### Implementación

- **Comando de corrida con debug:** `npm run test:debug`
- **Archivo por job:** `reports/logs/pw-api-<timestamp>.log`
- **Adjunto en Allure:** `this.attach(..., 'text/plain')` en `After` por escenario.
- **Alternativa legible:** resumen HTTP (`request/response`) adjunto como texto (`diagnosticLog`) en verbose o en fallo.

---

## Screenshots (fallo + negocio)

- **Fallo (obligatorio):** screenshot en hook `After` si el escenario falla.
  - Se adjunta en Allure (`image/png`) y se guarda en `reports/screenshots/FAIL_*`.
- **Capturas de negocio (no solo error):**
  - `AfterStep` con `SCREENSHOT_EACH_STEP=true` o escenarios `@audit` (archivos `STEP_*`).
  - Captura bajo demanda en step con `SCREENSHOT_CHECKPOINT_LOGIN=true` (archivos `CHECKPOINT_*`).
- **Validación visual (opcional recomendado):**
  - Opción A: `pixelmatch/pngjs` en `support/visualCompare.js` (baseline + actual + diff).
  - Opción B: `toHaveScreenshot` de `@playwright/test` (documentado en `support/playwrightExpectScreenshot.js`).

---

## Capturas del reporte Allure (evidencia visual)

Para la entrega se incluyen capturas manuales del navegador mostrando:

1. listado de escenarios con estados;
2. escenario con steps y resultado;
3. adjuntos (logs + PNG).

Se adjunta archivo capturas_allure.zip

---

## Qué comunica cada pieza a un stakeholder

Si este reporte se comparte con un cliente o jefe de proyecto, puede entender rápidamente lo siguiente:

- **Cuántos escenarios pasaron y cuántos fallaron:** en la pantalla principal de Allure se ve el resumen general de la corrida (total, passed, failed, skipped). Ese número permite saber si el estado del producto es apto para avanzar o si hay bloqueos.
- **Dónde abrir el reporte:** el entregable está en `reports/allure-report/index.html` o dentro del zip `reports/evidencias-job.zip` (descomprimir y abrir ese `index.html`).
- **Qué prueba el log de DEBUG/HTTP:** el log muestra las acciones técnicas que realizó el navegador y las requests/responses del flujo, sirviendo como evidencia de que la automatización realmente ejecutó el recorrido esperado.
- **Qué muestran los screenshots:** dejan evidencia visual de dónde falló la aplicación y también de pasos clave que sí quedaron validados (por ejemplo login, navegación o checkout).
- **Qué riesgo hay si falla un flujo crítico:** si un flujo como checkout falla, el riesgo de negocio es alto (usuarios no pueden comprar); si falla login, usuarios no pueden ingresar; por eso esos fallos se consideran prioritarios antes de publicar.
