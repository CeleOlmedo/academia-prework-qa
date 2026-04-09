// pages/components/NavbarComponent.js
// Componente reutilizable. Al encapsularlo acá evitamos duplicar
// selectores de la barra en ProductsPage, CartPage, etc.

export class NavbarComponent {
  #cartLink;
  #cartBadge;
  #menuButton;
  #logoutLink;

  constructor(page) {
    this.page = page;
    this.#cartLink   = page.locator('.shopping_cart_link');
    this.#cartBadge  = page.locator('.shopping_cart_badge');
    this.#menuButton = page.locator('#react-burger-menu-btn');
    this.#logoutLink = page.locator('#logout_sidebar_link');
  }

  /** Navega al carrito */
  async goToCart() {
    await this.#cartLink.click();
  }

  /** Devuelve la cantidad de ítems en el carrito como número entero */
  async getCartItemCount() {
    const isVisible = await this.#cartBadge.isVisible();
    if (!isVisible) return 0;
    const text = await this.#cartBadge.textContent();
    return parseInt(text.trim(), 10);
  }

  /** Abre el menú lateral y hace logout */
  async logout() {
    await this.#menuButton.click();
    await this.#logoutLink.click();
  }
}
