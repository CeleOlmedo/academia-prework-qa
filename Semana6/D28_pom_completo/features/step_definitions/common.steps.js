import { Given, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { ProductsPage } from '../pages/ProductsPage.js';

// Navegación genérica
Given('que navego a la página {string}', async function (url) {
  await this.page.goto(url);
});

// Login completo como precondición
Given('estoy logueado en SauceDemo como {string} con clave {string}', async function (usuario, clave) {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigate();
  await this.loginPage.login(usuario, clave);

  this.productsPage = new ProductsPage(this.page);
  await this.productsPage.isLoaded();
});

// Acción de login (cuando ya estamos en la página de login)
When('inicio sesión con el usuario {string} y la contraseña {string}', async function (u, p) {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.login(u, p);
});
