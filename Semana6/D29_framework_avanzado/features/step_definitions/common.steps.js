import { Given, When } from '@cucumber/cucumber';
import { createRequire } from 'module';
import { LoginPage } from '../pages/LoginPage.js';
import { ProductsPage } from '../pages/ProductsPage.js';
import { URLS } from '../constants/urls.js';

// Función auxiliar privada — evita repetir la misma lógica en múltiples steps
async function doLogin(context, username, password) {
  context.loginPage = new LoginPage(context.page);
  await context.loginPage.navigate();
  await context.loginPage.login(username, password);
}

Given('estoy logueado en SauceDemo', async function () {
  await doLogin(this, usersData.validUser.username, usersData.validUser.password);
  this.productsPage = new ProductsPage(this.page);
  await this.productsPage.isLoaded();
});

Given('estoy logueado en SauceDemo como {string} con clave {string}', async function (usuario, clave) {
  await doLogin(this, usuario, clave);
  this.productsPage = new ProductsPage(this.page);
  await this.productsPage.isLoaded();
});

When('inicio sesión con credenciales válidas', async function () {
  await doLogin(this, usersData.validUser.username, usersData.validUser.password);
});

When('inicio sesión con usuario bloqueado', async function () {
  await doLogin(this, usersData.lockedUser.username, usersData.lockedUser.password);
});

When('inicio sesión con el usuario {string} y la contraseña {string}', async function (u, p) {
  await doLogin(this, u, p);
});
