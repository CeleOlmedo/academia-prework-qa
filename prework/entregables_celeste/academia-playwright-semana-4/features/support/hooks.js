import { BeforeAll, AfterAll, Before, After, Status } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import { ProductsPage } from '../pages/ProductsPage.js';

let globalBrowser;

BeforeAll(async function () {
  const slowMo = Number(process.env.SLOWMO ?? 0);
  globalBrowser = await chromium.launch({
    headless: process.env.HEADED !== 'true',
    slowMo: Number.isFinite(slowMo) ? slowMo : 0,
  });
});

Before(async function () {
  this.browser = globalBrowser;
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
  this.productsPage = new ProductsPage(this.page);
});

After(async function (scenario) {
  if (scenario.result?.status === Status.FAILED && this.page) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    await this.attach(screenshot, 'image/png');
  }
  if (this.page) await this.page.close();
  if (this.context) await this.context.close();
});

AfterAll(async function () {
  if (globalBrowser) await globalBrowser.close();
});
