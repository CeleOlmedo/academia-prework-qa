import { Before, After, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

setDefaultTimeout(30000);

Before(async function () {
  if (this.browser && this.browser.isConnected()) {
    await this.browser.close();
  }

  this.browser = await chromium.launch({ headless: false });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();

  this.clearTestData = async () => {
    await this.context.clearCookies();
    await this.page.evaluate(() => {
      try { localStorage.clear(); } catch (_error) {}
      try { sessionStorage.clear(); } catch (_error) {}
    });
  };

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

  if (this.clearTestData && this.page && !this.page.isClosed()) {
    await this.clearTestData();
  }

  if (this.close) await this.close();
});