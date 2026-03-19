const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

setDefaultTimeout(30000);

const DEFAULT_URL = 'https://www.saucedemo.com/';
const DEFAULT_USERNAME = 'standard_user';
const DEFAULT_PASSWORD = 'secret_sauce';

async function loginSauceDemo(page, url, username = DEFAULT_USERNAME, password = DEFAULT_PASSWORD) {
  await page.goto(url);

  await page.getByPlaceholder('Username').fill(username);
  await page.getByPlaceholder('Password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/inventory\.html/);
  await expect(page.getByText('Products')).toBeVisible();
}

async function ensureOnProductsPage(page) {
  if (!page.url().includes('inventory.html')) {
    await loginSauceDemo(page, DEFAULT_URL);
  }
}

async function selectSortOption(page, optionLabel) {
  const sortSelect = page.getByRole('combobox');
  await sortSelect.selectOption({ label: optionLabel });
  // La tabla se re-renderiza en la misma página.
  await page.waitForTimeout(300);
}

async function getInventoryPrices(page) {
  // En SauceDemo los precios están en elementos con clase `.inventory_item_price`.
  const priceTexts = await page.locator('.inventory_item_price').allTextContents();
  return priceTexts
    .map((t) => t.replace('$', '').trim())
    .map((t) => Number.parseFloat(t))
    .filter((n) => Number.isFinite(n));
}

async function getInventoryNames(page) {
  const names = await page.locator('.inventory_item_name').allTextContents();
  return names.map((n) => n.trim()).filter(Boolean);
}

async function goToCart(page) {
  if (!page.url().includes('cart.html')) {
    await page.locator('a.shopping_cart_link').click();
    await expect(page).toHaveURL(/cart\.html/);
  }
}

Given('estoy logueado en SauceDemo {string}', async function (url) {
  await loginSauceDemo(this.page, url);
});

Given('el usuario está autenticado', async function () {
  await loginSauceDemo(this.page, DEFAULT_URL);
});

When('selecciona ordenar por precio de menor a mayor', async function () {
  await ensureOnProductsPage(this.page);
  await selectSortOption(this.page, 'Price (low to high)');
});

When('selecciona ordenar por precio de mayor a menor', async function () {
  await ensureOnProductsPage(this.page);
  await selectSortOption(this.page, 'Price (high to low)');
});

When('selecciona ordenar por nombre A-Z', async function () {
  await ensureOnProductsPage(this.page);
  await selectSortOption(this.page, 'Name (A to Z)');
});

When('selecciona ordenar por nombre Z-A', async function () {
  await ensureOnProductsPage(this.page);
  await selectSortOption(this.page, 'Name (Z to A)');
});

Then('los productos se muestran ordenados por precio ascendente', async function () {
  const prices = await getInventoryPrices(this.page);
  for (let i = 1; i < prices.length; i++) {
    expect(prices[i]).toBeGreaterThanOrEqual(prices[i - 1]);
  }
});

Then('los productos se muestran ordenados por precio descendente', async function () {
  const prices = await getInventoryPrices(this.page);
  for (let i = 1; i < prices.length; i++) {
    expect(prices[i]).toBeLessThanOrEqual(prices[i - 1]);
  }
});

Then('los productos se muestran en orden alfabético ascendente', async function () {
  const names = await getInventoryNames(this.page);
  const normalized = names.map((n) => n.toLowerCase());
  for (let i = 1; i < normalized.length; i++) {
    expect(normalized[i].localeCompare(normalized[i - 1], 'en', { sensitivity: 'base' })).toBeGreaterThanOrEqual(0);
  }
});

Then('los productos se muestran en orden alfabético descendente', async function () {
  const names = await getInventoryNames(this.page);
  const normalized = names.map((n) => n.toLowerCase());
  for (let i = 1; i < normalized.length; i++) {
    expect(normalized[i].localeCompare(normalized[i - 1], 'en', { sensitivity: 'base' })).toBeLessThanOrEqual(0);
  }
});

When('agrego el producto {string} al carrito', async function (producto) {
  await ensureOnProductsPage(this.page);

  const item = this.page
    .locator('.inventory_item')
    .filter({
      has: this.page.locator('.inventory_item_name', { hasText: producto }),
    })
    .first();

  await item.getByRole('button', { name: 'Add to cart' }).click();
});

Then('el carrito muestra el producto {string} con su precio {string}', async function (producto, precio) {
  await goToCart(this.page);

  await expect(this.page.getByText(producto, { exact: true })).toBeVisible();

  const expectedPrice = `$${precio.trim()}`;
  await expect(this.page.getByText(expectedPrice)).toBeVisible();
});

