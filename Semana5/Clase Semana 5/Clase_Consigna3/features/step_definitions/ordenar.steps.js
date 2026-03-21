import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

// Given 'estoy logueado en SauceDemo como...' → en common.steps.js

When('ordeno los productos por {string}', async function (criterio) {
  await this.page.locator('[data-test="product-sort-container"]').selectOption(criterio);
});

Then('el primer producto es {string}', async function (nombre) {
  await expect(this.page.locator('.inventory_item_name').first()).toHaveText(nombre);
});

Then('el primer precio es {string}', async function (precio) {
  await expect(this.page.locator('.inventory_item_price').first()).toHaveText(precio);
});