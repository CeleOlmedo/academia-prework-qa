import { When, Then } from '@cucumber/cucumber';
import { LoginPage } from '../../pages/LoginPage.js';
import usersData from '../../data/users.json' with { type: 'json' };

When('inicio sesión con credenciales válidas desde datos', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.gotoLogin();
  await this.loginPage.login(usersData.validUser.username, usersData.validUser.password);
});

When('inicio sesión con usuario bloqueado desde datos', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.gotoLogin();
  await this.loginPage.login(usersData.lockedUser.username, usersData.lockedUser.password);
});

Then('accedo al inventario', async function () {
  await this.loginPage.expectOnInventory();
});

Then('veo el mensaje de error de usuario bloqueado desde constantes', async function () {
  await this.loginPage.expectLockedOutMessage();
});
