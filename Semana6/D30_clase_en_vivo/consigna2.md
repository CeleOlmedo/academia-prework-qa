CONSIGNA 2A — users.json + import en el step
Completá el JSON y la primera línea de import del step (según Node moderno con JSON module).
Archivo data/users.json:
{
  "validUser": {
    "username": "standard_user",
    "password": "secret_sauce"
  },
  "lockedUser": {
    "username": "locked_out_user",
    "password": "secret_sauce"
  }
}

En login.steps.js querés importar el JSON como módulo. Completá la palabra clave que falta (según la sintaxis que use tu versión de Node / el material del curso):
import usersData from '../data/users.json' with { type: 'json' };
Uso: en un step ficticio, ¿cómo accedés al usuario válido? Escribí una línea de código: 
await this.loginPage.login(usersData.validUser.username, usersData.validUser.password);


CONSIGNA 2B — Constante de mensaje de error
Creá el archivo constants/messages.js exportando un objeto ERRORS con al menos la clave lockedOut y el texto que muestra SauceDemo cuando el usuario está bloqueado .
Plantilla:
// constants/messages.js
export const ERRORS = {
  lockedOut: 'Epic sadface: Sorry, this user has been locked out.',
};

CONSIGNA 1 — Método en CheckoutOverviewPage (suma de precios)
En la página de resumen (checkout-step-two), los precios por ítem usan la clase .inventory_item_price. El subtotal aparece en un elemento con clase .summary_subtotal_label con texto del estilo Item total: $XX.YY.
Completá el método. Reglas: usá allTextContents(), limpiá $, convertí con parseFloat, sumá con reduce.
// CheckoutOverviewPage.js (fragmento)
import { expect } from '@playwright/test';
export class CheckoutOverviewPage {
  constructor(page) {
    this.page = page;
    this.itemPrices = page.locator(___);
    this.subtotalLabel = page.locator(___);
  }
  async expectItemTotalMatchesSum() {
    const texts = await this.itemPrices.___();
    const sum = texts
      .map((t) => parseFloat(t.replace(___, '').trim()))
      .reduce((acc, n) => ___, 0);
    const textoSubtotal = await this.____.textContent();
    const subtotalSinPeso = _____(labelText._____('Item total: $', '').trim());
    expect(____).toBeCloseTo(___, 2);
  }
}

// CheckoutOverviewPage.js (fragmento)
import { expect } from '@playwright/test';

export class CheckoutOverviewPage {
  constructor(page) {
    this.page = page;
    this.itemPrices  = page.locator('.inventory_item_price');
    this.subtotalLabel = page.locator('.summary_subtotal_label');
  }

  async expectItemTotalMatchesSum() {
    const texts = await this.itemPrices.allTextContents();
    const sum = texts
      .map((t) => parseFloat(t.replace('$', '').trim()))
      .reduce((acc, n) => acc + n, 0);

    const textoSubtotal = await this.subtotalLabel.textContent();
    const subtotalSinPeso = parseFloat(labelText.replace('Item total: $', '').trim());

    expect(sum).toBeCloseTo(subtotalSinPeso, 2);
  }
}


CONSIGNA 2 — NavbarComponent (composición)
Completá la clase: locators en el constructor, método goToCart que haga click en el link del carrito (por ejemplo CSS a.shopping_cart_link, getByRole con el nombre accesible, u otro criterio estable; sin duplicar selectores en ProductsPage).
// NavbarComponent.js

export class NavbarComponent {

  constructor(page) {

    this.page = page;

    this.cartLink = page.locator('a.shopping_cart_link');

  }

  async goToCart() {

    await this.cartLink.click();

  }

}
 