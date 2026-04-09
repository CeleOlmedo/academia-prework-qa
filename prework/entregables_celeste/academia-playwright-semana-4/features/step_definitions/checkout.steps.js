// step_definitions/checkout.steps.js
import { When, Then } from '@cucumber/cucumber';
import { CartPage }             from '../pages/CartPage.js';
import { CheckoutStep1Page }    from '../pages/CheckoutStep1Page.js';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage.js';

// El Given de login viene reutilizado de common.steps.js

When('agrego {string} al carrito', async function (producto) {
  await this.productsPage.addToCart(producto);
});

When('navego al carrito', async function () {
  // Usa NavbarComponent por composición, sin acceder al carrito directamente
  await this.productsPage.navbar.goToCart();
  this.cartPage = new CartPage(this.page);
  await this.cartPage.isLoaded();
});

When('presiono el botón de Checkout', async function () {
  await this.cartPage.clickCheckout();
});

When('completo los datos de envío con nombre {string}, apellido {string} y zip {string}',
  async function (nombre, apellido, zip) {
    this.checkoutStep1 = new CheckoutStep1Page(this.page);
    await this.checkoutStep1.fillShippingInfo(nombre, apellido, zip);
  }
);

Then('el subtotal mostrado debe ser exactamente la suma de los precios de los productos',
  async function () {
    this.checkoutOverview = new CheckoutOverviewPage(this.page);
    await this.checkoutOverview.validateSubtotalMatchesItemSum();
  }
);

Then('el usuario completa la compra exitosamente', async function () {
  await this.checkoutOverview.clickFinish();
  // El locator vive en la Page, el step solo llama al método
  await this.checkoutOverview.isOrderComplete();
});
