import { BasePage } from './D27BasePage.js';

export class LoginPage extends BasePage {
    #usernameInput;
    #passwordInput;
    #loginButton;

    constructor(page) {
        super(page);
        this.#usernameInput = this.page.getByPlaceholder('Username');
        this.#passwordInput = this.page.getByPlaceholder('Password');
        this.#loginButton   = this.page.getByRole('button', { name: 'Login' });
    }

    async navigate() {
        await super.navigate('');
    }

    async isLoaded() {
        await super.waitForVisible(this.#usernameInput);
        await super.waitForVisible(this.#passwordInput);
        await super.waitForVisible(this.#loginButton);
    }

    async login(username, password) {
        await this.#usernameInput.fill(username);
        await this.#passwordInput.fill(password);
        await this.#loginButton.click();
    }

    async getErrorMessage() {
        return this.page.locator('[data-test="error"]').textContent();
    }
}