# Día 24 - Reutilización de steps y hooks - Cabrera Martin y Olmedo Celeste

## Ejecución y alcance actual

Los tests se ejecutan desde la terminal con:
- `npm run bdd:logs` para ver logs en consola.

Actualmente cubren tres flujos principales:
- Login válido e inválido con distintos mensajes de error (`D24login.feature`).
- Agregado de productos al carrito y validación de precio (`D24cart_outline.feature`).
- Ordenamiento de productos por precio y nombre (`D24products.feature`).

Pendiente por cubrir:
- Casos negativos de carrito (quitar producto, carrito vacío, cantidad de items).
- Validaciones más profundas de negocio en login (usuarios especiales, performance de login, bloqueos por intentos).
- Flujo completo checkout (datos, confirmación y validaciones finales).

## Parte A: Detección de duplicación
 
###  Pasos repetidos detectados
 
1. Navegación a la página:
   - "abro la pagina {string}"
   - "estoy en la pantalla de login de SauceDemo {string}"
   - "el usuario está en la página de login"
 
2. Ingreso de credenciales:
   - "ingreso el usuario {string}"
   - "ingreso la contraseña {string}"
   - "ingresa username {string} y password {string}"
   - "inicio sesion con usuario {string} y password {string}"
 
3. Acción de login:
   - "hago click en login"
   - "hace click en login"
 
4. Validación de login exitoso:
   - "deberia ver la pagina de inventario"
   - "veo la pagina de productos"
 
5. Validación de errores:
   - "deberia ver un mensaje de error"
   - "veo un mensaje de error de login {string}"
   - "se muestra el mensaje de error {string}"
 
---
 
###  Patrones repetidos detectados
 
1.  Login / Autenticación
   - Ingreso de usuario y contraseña
   - Click en login
   - Validación de acceso o error
 
2.  Navegación
   - Abrir URL
   - Ir a pantalla de login
   - Redirecciones (inventory, cart, etc.)
 
3.  Validación de resultados
   - Validación de mensajes de error
   - Validación de URL
   - Validación de elementos visibles (productos, formularios)
