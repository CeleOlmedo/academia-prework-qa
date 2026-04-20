import path from 'path';
import fs from 'fs';
import reporter from 'multiple-cucumber-html-reporter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = process.cwd();

// Todo dentro de cucumber/
const cucumberDir = path.join(projectRoot, 'artifacts', 'cucumber');
const htmlDir = path.join(cucumberDir, 'html');
const jsonReport = path.join(cucumberDir, 'cucumber-report.json');

// Validar JSON
if (!fs.existsSync(jsonReport)) {
  throw new Error(
    `No se encontró el JSON de Cucumber en ${jsonReport}. Ejecutá primero: npm run bdd:report:json`,
  );
}

// Limpiar HTML antes de generar
if (fs.existsSync(htmlDir)) {
  fs.rmSync(htmlDir, { recursive: true, force: true });
}
fs.mkdirSync(htmlDir, { recursive: true });

// Generar reporte
reporter.generate({
  jsonDir: cucumberDir,
  reportPath: htmlDir,
  reportName: 'Cucumber Test Report',
  pageTitle: 'Academia QA - Cucumber Report',
  displayDuration: true,
  pageFooter: '<div>Academia QA — Celeste Olmedo</div>',
  customData: {
    title: 'Información de ejecución',
    data: [
      { label: 'Proyecto', value: 'Academia QA' },
      { label: 'Entrega', value: 'D32 — Reportes, Allure y evidencias' },
      { label: 'Autor', value: 'Celeste Olmedo' },
      {
        label: 'Fecha y hora',
        value: new Date().toLocaleString('es-AR', {
          timeZone: 'America/Argentina/Cordoba',
        }),
      },
    ],
  },
  metadata: {
    browser: { name: 'chromium', version: 'latest' },
    device: 'Local test machine',
    platform: {
      name: process.platform,
      version: process.version,
    },
  },
});

console.log(`Reporte HTML generado en: ${path.join(htmlDir, 'index.html')}`);