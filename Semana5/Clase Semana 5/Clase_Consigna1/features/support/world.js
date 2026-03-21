import { setWorldConstructor } from '@cucumber/cucumber';
import { chromium } from 'playwright';
 
class CustomWorld {
  constructor({ attach } = {}) {
    this.attach = attach;
 
    this.browser = null;
    this.context = null;
    this.page = null;
  }
 
  async open(url) {
    if (this.browser) {
      await this.close();
    }
    const slowMo = Number(process.env.SLOWMO ?? 0);
    this.browser = await chromium.launch({
      headless: process.env.HEADED !== 'true',
      slowMo: Number.isFinite(slowMo) ? slowMo : 0,
    });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    await this.page.goto(url);
  }
 
  async close() {
    try {
      if (this.context) await this.context.close();
    } finally {
      try {
        if (this.browser) await this.browser.close();
      } finally {
        this.browser = null;
        this.context = null;
        this.page = null;
      }
    }
  }
}
 
setWorldConstructor(CustomWorld);