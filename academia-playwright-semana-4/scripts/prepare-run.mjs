/**
 * Carpetas de artefactos y limpieza de allure-results (sin borrar .gitkeep).
 */
import fs from 'fs';
import path from 'path';

const root = process.cwd();
const dirs = [
  ['allure-results'],
  ['reports', 'logs'],
  ['reports', 'screenshots'],
  ['reports', 'allure-report'],
  ['artifacts', 'cucumber'],
  ['artifacts', 'logs'],
];

for (const seg of dirs) {
  fs.mkdirSync(path.join(root, ...seg), { recursive: true });
}

const allureResults = path.join(root, 'allure-results');
for (const name of fs.readdirSync(allureResults)) {
  if (name === '.gitkeep') continue;
  fs.rmSync(path.join(allureResults, name), { recursive: true, force: true });
}

const reportsLogs = path.join(root, 'reports', 'logs');
if (fs.existsSync(reportsLogs)) {
  for (const name of fs.readdirSync(reportsLogs)) {
    if (name === '.gitkeep') continue;
    fs.rmSync(path.join(reportsLogs, name), { recursive: true, force: true });
  }
}

const reportsShots = path.join(root, 'reports', 'screenshots');
if (fs.existsSync(reportsShots)) {
  for (const name of fs.readdirSync(reportsShots)) {
    if (name === '.gitkeep') continue;
    fs.rmSync(path.join(reportsShots, name), { recursive: true, force: true });
  }
}
