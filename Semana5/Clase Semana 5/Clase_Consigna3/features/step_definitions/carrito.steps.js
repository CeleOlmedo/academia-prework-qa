import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

// Given 'estoy logueado en SauceDemo como...' → en common.steps.js

When('agrego el producto {string} al carrito', async function (producto) {
  const item = this.page.locator('.inventory_item').filter({
    has: this.page.getByText(producto),
  });
  await item.getByRole('button', { name: /Add to cart/i }).click();
});

Then('el carrito muestra el producto {string} con su precio {string}', async function (producto, precio) {
  await this.page.locator('.shopping_cart_link').click();
  await expect(this.page).toHaveURL(/.*cart\.html/);
  const cartItem = this.page.locator('.cart_item').filter({ has: this.page.getByText(producto) });
  await expect(cartItem).toBeVisible();
  await expect(cartItem.locator('.inventory_item_price')).toHaveText(`$${precio}`);
});