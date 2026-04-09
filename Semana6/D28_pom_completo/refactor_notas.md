# D28 - Completar POM y refactorizar tests - Olmedo Celeste

## 5 mejoras con POM

1. **Selectores centralizados**: Ningún step tiene `locator`, `getByPlaceholder` ni `getByRole` directos. Si hace falta cambiar o actualizar un selector solo se debe editar la Page.

2. **Steps más cortos**: Pasaron de tener lógica Playwright directa a llamar métodos de Page. Cualquiera puede leerlos sin conocer Playwright.

3. **`common.steps.js` sigue siendo el punto de reutilización**: El Given de login instancia `LoginPage` y `ProductsPage` y los asigna a `this`, quedando disponibles para steps posteriores del mismo escenario.

4. **Escalabilidad**: agregar un nuevo flujo significa crear una nueva Page sin tocar las existentes. El checkout, por ejemplo, solo necesitaría una `CheckoutPage` nueva.

5. **`CartPage` como nueva abstracción**: Navegar al carrito, esperar la URL y verificar items quedó encapsulado, listo para reutilizar en checkout.

## 3 preocupaciones

1. **`this.loginPage` depende del orden**: Si alguien usa el `Then 'veo el mensaje de error'` fuera de contexto, falla en runtime sin mensaje claro.

2. **Los scenarios de `ordenar.feature` dependen de datos externos**: si SauceDemo cambia el orden o los precios de sus productos, los tests fallan sin que el código haya cambiado nada.

3. **Sin cobertura de checkout**: El flujo de compra completo (formulario, confirmación) no tiene Page ni steps todavía.

## 5 decisiones de selectores

1. **`getByPlaceholder`** para usuario y contraseña: semántico, no depende de CSS ni IDs.
2. **`getByRole('heading', { name: /Epic sadface/ })`**: se utiliza solo 'Epic sadface' para no atarse al mensaje exacto.
3. **`[data-test="product-sort-container"]`**: atributo de test explícito, el más estable para ese elemento.
4. **`.inventory_item` + `filter({ has: getByText(productName) })`**: encuentra el botón correcto sin asumir posición fija.
5. **`.cart_item` + `filter`** en `CartPage`: mismo patrón, evita falsos positivos con múltiples productos.