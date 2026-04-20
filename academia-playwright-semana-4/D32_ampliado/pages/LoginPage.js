import { expect } from '@playwright/test';
import { ERRORS } from '../constants/messages.js';
import { URL_PATTERNS } from '../constants/urls.js';

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorBanner = page.locator('.error-message-container h3');
  }

  // Ruta relativa — baseURL viene del contexto de Playwright (configurado en hooks.js)
  async gotoLogin() {
    await this.page.goto('/');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectOnInventory() {
    await expect(this.page).toHaveURL(URL_PATTERNS.inventory);
  }

  async expectLockedOutMessage() {
    await expect(this.errorBanner).toHaveText(ERRORS.lockedOut);
  }
}
