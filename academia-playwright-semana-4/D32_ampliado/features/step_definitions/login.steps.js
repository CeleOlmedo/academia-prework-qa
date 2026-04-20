import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';

When('inicio sesión con el usuario {string} y la contraseña {string}', async function (usuario, clave) {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.login(usuario, clave);
});

Then('accedo al catálogo de productos', async function () {
  await expect(this.page).toHaveURL(/inventory\.html/);
});
