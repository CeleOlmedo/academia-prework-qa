const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

setDefaultTimeout(30000);

Before(async function () {
  // Hooks de setup/teardown centralizados para reutilizar `this.page`.
  this.browser = await chromium.launch({ headless: false });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();

  // Compatibilidad: algunas step definitions del curso usan `this.open()` y `this.close()`.
  this.open = async (url) => {
    await this.page.goto(url);
  };

  this.close = async () => {
    if (this.browser) await this.browser.close();
    this.browser = null;
    this.context = null;
    this.page = null;
  };
});

After(async function () {
  // Teardown centralizado.
  if (this.close) await this.close();
});

