# Día 22 - Step Definitions y World/Context - Mustaff Noelia y Olmedo Celeste
  
## **Selectores utilizados y justificación**
    Para esta automatización se decidió no utilizar data-test, ya que en entornos reales muchas veces estos atributos no están disponibles. En su lugar, se usaron selectores más cercanos al comportamiento del usuario:

**Inputs (usuario y contraseña)**
- getByPlaceholder('Username')
- getByPlaceholder('Password')

Se eligieron porque representan el texto visible dentro de los campos y no dependen de atributos técnicos internos

**Botón de login**
- getByRole('button', { name: 'Login' })

Es la forma recomendada por Playwright, es un selector robusto y mantenible

**Mensaje de error**
- getByRole('heading', { name: errorText })

Permite validar dinámicamente distintos mensajes y usa accesibilidad en lugar de clases o IDs

**Validación de pantalla de productos**
- getByText('Products')

Se utilizó porque el elemento no tenía un rol semántico (no era un heading) y permite validar contenido visible al usuario

- locator('.inventory_container')

Este selector fue la mejor opción recomendada por SelectorsHub

## **Assertions utilizadas**

**Login exitoso**
- await expect(page).toHaveURL(/inventory\.html/);
- await expect(page.getByText('Products')).toBeVisible();

Se valida la redirección correcta (URL) y la presencia del contenido en pantalla

**Login fallido (usuario bloqueado)**
- await expect(error).toBeVisible();
- await expect(page).toHaveURL('https://www.saucedemo.com/');

Se valida la visualización del mensaje de error y la permanencia en la pantalla de login

**Sesión no creada**
- await expect(page).not.toHaveURL(/inventory\.html/);

Aseguramos que el usuario no accede al sistema
