import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/D27LoginPage.js';
import { ProductsPage } from '../pages/D27ProductsPage.js';

// ---------------------------
// Background
// ---------------------------

Given('estoy logueado en SauceDemo {string}', async function (url) {
  // Antes: loginSauceDemo(this.page, url) — función helper suelta en D24.steps.js
  // Ahora: cada Page se instancia y orquesta desde el step
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigate();
  await this.loginPage.login('standard_user', 'secret_sauce');

  this.productsPage = new ProductsPage(this.page);
  await this.productsPage.isLoaded();
});

// ---------------------------
// Ordenamiento
// ---------------------------

When('selecciona ordenar por precio de menor a mayor', async function () {
  // Antes: ensureOnProductsPage() + selectSortOption() — 2 helpers sueltos
  // Ahora: un método de Page
  await this.productsPage.sortBy('Price (low to high)');
});

When('selecciona ordenar por precio de mayor a menor', async function () {
  await this.productsPage.sortBy('Price (high to low)');
});

When('selecciona ordenar por nombre A-Z', async function () {
  await this.productsPage.sortBy('Name (A to Z)');
});

When('selecciona ordenar por nombre Z-A', async function () {
  await this.productsPage.sortBy('Name (Z to A)');
});

Then('los productos se muestran ordenados por precio ascendente', async function () {
  // Antes: locator('.inventory_item_price').allTextContents() + parsing inline
  // Ahora: ProductsPage.getProductPrices() encapsula el locator y el parsing
  const prices = await this.productsPage.getProductPrices();
  for (let i = 1; i < prices.length; i++) {
    expect(prices[i]).toBeGreaterThanOrEqual(prices[i - 1]);
  }
});

Then('los productos se muestran ordenados por precio descendente', async function () {
  const prices = await this.productsPage.getProductPrices();
  for (let i = 1; i < prices.length; i++) {
    expect(prices[i]).toBeLessThanOrEqual(prices[i - 1]);
  }
});

Then('los productos se muestran en orden alfabético ascendente', async function () {
  // Antes: locator('.inventory_item_name').allTextContents() + normalización inline
  // Ahora: ProductsPage.getProductNames() encapsula el locator y el trim
  const names = await this.productsPage.getProductNames();
  const normalized = names.map((n) => n.toLowerCase());
  for (let i = 1; i < normalized.length; i++) {
    expect(normalized[i].localeCompare(normalized[i - 1], 'en', { sensitivity: 'base' })).toBeGreaterThanOrEqual(0);
  }
});

Then('los productos se muestran en orden alfabético descendente', async function () {
  const names = await this.productsPage.getProductNames();
  const normalized = names.map((n) => n.toLowerCase());
  for (let i = 1; i < normalized.length; i++) {
    expect(normalized[i].localeCompare(normalized[i - 1], 'en', { sensitivity: 'base' })).toBeLessThanOrEqual(0);
  }
});
