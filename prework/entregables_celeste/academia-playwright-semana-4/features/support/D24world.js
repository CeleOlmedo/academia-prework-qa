const { setWorldConstructor } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

class CustomWorld {
constructor() {
    this.browser = null;
    this.context = null;
    this.page = null;
}

async open(url) {
    // Evita arrastrar sesiones anteriores si `open` se invoca más de una vez.
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

