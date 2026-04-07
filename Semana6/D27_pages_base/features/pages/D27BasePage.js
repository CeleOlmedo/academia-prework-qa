const BASE_URL = 'https://www.saucedemo.com/';

export class BasePage {
    #page;

    constructor(page) {
        this.#page = page;
    }

    get page() {
        return this.#page;
    }

    async navigate(path = '') {
        await this.#page.goto(`${BASE_URL}${path}`);
    }

    async waitForURL(pattern) {
        await this.#page.waitForURL(pattern);
    }
    
    async waitForVisible(locator) {
    await locator.waitFor({ state: 'visible' });
    }
}