/**
 * Parte D — Ejecuta Cucumber con DEBUG=pw:api y persiste stderr en reports/logs/pw-api-<timestamp>.log
 * además de mostrarlo en consola (tee portable, sin depender de redirecciones shell).
 *
 * Define PW_API_JOB_LOG (ruta absoluta) para que hooks adjunten porciones por escenario en Allure.
 */
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const root = process.cwd();
const logsDir = path.join(root, 'reports', 'logs');
fs.mkdirSync(logsDir, { recursive: true });

const ts = new Date().toISOString().replace(/[:.]/g, '-');
const logPath = path.join(logsDir, `pw-api-${ts}.log`);
fs.writeFileSync(logPath, '', 'utf8');
fs.writeFileSync(path.join(logsDir, '.last-pw-api-log'), logPath, 'utf8');

const env = {
  ...process.env,
  ENV: process.env.ENV ?? 'dev',
  DEBUG: 'pw:api',
  LOG_LEVEL: process.env.LOG_LEVEL ?? 'verbose',
  PW_API_JOB_LOG: logPath,
};

const cucumberEntry = path.join(
  root,
  'node_modules',
  '@cucumber',
  'cucumber',
  'bin',
  'cucumber.js'
);

const child = spawn(process.execPath, [cucumberEntry, '--config', 'cucumber.js'], {
  cwd: root,
  env,
  stdio: ['inherit', 'inherit', 'pipe'],
});

const logStream = fs.createWriteStream(logPath, { flags: 'a' });

child.stderr.on('data', (chunk) => {
  logStream.write(chunk);
  process.stderr.write(chunk);
});

child.on('error', (err) => {
  console.error('[run-cucumber-with-pw-api-log]', err);
  process.exit(1);
});

child.on('close', (code, signal) => {
  logStream.end(() => {
    if (signal) process.exit(1);
    process.exit(code === null ? 1 : code);
  });
});
