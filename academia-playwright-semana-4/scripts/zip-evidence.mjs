/**
 * Parte E — Arma un .zip con allure-report, screenshots en disco y reports/logs (pw-api).
 * Windows: PowerShell Compress-Archive. Unix: zip -r.
 */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const root = process.cwd();
const reportDir = path.join(root, 'reports', 'allure-report');
const reportsShotsDir = path.join(root, 'reports', 'screenshots');
const logsDir = path.join(root, 'reports', 'logs');

const toZip = [reportDir, reportsShotsDir, logsDir].filter((p) => fs.existsSync(p));
if (toZip.length === 0) {
  console.error('[ERROR] No hay carpetas para comprimir. Generá Allure (`npm run allure:generate`) y volvé a intentar.');
  process.exit(1);
}

const out = path.join(root, 'reports', 'evidencias-job.zip');
if (fs.existsSync(out)) fs.rmSync(out);

if (process.platform === 'win32') {
  const esc = (s) => s.replace(/'/g, "''");
  const paths = toZip.map((p) => `'${esc(p)}'`).join(',');
  execSync(
    `powershell -NoProfile -Command "Compress-Archive -Path ${paths} -DestinationPath '${esc(out)}' -Force"`,
    { stdio: 'inherit' }
  );
} else {
  const args = toZip.map((p) => `"${p}"`).join(' ');
  execSync(`zip -r "${out}" ${args}`, { stdio: 'inherit', cwd: root });
}

console.log(`[INFO] Zip de evidencias: ${out}`);
