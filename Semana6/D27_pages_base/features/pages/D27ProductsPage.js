import { BasePage } from './D27BasePage.js';

export class ProductsPage extends BasePage {
    #productsTitle;
    #inventoryContainer;
    #productNames;
    #productPrices;
    #cartLink;

    constructor(page) {
        super(page);
        this.#productsTitle = this.page.getByText('Products');
        this.#inventoryContainer = this.page.locator('.inventory_container');
        this.#productNames = this.page.locator('.inventory_item_name');
        this.#productPrices = this.page.locator('.inventory_item_price');
        this.#cartLink = this.page.locator('.shopping_cart_link');
    }

    async isLoaded() {
        await super.waitForURL(/inventory\.html/);
        await super.waitForVisible(this.#productsTitle);
        await super.waitForVisible(this.#inventoryContainer);
    }

    async sortBy(optionLabel) {
        await this.page.getByRole('combobox').selectOption({ label: optionLabel });
    }

    async getProductNames() {
        const names = await this.#productNames.allTextContents();
        return names.map((n) => n.trim()).filter(Boolean);
    }

    async getProductPrices() {
        const texts = await this.#productPrices.allTextContents();
        return texts
            .map((t) => t.replace('$', '').trim())
            .map((t) => Number.parseFloat(t))
            .filter((n) => Number.isFinite(n));
    }

    async addToCart(productName) {
        const item = this.page
            .locator('.inventory_item')
            .filter({ has: this.page.locator('.inventory_item_name', { hasText: productName }) })
            .first();
        await item.getByRole('button', { name: 'Add to cart' }).click();
    }

    async goToCart() {
        await this.#cartLink.click();
        await super.waitForURL(/cart\.html/);
    }
}