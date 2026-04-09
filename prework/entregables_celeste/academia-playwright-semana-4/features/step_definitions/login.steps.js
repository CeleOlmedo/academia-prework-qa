import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { createRequire } from 'module';
import { LoginPage } from '../pages/LoginPage.js';
import { ProductsPage } from '../pages/ProductsPage.js';
import { ERRORS } from '../constants/messages.js';

// Importamos el JSON con createRequire (compatible con Cucumber + ES Modules)
const require = createRequire(import.meta.url);
const usersData = require('../data/users.json');

// Given y When están en common.steps.js

Then('accedo al catálogo de productos', async function () {
  this.productsPage = new ProductsPage(this.page);
  await this.productsPage.isLoaded();
});

Then('veo el listado de productos', async function () {
  const container = await this.productsPage.getInventoryContainer();
  await expect(container).toBeVisible();
});

// Usamos ERRORS.lockedOut de constants/messages.js en lugar del string hardcodeado
Then('veo el mensaje de error de usuario bloqueado', async function () {
  const error = await this.loginPage.getErrorMessage();
  await expect(error).toBeVisible();
  // ERRORS.lockedOut en lugar de escribir el string directamente
  await expect(error).toHaveText(ERRORS.lockedOut);
});

// Mantenemos el step con parámetro para casos genéricos
Then('veo el mensaje de error {string}', async function (errorText) {
  const error = await this.loginPage.getErrorMessage();
  await expect(error).toBeVisible();
  await expect(error).toHaveText(errorText);
});

Then('permanezco en la pantalla de login', async function () {
  await this.loginPage.isAtLogin();
});
