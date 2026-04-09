import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

// Given reutilizado de common.steps.js

When('ordeno los productos por {string}', async function (criterio) {
  await this.productsPage.sortBy(criterio);
});

Then('el primer producto es {string}', async function (nombre) {
  const firstName = await this.productsPage.getFirstProductName();
  await expect(firstName).toHaveText(nombre);
});

Then('el primer precio es {string}', async function (precio) {
  const firstPrice = await this.productsPage.getFirstProductPrice();
  await expect(firstPrice).toHaveText(precio);
});
