// pages/components/NavbarComponent.js

export class NavbarComponent {
  #cartLink;
  #cartBadge;
  #menuButton;
  #logoutLink;

  constructor(page) {
    this.page = page;
    this.#cartLink = page.locator('.shopping_cart_link');
    this.#cartBadge = page.locator('.shopping_cart_badge');
    this.#menuButton = page.locator('#react-burger-menu-btn');
    this.#logoutLink = page.locator('#logout_sidebar_link');
  }

  async goToCart() {
    await this.#cartLink.click();
  }

  async getCartItemCount() {
    const isVisible = await this.#cartBadge.isVisible();
    if (!isVisible) return 0;
    const text = await this.#cartBadge.textContent();
    return parseInt(text.trim(), 10);
  }

  async logout() {
    await this.#menuButton.click();
    await this.#logoutLink.click();
  }
}
