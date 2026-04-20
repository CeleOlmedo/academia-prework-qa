# Academia QA — Semana 4 (D32)

Automatización **SauceDemo** con **Cucumber-js** como runner principal, **Playwright** en los steps y reportes **Allure** + HTML clásico (multiple-cucumber-html-reporter).

## Inicio rápido

```bash
npm install
npm test
npm run allure:generate
```

Abrí el reporte Allure en `reports/allure-report/index.html`. La guía completa (comandos, zip, DEBUG, screenshots, stakeholder, checklist) está en **`D32_reportes_y_screenshots.md`**. Referencia corta: `docs/reportes.md`.

## Estructura del repo

| Ruta | Rol |
|------|-----|
| `features/` | Escenarios Gherkin, step definitions y `support/` (hooks, world) |
| `pages/`, `config/`, `constants/`, `data/` | Page Objects, entornos y datos de prueba |
| `reporters/` | Formateador `allure-cucumberjs` → `allure-results/` |
| `scripts/` | `prepare-run`, generación Allure/HTML, log `pw:api`, zip de evidencias |
| `support/` | `visualCompare.js` (pixelmatch), `playwrightExpectScreenshot.js` (referencia) |
| `visual-baselines/` | Imágenes de referencia para regresión visual (opcional) |
| `docs/` | `reportes.md` y `entregable-d32-capturas/` (capturas manuales del Allure) |
| `allure-results/` | **Generado** — resultados crudos Allure (no subir contenido; queda `.gitkeep`) |
| `reports/` | **Generado** — `allure-report/`, `logs/`, `screenshots/`, `evidencias-job.zip` |
| `artifacts/cucumber/` | **Generado** — JSON + HTML Cucumber tras `npm run bdd:report:*` |

Los directorios marcados como **generados** están en `.gitignore`; se recrean con los scripts indicados en el D32.
