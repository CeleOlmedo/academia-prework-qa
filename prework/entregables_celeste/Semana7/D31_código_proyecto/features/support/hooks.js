import { BeforeAll, AfterAll, Before, After, Status } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import { environment } from '../../config/loadEnvironment.js';

const level = process.env.LOG_LEVEL ?? 'info';
const verbose = level === 'verbose';

let globalBrowser;

BeforeAll(async function () {
  if (level !== 'quiet') console.log('[INFO]', `Ambiente activo: ${environment.name} — baseUrl: ${environment.baseUrl}`);
  const slowMo = Number(process.env.SLOWMO ?? 0);
  globalBrowser = await chromium.launch({
    headless: process.env.HEADED !== 'true',
    slowMo: Number.isFinite(slowMo) ? slowMo : 0,
  });
});

Before(async function (scenario) {
  if (level !== 'quiet') console.log('[INFO]', `▶ Escenario: ${scenario.pickle.name}`);

  this.browser = globalBrowser;
  this.context = await this.browser.newContext({ baseURL: environment.baseUrl });
  this.page = await this.context.newPage();
  this.diagnosticLog = `Ambiente: ${environment.name} | baseUrl: ${environment.baseUrl}\n`;
  this.diagnosticLog += `Escenario: ${scenario.pickle.name}\n\n`;

  if (verbose) {
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
  }
});

After(async function (scenario) {
  const failed = scenario.result?.status === Status.FAILED;

  // Adjuntar screenshot en fallos
  if (failed && this.page) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    await this.attach(screenshot, 'image/png');
  }

  // Adjuntar log de red si es verbose o si falló
  if (this.diagnosticLog && (verbose || failed)) {
    await this.attach(Buffer.from(this.diagnosticLog, 'utf8'), 'text/plain');
  }

  if (level !== 'quiet') console.log('[INFO]', `■ Fin: ${scenario.pickle.name} [${scenario.result?.status}]`);

  if (this.page) await this.page.close();
  if (this.context) await this.context.close();
});

AfterAll(async function () {
  if (globalBrowser) await globalBrowser.close();
});