import { Given } from '@cucumber/cucumber';
import fs from 'fs';
import path from 'path';
import { LoginPage } from '../../pages/LoginPage.js';
import { ProductsPage } from '../../pages/ProductsPage.js';

const REPORTS_SCREENSHOTS_DIR = path.join(process.cwd(), 'reports', 'screenshots');

Given('que navego a la página de login de SauceDemo', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.gotoLogin();

  if (process.env.SCREENSHOT_CHECKPOINT_LOGIN === 'true' && this.page) {
    fs.mkdirSync(REPORTS_SCREENSHOTS_DIR, { recursive: true });
    const png = await this.page.screenshot({ fullPage: true });
    await this.attach(png, 'image/png');
    const diskPath = path.join(
      REPORTS_SCREENSHOTS_DIR,
      `CHECKPOINT_login_${Date.now()}.png`
    );
    fs.writeFileSync(diskPath, png);
  }
});

Given('estoy logueado en SauceDemo como usuario estándar', async function () {
  this.loginPage = new LoginPage(this.page);
  this.productsPage = new ProductsPage(this.page);
  await this.loginPage.gotoLogin();
  await this.loginPage.login('standard_user', 'secret_sauce');
  await this.productsPage.expectLoaded();
});
