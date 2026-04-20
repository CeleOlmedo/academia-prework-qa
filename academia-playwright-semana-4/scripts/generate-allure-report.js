/**
 * Genera Allure desde allure-results/ (raíz) → reports/allure-report/ (Parte E).
 *
 *   node scripts/generate-allure-report.js
 *   node scripts/generate-allure-report.js --open
 *   node scripts/generate-allure-report.js --single-file
 */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const RESULTS_DIR = path.join(process.cwd(), 'allure-results');
const REPORT_DIR = path.join(process.cwd(), 'reports', 'allure-report');
const openFlag = process.argv.includes('--open');
const singleFile =
  process.argv.includes('--single-file') || process.env.ALLURE_SINGLE_FILE === '1';

const entries = fs.existsSync(RESULTS_DIR)
  ? fs.readdirSync(RESULTS_DIR).filter((n) => n !== '.gitkeep' && n !== '.formatter-dummy.log')
  : [];

if (entries.length === 0) {
  console.error(`[ERROR] No hay resultados en ${RESULTS_DIR}.`);
  console.error('        Ejecutá primero: npm test');
  process.exit(1);
}

const singleFileFlag = singleFile ? ' --single-file' : '';
console.log('[INFO] Generando reporte Allure...');
execSync(
  `npx allure generate "${RESULTS_DIR}" --clean -o "${REPORT_DIR}"${singleFileFlag}`,
  { stdio: 'inherit' }
);
console.log(
  singleFile
    ? `[INFO] Reporte (un solo archivo) en: ${REPORT_DIR}/`
    : `[INFO] Reporte generado en: ${path.join(REPORT_DIR, 'index.html')}`
);

if (openFlag) {
  console.log('[INFO] Abriendo en browser...');
  execSync(`npx allure open "${REPORT_DIR}"`, { stdio: 'inherit' });
}
