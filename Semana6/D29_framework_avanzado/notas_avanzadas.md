# D29 - Esperas dinámicas, POM Avanzado y Datos - Olmedo Celeste

## Método de JavaScript para iterar y sumar precios del checkout

Para calcular el subtotal dinámicamente se encadenaron tres métodos:

const textos = await this.#itemPrices.allTextContents(); // ["$29.99", "$9.99"]
const precios = textos.map(t => parseFloat(t.replace('$', '')));  // [29.99, 9.99]
const total = precios.reduce((acum, precio) => acum + precio, 0); // 39.98

El resultado no tiene precios hardcodeados: si se cambian los productos en el `Cuando`, el `Entonces` sigue pasando porque la matemática se recalcula en vivo desde la UI.

## Cambios para el día 29

**Parte A — Esperas dinámicas:** se creó `tests_dinamicos/dynamic_loading.spec.js` apuntando a `the-internet.herokuapp.com`. Se usa `expect(locator).toBeVisible()` para el auto-wait, sin usar `waitForTimeout()`.

**Parte B — Datos y constantes:** se crearon `data/users.json` con las credenciales y `constants/messages.js` + `urls.js` con textos y URLs centralizadas. `common.steps.js` y `login.steps.js` se modificaron para importar y usar esos archivos en lugar de strings escritos a mano.

**Parte C — NavbarComponent:** se creó `pages/components/NavbarComponent.js` con los selectores del carrito, badge y menú hamburguesa. `ProductsPage`, `CartPage` y `LoginPage` lo instancian en el constructor (`this.navbar = new NavbarComponent(page)`). Los steps usan `productsPage.navbar.goToCart()` en lugar de acceder al carrito directamente.

**Parte D — Checkout E2E:** se crearon `CheckoutStep1Page.js`, `CheckoutOverviewPage.js`, `checkout.steps.js` y `checkout_complejo.feature` cubriendo el flujo completo de compra con validación matemática del subtotal.
