import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
 
// Ya no llamamos this.open() — el Hook Before creó this.page.
// Solo navegamos y logueamos.
Given('navego a SauceDemo y me logueo', async function () {
  await this.page.goto('https://www.saucedemo.com/');
  await this.page.getByPlaceholder('Username').fill('standard_user');
  await this.page.getByPlaceholder('Password').fill('secret_sauce');
  await this.page.getByRole('button', { name: 'Login' }).click();
  await expect(this.page).toHaveURL(/.*inventory\.html/);
});
 
When('ordeno los productos por {string}', async function (criterio) {
  await this.page.locator('[data-test="product-sort-container"]').selectOption(criterio);
});
 
Then('el primer producto es {string}', async function (nombreEsperado) {
  await expect(this.page.locator('.inventory_item_name').first()).toHaveText(nombreEsperado);
});
 
Then('el primer precio es {string}', async function (precioEsperado) {
  await expect(this.page.locator('.inventory_item_price').first()).toHaveText(precioEsperado);
});
 
// Sin After aquí: el hook After en hooks.js lo maneja.