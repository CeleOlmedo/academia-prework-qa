import { Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

// Given 'que navego a la página' → en common.steps.js
// When 'inicio sesión con el usuario' → en common.steps.js

Then('accedo al catálogo de productos', async function () {
  await expect(this.page).toHaveURL(/.*inventory\.html/);
});

Then('veo el listado de productos', async function () {
  await expect(this.page.locator('.inventory_container')).toBeVisible();
});

Then('veo el mensaje de error {string}', async function (errorText) {
  const error = this.page.getByRole('heading', { name: errorText });
  await expect(error).toBeVisible();
});

Then('permanezco en la pantalla de login', async function () {
  await expect(this.page).not.toHaveURL(/.*inventory\.html/);
  await expect(this.page.getByRole('button', { name: 'Login' })).toBeVisible();
});