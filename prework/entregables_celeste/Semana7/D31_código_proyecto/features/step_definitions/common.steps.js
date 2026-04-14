import { Given } from '@cucumber/cucumber';
import { LoginPage } from '../../pages/LoginPage.js';
import { ProductsPage } from '../../pages/ProductsPage.js';

Given('que navego a la página de login de SauceDemo', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.gotoLogin();
});

Given('estoy logueado en SauceDemo como usuario estándar', async function () {
  this.loginPage = new LoginPage(this.page);
  this.productsPage = new ProductsPage(this.page);
  await this.loginPage.gotoLogin();
  await this.loginPage.login('standard_user', 'secret_sauce');
  await this.productsPage.expectLoaded();
});
