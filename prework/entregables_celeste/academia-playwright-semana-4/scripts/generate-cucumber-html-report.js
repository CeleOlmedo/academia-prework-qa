import path from 'path';
import fs from 'fs';
import reporter from 'multiple-cucumber-html-reporter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = process.cwd();
const reportsDir = path.join(projectRoot, 'artifacts', 'reports');
const jsonReport = path.join(reportsDir, 'cucumber-report.json');
const htmlDir = path.join(reportsDir, 'html');

if (!fs.existsSync(jsonReport)) {
  throw new Error(
    `No se encontró el JSON de Cucumber en ${jsonReport}. Ejecutá primero: npm run bdd:report:json`,
  );
}

fs.mkdirSync(htmlDir, { recursive: true });

reporter.generate({
  jsonDir: reportsDir,
  reportPath: htmlDir,
  reportName: 'Cucumber Test Report',
  pageTitle: 'Academia QA - Cucumber Report',
  displayDuration: true,
  pageFooter: '<div>Academia QA — Celeste Olmedo</div>',  // tu nombre en el pie
  metadata: {
    browser: { name: 'chromium', version: 'latest' },
    device: 'Local test machine',
    platform: {
      name: process.platform,
      version: process.version,
    },
    executed: new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Cordoba' }),
    suite: 'D27 — BasePage y primeras Pages',   // identifica el día/entrega
  },
});

console.log(`Reporte HTML generado en: ${path.join(htmlDir, 'index.html')}`);