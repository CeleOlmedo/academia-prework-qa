import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CartPage } from '../pages/CartPage.js';

// Given reutilizado de common.steps.js

When('agrego el producto {string} al carrito', async function (producto) {
  await this.productsPage.addToCart(producto);
});

Then('el carrito muestra el producto {string} con su precio {string}', async function (producto, precio) {
  await this.productsPage.goToCart();

  this.cartPage = new CartPage(this.page);
  await this.cartPage.isLoaded();

  const cartItem = await this.cartPage.getCartItem(producto);
  await expect(cartItem).toBeVisible();

  const priceLocator = await this.cartPage.getItemPrice(producto);
  await expect(priceLocator).toHaveText(`$${precio}`);
});
