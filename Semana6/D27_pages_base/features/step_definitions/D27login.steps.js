import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/D27LoginPage.js';
import { ProductsPage } from '../pages/D27ProductsPage.js';

setDefaultTimeout(30000);

// ---------------------------
// Background
// ---------------------------

Given('estoy en la pantalla de login de SauceDemo {string}', async function (url) {
  // Antes: await this.open(url) — URL manejada por world
  // Ahora: LoginPage encapsula la navegación
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigate();
});

Given('el formulario de login es visible', async function () {
  // Antes: 3 líneas de expect con selectores hardcodeados
  // Ahora: LoginPage.isLoaded() centraliza esa verificación
  await this.loginPage.isLoaded();
});

// ---------------------------
// Login válido
// ---------------------------

When('inicio sesion con usuario {string} y password {string}', async function (username, password) {
  // Antes: 3 líneas de fill/fill/click con selectores directos
  // Ahora: un método que los encapsula
  await this.loginPage.login(username, password);
});

Then('veo la pagina de productos', async function () {
  // Antes: expect(this.page).toHaveURL + expect(getByText('Products'))
  // Ahora: ProductsPage.isLoaded() centraliza ambas verificaciones
  this.productsPage = new ProductsPage(this.page);
  await this.productsPage.isLoaded();
});

Then('se muestra el listado de productos', async function () {
  // La verificación del contenedor ya está incluida en productsPage.isLoaded()
  // Este step queda como alias semántico para no romper el feature existente
  await expect(this.page.locator('.inventory_container')).toBeVisible(); 
});

// ---------------------------
// Login inválido
// ---------------------------

When('ingresa username {string} y password {string}', async function (username, password) {
  // Reutilizamos loginPage instanciado en el Background
  await this.loginPage.login(username, password);
});

Then('se muestra el mensaje de error {string}', async function (errorText) {
  // Antes: this.page.getByRole('heading', { name: errorText }) hardcodeado
  // Ahora: LoginPage.getErrorMessage() abstrae el selector
  const message = await this.loginPage.getErrorMessage();
  expect(message).toContain(errorText);
});
