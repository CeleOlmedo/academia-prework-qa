import { Given, When, Then } from '@cucumber/cucumber';
import usersData from '../../data/users.json' with { type: 'json' };
import { LoginPage } from '../../pages/LoginPage.js';
import { ProductsPage } from '../../pages/ProductsPage.js';
import { CartPage } from '../../pages/CartPage.js';
import { CheckoutPage } from '../../pages/CheckoutPage.js';
import { CheckoutOverviewPage } from '../../pages/CheckoutOverviewPage.js';

function initCheckoutPages(world) {
  world.loginPage = new LoginPage(world.page);
  world.productsPage = new ProductsPage(world.page);
  world.cartPage = new CartPage(world.page);
  world.checkoutPage = new CheckoutPage(world.page);
  world.checkoutOverviewPage = new CheckoutOverviewPage(world.page);
}

Given('inicio sesión con usuario válido desde datos', async function () {
  initCheckoutPages(this);
  await this.loginPage.gotoLogin();
  await this.loginPage.login(usersData.validUser.username, usersData.validUser.password);
  await this.productsPage.expectLoaded();
});

When('agrego los productos {string} y {string} al carrito', async function (a, b) {
  await this.productsPage.addProductToCart(a);
  await this.productsPage.addProductToCart(b);
});

When('navego al carrito desde navbar', async function () {
  await this.productsPage.navbar.goToCart();
  await this.cartPage.expectLoaded();
});

When(
  'completo datos de envío {string}, {string}, {string}',
  async function (firstName, lastName, zip) {
    await this.cartPage.goToCheckout();
    await this.checkoutPage.expectStepOneLoaded();
    await this.checkoutPage.fillShippingInfo(firstName, lastName, zip);
    await this.checkoutPage.continueToOverview();
  }
);

Then('el total mostrado coincide con la suma de precios de los ítems', async function () {
  await this.checkoutOverviewPage.expectItemTotalMatchesSum();
});
