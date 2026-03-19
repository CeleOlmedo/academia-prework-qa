const { Before, After, Status, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

setDefaultTimeout(30000);

Before(async function () {
  if (this.browser && this.browser.isConnected()) {
    await this.browser.close();
  }

  // Hooks de setup/teardown centralizados para reutilizar `this.page`.
  this.browser = await chromium.launch({ headless: false });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();

  this.clearTestData = async () => {
    // Limpieza de estado para evitar arrastre entre escenarios.
    await this.context.clearCookies();
    await this.page.evaluate(() => {
      try {
        localStorage.clear();
      } catch (_error) {
        // Algunos documentos (ej. about:blank) no permiten acceso a storage.
      }
      try {
        sessionStorage.clear();
      } catch (_error) {
        // Mismo motivo: evitar fallar el hook por restricciones del documento.
      }
    });
  };

  // Compatibilidad: algunas step definitions del curso usan `this.open()` y `this.close()`.
  this.open = async (url) => {
    if (!this.browser || !this.browser.isConnected()) {
      throw new Error('El browser no está disponible: verify que el hook Before se ejecutó.');
    }
    await this.page.goto(url);
  };

  this.close = async () => {
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
    this.browser = null;
    this.context = null;
    this.page = null;
  };

  // Limpieza al inicio de cada test.
  await this.clearTestData();
});

After(async function (scenario) {
  if (scenario.result?.status === Status.FAILED && this.page && !this.page.isClosed()) {
    const screenshotsDir = path.resolve(process.cwd(), 'artifacts', 'screenshots');
    fs.mkdirSync(screenshotsDir, { recursive: true });

    const safeName = (scenario.pickle?.name || 'scenario')
      .replace(/[<>:"/\\|?*\x00-\x1F]/g, '_')
      .replace(/\s+/g, '_');
    const screenshotPath = path.join(screenshotsDir, `${Date.now()}-${safeName}.png`);

    await this.page.screenshot({ path: screenshotPath, fullPage: true });
  }

  // Limpieza al final de cada test.
  if (this.clearTestData && this.page && !this.page.isClosed()) {
    await this.clearTestData();
  }

  // Teardown centralizado.
  if (this.close) await this.close();
});

