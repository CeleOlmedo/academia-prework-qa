const { Given, When, Then, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

setDefaultTimeout(30000);


Given('tengo conexión estable a internet y un navegador funcional', async function (){
});

Given('no tengo una sesión iniciada', async function (){
if (this.page){
    await this.close();
}
});

Given('existe el usuario {string}', async function (_username){
});

Given('su password es {string}', async function (_password){
});

Given('el usuario está habilitado para iniciar sesión', async function (){
});

Given('el usuario está bloqueado para iniciar sesión', async function (){
});

Given('estoy en la pantalla de login de SauceDemo {string}', async function (url){
await this.open(url);
});

Given('el formulario de login es visible', async function (){
await expect(this.page.getByPlaceholder('Username')).toBeVisible();
await expect(this.page.getByPlaceholder('Password')).toBeVisible();
await expect(this.page.getByRole('button', { name: 'Login' })).toBeVisible();
});

When('inicio sesion con usuario {string} y password {string}', async function (username, password){
    await this.page.getByPlaceholder('Username').fill(username);
    await this.page.getByPlaceholder('Password').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
});

Then('veo la pagina de productos', async function (){
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.page.getByText('Products')).toBeVisible();
});

Then('se muestra el listado de productos', async function (){
    await expect(this.page.locator('.inventory_container')).toBeVisible();
});

Then('veo un mensaje de error de login {string}', async function (errorText){
const error = this.page.getByRole('heading', { name: errorText });
await expect(error).toBeVisible();
});

Then('continúo en la pantalla de login', async function (){
await expect(this.page).toHaveURL('https://www.saucedemo.com/');
await expect(this.page.getByRole('button', { name: 'Login' })).toBeVisible();
});

Then('no se crea una sesión válida', async function (){
await expect(this.page).not.toHaveURL(/inventory\.html/);
await expect(this.page.getByRole('button', { name: 'Login' })).toBeVisible();
});

After(async function (){
await this.close();
});