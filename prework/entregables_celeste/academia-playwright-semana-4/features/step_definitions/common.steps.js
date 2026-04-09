import { Given, When } from '@cucumber/cucumber';
import { createRequire } from 'module';
import { LoginPage } from '../pages/LoginPage.js';
import { ProductsPage } from '../pages/ProductsPage.js';
import { URLS } from '../constants/urls.js';

// Importamos el JSON con createRequire (compatible con Cucumber + ES Modules)
const require = createRequire(import.meta.url);
const usersData = require('../data/users.json');

// Navegación genérica — usa la URL base centralizada en constants/urls.js
Given('que navego a la página de login', async function () {
  await this.page.goto(URLS.login);
});

// Navegación genérica con URL explícita (para otros features que la necesiten)
Given('que navego a la página {string}', async function (url) {
  await this.page.goto(url);
});

// Login completo como precondición — usa usersData.validUser del JSON
Given('estoy logueado en SauceDemo', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigate();
  // Reemplazamos el hardcode por llamada al JSON: usersData.validUser.username
  await this.loginPage.login(usersData.validUser.username, usersData.validUser.password);

  this.productsPage = new ProductsPage(this.page);
  await this.productsPage.isLoaded();
});

// Mantenemos el step con parámetros para los casos de usuario inválido/bloqueado
Given('estoy logueado en SauceDemo como {string} con clave {string}', async function (usuario, clave) {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigate();
  await this.loginPage.login(usuario, clave);

  this.productsPage = new ProductsPage(this.page);
  await this.productsPage.isLoaded();
});

// Acción de login con usuario válido del JSON
When('inicio sesión con credenciales válidas', async function () {
  this.loginPage = new LoginPage(this.page);
  // usersData.validUser.username en lugar del string hardcodeado
  await this.loginPage.login(usersData.validUser.username, usersData.validUser.password);
});

// Acción de login con usuario bloqueado del JSON
When('inicio sesión con usuario bloqueado', async function () {
  this.loginPage = new LoginPage(this.page);
  // usersData.lockedUser.username en lugar del string hardcodeado
  await this.loginPage.login(usersData.lockedUser.username, usersData.lockedUser.password);
});

// Mantenemos el step con parámetros para flexibilidad
When('inicio sesión con el usuario {string} y la contraseña {string}', async function (u, p) {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.login(u, p);
});
