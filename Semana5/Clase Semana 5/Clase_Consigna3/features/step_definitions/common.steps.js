// common.steps.js — steps reutilizables por todas las features
import { Given, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

// Navegación genérica (reemplaza todos los "goto" hardcodeados)
Given('que navego a la página {string}', async function (url) {
  await this.page.goto(url);
});

// Login completo como precondición — con parámetros para que sirva a cualquier usuario
Given('estoy logueado en SauceDemo como {string} con clave {string}', async function (usuario, clave) {
  await this.page.goto('https://www.saucedemo.com/');
  await this.page.getByPlaceholder('Username').fill(usuario);
  await this.page.getByPlaceholder('Password').fill(clave);
  await this.page.getByRole('button', { name: 'Login' }).click();
  await expect(this.page).toHaveURL(/.*inventory\.html/);
});

// Acción de login (para cuando el navegador ya está en la página)
When('inicio sesión con el usuario {string} y la contraseña {string}', async function (u, p) {
  await this.page.getByPlaceholder('Username').fill(u);
  await this.page.getByPlaceholder('Password').fill(p);
  await this.page.getByRole('button', { name: 'Login' }).click();
});