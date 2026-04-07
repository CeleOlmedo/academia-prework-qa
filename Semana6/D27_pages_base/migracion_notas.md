# D27 - Implementación de BasePage y primeras Pages - Olmedo Celeste

Se aplicó POM: selectores y acciones se encapsularon en clases bajo `features/pages/`.

## Archivos nuevos

| Archivo | Descripción |
|---|---|
| `features/pages/D27BasePage.js` | Clase base con `navigate()`, `waitForURL()` y `waitForVisible()` |
| `features/pages/D27LoginPage.js` | Page Object de login |
| `features/pages/D27ProductsPage.js` | Page Object de productos |

## Archivos modificados

| Archivo | A donde se movió |
|---|---|
| `features/step_definitions/D27login.steps.js` | Delegado a `LoginPage` y `ProductsPage` |
| `features/step_definitions/D27products.steps.js` | Delegado a `LoginPage` y `ProductsPage` |

## Steps que quedaron más cortos

### Verificar formulario visible
**Antes:** 3 líneas de `expect` con selectores hardcodeados  
**Después:** `await this.loginPage.isLoaded()`

### Hacer login
**Antes:** `fill` + `fill` + `click` con selectores directos en el step  
**Después:** `await this.loginPage.login(username, password)`

### Verificar página de productos
**Antes:** `expect(this.page).toHaveURL(...)` + `expect(getByText('Products')).toBeVisible()`  
**Después:** `await this.productsPage.isLoaded()`

### Ordenar productos
**Antes:** `ensureOnProductsPage(this.page)` + `selectSortOption(this.page, label)` — dos helpers sueltos  
**Después:** `await this.productsPage.sortBy(label)`

### Leer precios y nombres
**Antes:** `getInventoryPrices(page)` y `getInventoryNames(page)` — funciones sueltas con selectores y parsing inline  
**Después:** `ProductsPage.getProductPrices()` y `ProductsPage.getProductNames()` como métodos de instancia

## Que se mejoró con estos cambios?

Si un selector cambia en la app, se edita en un solo lugar (la Page), sin tocar steps ni features.