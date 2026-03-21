import { setWorldConstructor } from '@cucumber/cucumber';
import { chromium } from 'playwright';

class CustomWorld {
  constructor() {
    this.browser = null;
    this.context = null;
    this.page = null;
  }

  async open(url) {
    if (this.browser && this.browser.isConnected()) {
      await this.close();
    }
    this.browser = await chromium.launch({ headless: false });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    await this.page.goto(url);
  }

  async close() {
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
    this.browser = null;
    this.context = null;
    this.page = null;
  }
}

setWorldConstructor(CustomWorld);