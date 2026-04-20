import { BeforeAll, AfterAll, Before, After, AfterStep, Status } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import { environment } from '../../config/loadEnvironment.js';
import fs from 'fs';
import path from 'path';

const level = process.env.LOG_LEVEL ?? 'info';
const verbose = level === 'verbose';

/** F.1 / F.2 — Copias en disco bajo reports/screenshots (no solo adjuntos en Allure). */
const REPORTS_SCREENSHOTS_DIR = path.join(process.cwd(), 'reports', 'screenshots');
const LOGS_DIR = path.join(process.cwd(), 'artifacts', 'logs');
const REPORTS_LOGS_DIR = path.join(process.cwd(), 'reports', 'logs');
fs.mkdirSync(REPORTS_SCREENSHOTS_DIR, { recursive: true });
fs.mkdirSync(LOGS_DIR, { recursive: true });
fs.mkdirSync(REPORTS_LOGS_DIR, { recursive: true });

const runTimestamp = new Date().toISOString().replace(/[:.]/g, '-');
const runNetworkLogPath = path.join(LOGS_DIR, `run-network-${runTimestamp}.log`);
const pwStderrInProcessPath = path.join(REPORTS_LOGS_DIR, 'pw-api-stderr-run.log');

let globalBrowser;
let origStderrWrite = null;
let stderrTeeInstalled = false;

function debugPwApiEnabled() {
  return String(process.env.DEBUG ?? '').includes('pw:api');
}

function pwApiSliceSourcePath() {
  const job = process.env.PW_API_JOB_LOG;
  if (job && fs.existsSync(job)) return job;
  return pwStderrInProcessPath;
}

/** F.2 — Escenarios etiquetados con @audit (tags del pickle). */
function pickleHasAuditTag(pickle) {
  return pickle?.tags?.some((t) => t.name === '@audit') ?? false;
}

BeforeAll(async function () {
  if (level !== 'quiet')
    console.log('[INFO]', `Ambiente activo: ${environment.name} — baseUrl: ${environment.baseUrl}`);

  if (debugPwApiEnabled() && !process.env.PW_API_JOB_LOG) {
    fs.writeFileSync(pwStderrInProcessPath, '');
    origStderrWrite = process.stderr.write.bind(process.stderr);
    const logStream = fs.createWriteStream(pwStderrInProcessPath, { flags: 'a' });
    process.stderr.write = (chunk, encoding, cb) => {
      try {
        if (Buffer.isBuffer(chunk)) logStream.write(chunk);
        else logStream.write(chunk, encoding);
      } catch {
        /* ignore */
      }
      return origStderrWrite(chunk, encoding, cb);
    };
    stderrTeeInstalled = true;
  }

  const slowMo = Number(process.env.SLOWMO ?? 0);
  globalBrowser = await chromium.launch({
    headless: process.env.HEADED !== 'true',
    slowMo: Number.isFinite(slowMo) ? slowMo : 0,
  });
});

Before(async function (scenario) {
  if (level !== 'quiet')
    console.log('[INFO]', `▶ Escenario: ${scenario.pickle.name}`);

  this.browser = globalBrowser;
  this.context = await this.browser.newContext({ baseURL: environment.baseUrl });
  this.page = await this.context.newPage();
  this.scenarioName = scenario.pickle.name;

  this._pwStderrLogStart = 0;
  const src = pwApiSliceSourcePath();
  if (debugPwApiEnabled() && fs.existsSync(src)) {
    this._pwStderrLogStart = fs.statSync(src).size;
  }

  this.diagnosticLog = `Ambiente: ${environment.name} | baseUrl: ${environment.baseUrl}\n`;
  this.diagnosticLog += `Escenario: ${scenario.pickle.name}\n\n`;

  this.page.on('request', (req) => {
    const line = `→ ${req.method()} ${req.url()}\n`;
    this.diagnosticLog += line;
    if (verbose) console.log('[VERBOSE]', line.trim());
  });
  this.page.on('response', (res) => {
    const line = `← ${res.status()} ${res.url()}\n`;
    this.diagnosticLog += line;
    if (verbose) console.log('[VERBOSE]', line.trim());
  });
});

AfterStep(async function ({ pickleStep, pickle }) {
  if (!this.page) return;

  const eachStep = process.env.SCREENSHOT_EACH_STEP === 'true';
  const auditScenario = pickleHasAuditTag(pickle);
  if (!eachStep && !auditScenario) return;

  const safeName = (pickleStep.text ?? 'step').replace(/[^a-z0-9]/gi, '_').slice(0, 60);
  const png = await this.page.screenshot({ fullPage: true });
  await this.attach(png, 'image/png');
  const filePath = path.join(
    REPORTS_SCREENSHOTS_DIR,
    `STEP_${safeName}_${Date.now()}.png`
  );
  fs.writeFileSync(filePath, png);
});

After(async function (scenario) {
  const failed = scenario.result?.status === Status.FAILED;

  if (failed && this.page) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    await this.attach(screenshot, 'image/png');
    const safeName = (this.scenarioName ?? 'scenario').replace(/[^a-z0-9]/gi, '_').slice(0, 80);
    const filePath = path.join(
      REPORTS_SCREENSHOTS_DIR,
      `FAIL_${safeName}_${Date.now()}.png`
    );
    fs.writeFileSync(filePath, screenshot);
  }

  if (this.diagnosticLog && (verbose || failed)) {
    await this.attach(Buffer.from(this.diagnosticLog, 'utf8'), 'text/plain');
    fs.appendFileSync(runNetworkLogPath, `\n${'='.repeat(60)}\n${this.diagnosticLog}`);
  }

  if (debugPwApiEnabled()) {
    const src = pwApiSliceSourcePath();
    if (fs.existsSync(src)) {
      const end = fs.statSync(src).size;
      const start = Number.isFinite(this._pwStderrLogStart) ? this._pwStderrLogStart : 0;
      if (end > start) {
        const buf = fs.readFileSync(src);
        const slice = buf.subarray(start, end);
        if (slice.length > 0) {
          await this.attach(slice, 'text/plain');
        }
      }
    }
  }

  if (level !== 'quiet')
    console.log('[INFO]', `■ Fin: ${scenario.pickle.name} [${scenario.result?.status}]`);

  if (this.page) await this.page.close();
  if (this.context) await this.context.close();
});

AfterAll(async function () {
  if (stderrTeeInstalled && origStderrWrite) {
    process.stderr.write = origStderrWrite;
  }
  if (globalBrowser) await globalBrowser.close();
});
