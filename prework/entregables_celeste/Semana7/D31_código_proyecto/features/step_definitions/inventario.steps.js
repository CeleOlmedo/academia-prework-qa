import { When } from '@cucumber/cucumber';
import { LoginPage } from '../../pages/LoginPage.js';
import { ProductsPage } from '../../pages/ProductsPage.js';

When('compro el primer producto visible', async function () {
  this.loginPage = new LoginPage(this.page);
  this.productsPage = new ProductsPage(this.page);
  await this.loginPage.gotoLogin();
  await this.loginPage.login('standard_user', 'secret_sauce');
  await this.productsPage.expectLoaded();
  await this.productsPage.addFirstProductToCart();
});
