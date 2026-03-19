const { Given, When, Then, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

setDefaultTimeout(30000);

Given('el usuario no está logueado', async function () {
    if (this.page) {
        await this.close();
    }
});

Given('el usuario está en la página de login', async function () {
    await this.open('https://www.saucedemo.com/');
    await expect(this.page.getByPlaceholder('Username')).toBeVisible();
    await expect(this.page.getByPlaceholder('Password')).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Login' })).toBeVisible();
});

When('ingresa username {string} y password {string}', async function (username, password) {
    await this.page.getByPlaceholder('Username').fill(username);
    await this.page.getByPlaceholder('Password').fill(password);
});

When('hace click en login', async function () {
    await this.page.getByRole('button', { name: 'Login' }).click();
});

Then('se muestra el mensaje de error {string}', async function (errorText) {
    const error = this.page.getByRole('heading', { name: errorText });
    await expect(error).toBeVisible();
    await expect(this.page).toHaveURL('https://www.saucedemo.com/');
});

After(async function () {
    await this.close();
});
