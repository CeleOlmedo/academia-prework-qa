// pages/LoginPage.js
import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';
import { NavbarComponent } from './components/NavbarComponent.js';

export class LoginPage extends BasePage {
  #usernameInput;
  #passwordInput;
  #loginButton;
  #errorMessage;

  constructor(page) {
    super(page);
    this.#usernameInput = this.page.getByPlaceholder('Username');
    this.#passwordInput = this.page.getByPlaceholder('Password');
    this.#loginButton = this.page.getByRole('button', { name: 'Login' });
    this.#errorMessage = this.page.getByRole('heading', { name: /Epic sadface/ });

    this.navbar = new NavbarComponent(page);
  }

  async navigate() {
    await super.navigate('');
  }

  async login(username, password) {
    await this.#usernameInput.fill(username);
    await this.#passwordInput.fill(password);
    await this.#loginButton.click();
  }

  async getErrorMessage() {
    return this.#errorMessage;
  }

  async isAtLogin() {
    await expect(this.page).not.toHaveURL(/.*inventory\.html/);
    await expect(this.#loginButton).toBeVisible();
  }
}
