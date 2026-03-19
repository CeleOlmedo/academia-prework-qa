const path = require('path');
const fs = require('fs');
const reporter = require('multiple-cucumber-html-reporter');

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
  metadata: {
    browser: {
      name: 'chromium',
      version: 'latest',
    },
    device: 'Local test machine',
    platform: {
      name: process.platform,
      version: process.version,
    },
  },
});

console.log(`Reporte HTML generado en: ${path.join(htmlDir, 'index.html')}`);
