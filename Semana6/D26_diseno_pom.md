# D26 – Conceptos y beneficios de POM - Olmedo Celeste

1) **Qué problema estoy viendo hoy**

Señales de "código difícil de mantener":

- **Selectores de UI duplicados entre archivos**: `.inventory_item_price`, `.inventory_item_name`, `.shopping_cart_link` y `[data-test="product-sort-container"]` aparecen hardcodeados en `carrito.steps.js`, `ordenar.steps.js` y `D24.steps.js` sin un punto único de verdad.

- **Lógica de login repetida en múltiples lugares**: la secuencia `goto → fill username → fill password → click Login → expect URL` está copiada en `common.steps.js`, `D24.steps.js` y en la función helper `loginSauceDemo()` de D24, con ligeras variaciones entre sí.

- **Funciones helper sueltas dentro del archivo de steps**: en `D24.steps.js` hay funciones como `loginSauceDemo()`, `ensureOnProductsPage()`, `selectSortOption()`, `getInventoryPrices()`, `goToCart()` — lógica de UI que debería vivir en una Page, no en el mismo archivo que los steps.

- **Steps que hacen demasiado**: `When('agrego el producto...')` en `carrito.steps.js` combina localizar el item, filtrar por texto y hacer click — mezcla navegación, localización y acción en un solo paso.

- **Navegación al carrito embebida dentro de un Then**: en `D24.steps.js`, el step `Then('el carrito muestra el producto...')` hace `goToCart()` internamente, mezclando navegación con verificación.

- **URL hardcodeada en múltiples steps**: `'https://www.saucedemo.com/'` aparece como string literal en `common.steps.js`, `D24.steps.js` y `D22login.steps.js`. Cualquier cambio de entorno requiere editar varios archivos.

- **Credenciales hardcodeadas como constantes globales**: `DEFAULT_USERNAME` y `DEFAULT_PASSWORD` están definidas en `D24.steps.js`, pero otros archivos de steps usan sus propios strings literales sin reutilizarlas.

- **`ensureOnProductsPage()` como workaround de estado**: esta función compensa que no existe un objeto que gestione el estado de navegación. Con POM, la Page sabe dónde está y cómo llegar.

- **Distintos estilos de localización para el mismo elemento**: el botón "Add to cart" se localiza con `getByRole('button', { name: 'Add to cart' })` en D24 y con `getByRole('button', { name: /Add to cart/i })` en Clase_Consigna3, inconsistencia que puede causar falsos negativos.

- **Steps con lógica de ordenamiento repetida**: en `D24.steps.js`, cada `When('selecciona ordenar por...')` llama tanto a `ensureOnProductsPage()` como a `selectSortOption()`, repitiendo el mismo patrón cuatro veces en lugar de delegar a un método de Page.

- **Ausencia de abstracción de lectura de estado**: no hay métodos tipo `getCartCount()` o `isLoggedIn()` — para verificar el estado hay que escribir el locator completo en cada step.

- **Sin BasePage ni herencia**: cada archivo de steps trabaja directamente con `this.page`, sin ninguna capa base que centralice esperas, navegación o comportamientos comunes.

2) **Decidir "qué es una Page"**

App elegida: **Sauce Demo** (https://www.saucedemo.com/)

### LoginPage
- Navegar a la URL base de la app.
- Completar el formulario con usuario y contraseña.
- Ejecutar el submit del login.
- Leer el mensaje de error cuando las credenciales son inválidas.
- Verificar si el formulario de login es visible.

### ProductsPage (Inventario)
- Verificar que el catálogo de productos es visible.
- Seleccionar una opción del dropdown de ordenamiento.
- Obtener la lista de nombres de productos en pantalla.
- Obtener la lista de precios de productos en pantalla.
- Agregar un producto al carrito por su nombre.

### CartPage
- Navegar al carrito (click en el ícono del carrito).
- Verificar que un producto específico está en el carrito.
- Obtener el precio de un producto dentro del carrito.
- Verificar la cantidad de ítems en el badge del carrito.

### CheckoutPage
- Iniciar el proceso de checkout.
- Completar el formulario de datos del comprador (nombre, apellido, zip).
- Confirmar la compra.
- Verificar el mensaje de confirmación de orden exitosa.


3) **Propuesta de estructura de carpetas**

features/
├── support/
│   ├── hooks.js
│   └── world.js
├── step_definitions/
│   ├── login.steps.js
│   ├── products.steps.js
│   ├── cart.steps.js
│   └── checkout.steps.js
├── pages/
│   ├── BasePage.js
│   ├── LoginPage.js
│   ├── ProductsPage.js
│   ├── CartPage.js
│   └── CheckoutPage.js
├── login.feature
├── products.feature
├── cart.feature
└── checkout.feature

**Criterio de organización:**
- `pages/` contiene las clases POM — son las únicas que tocan locators y métodos de Playwright directamente.
- `step_definitions/` contiene los steps de Cucumber — solo orquestan llamadas a métodos de Page.
- `support/` mantiene hooks y world igual que antes.


4) **Convenciones de nombres**

**Métodos: siempre verbos**

- Acciones: `login(user, pass)`, `addToCart(productName)`, `goToCart()`, `submitCheckout()`
- Navegación: `navigate()`, `goToCheckout()`
- Lectura de estado: `getErrorMessage()`, `isLoggedIn()`, `getCartCount()`, `getProductNames()`, `getProductPrices()`
- Interacción con formularios: `fillFirstName(name)`, `fillLastName(name)`, `fillZipCode(zip)`

**Locators: privados y descriptivos**

// Correcto — campos privados con nombre sustantivo claro
#usernameInput  = this.page.getByPlaceholder('Username');
#passwordInput  = this.page.getByPlaceholder('Password');
#loginButton    = this.page.getByRole('button', { name: 'Login' });
#errorMessage   = this.page.locator('[data-test="error"]');
#sortDropdown   = this.page.locator('[data-test="product-sort-container"]');
#productNames   = this.page.locator('.inventory_item_name');
#productPrices  = this.page.locator('.inventory_item_price');
#cartLink       = this.page.locator('.shopping_cart_link');
#cartBadge      = this.page.locator('.shopping_cart_badge');

// Incorrecto
btn, el, input, loc1

**Reglas generales para nombres:**
- Nombres de clases: `PascalCase` + sufijo `Page` → `LoginPage`, `CartPage`.
- Locators: campos privados (`#`) con nombre en `camelCase` sustantivo.
- Métodos: `camelCase`, comienzan con verbo.
- Métodos de lectura comienzan con `get` o `is` → `getErrorMessage()`, `isLoggedIn()`.
- Sin lógica de `expect` dentro de la Page — las aserciones viven en los steps.


5) **Lista de migración (plan corto)**

| # | Step actual | Archivo actual | Page destino | Método nuevo |
|---|-------------|----------------|--------------|--------------|
| 1 | `page.goto('https://www.saucedemo.com/')` | `common.steps.js` | `LoginPage` | `navigate()` |
| 2 | `fill(username) → fill(password) → click(Login)` | `common.steps.js` y `D24.steps.js` | `LoginPage` | `login(user, pass)` |
| 3 | `expect(page).toHaveURL(/inventory\.html/)` | `D24.steps.js` | `LoginPage` | `isLoggedIn()` → aserción en step |
| 4 | `getByRole('heading', { name: errorText })` | `login.steps.js` / `D24.steps.js` | `LoginPage` | `getErrorMessage()` |
| 5 | `locator('[data-test="product-sort-container"]').selectOption(criterio)` | `ordenar.steps.js` | `ProductsPage` | `sortBy(optionLabel)` |
| 6 | `locator('.inventory_item_name').allTextContents()` | `D24.steps.js` | `ProductsPage` | `getProductNames()` |
| 7 | `locator('.inventory_item_price').allTextContents()` | `D24.steps.js` | `ProductsPage` | `getProductPrices()` |
| 8 | `locator('.inventory_item').filter(...).getByRole('button').click()` | `carrito.steps.js` / `D24.steps.js` | `ProductsPage` | `addToCart(productName)` |
| 9 | `locator('.shopping_cart_link').click() → expect(toHaveURL(/cart\.html/))` | `carrito.steps.js` / `D24.steps.js` | `CartPage` | `goToCart()` |
| 10 | `locator('.cart_item').filter(...).locator('.inventory_item_price')` | `carrito.steps.js` | `CartPage` | `getItemPrice(productName)` |

## **Notas:**
**Responsabilidades de BasePage:**
*Es una clase base, no representa una pantalla*

- Recibir y guardar la instancia de page en el constructor, para que todas las Pages hijas la hereden sin repetir this.page = page.
- Centralizar la URL base de la app (https://www.saucedemo.com/) como constante privada, eliminando el string hardcodeado que aparecían en common.steps.js, D24.steps.js y D22login.steps.js.
- Proveer un método navigate(path) genérico que construye la URL completa y que cada Page hija puede llamar con su propio path.
- Exponer métodos de espera reutilizables (waitForURL, waitForVisible) que estaban escritos sueltos dentro de los steps o en helpers como ensureOnProductsPage().

