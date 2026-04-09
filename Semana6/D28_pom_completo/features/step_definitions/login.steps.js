import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { ProductsPage } from '../pages/ProductsPage.js';

// Given y When están en common.steps.js

Then('accedo al catálogo de productos', async function () {
  this.productsPage = new ProductsPage(this.page);
  await this.productsPage.isLoaded();
});

Then('veo el listado de productos', async function () {
  const container = await this.productsPage.getInventoryContainer();
  await expect(container).toBeVisible();
});

Then('veo el mensaje de error {string}', async function (errorText) {
  const error = await this.loginPage.getErrorMessage();
  await expect(error).toBeVisible();
});

Then('permanezco en la pantalla de login', async function () {
  await this.loginPage.isAtLogin();
});
