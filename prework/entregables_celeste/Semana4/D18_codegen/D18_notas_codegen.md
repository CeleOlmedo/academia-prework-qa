## Observaciones sobre Codegen

### Tipo de código generado
Codegen generó un script que abre y cierra el navegador manualmente.
Para integrarlo al proyecto fue necesario adaptarlo a la sintaxis de Playwright Test.

### Selectores generados
Los selectores generados utilizan principalmente el atributo data-test, porque son más estables y menos propensos a romperse ante cambios visuales en la interfaz.

### Código generado automáticamente
También se observó que Codegen genera algunas expectativas comentadas que pueden servir como validaciones.

Además, el código generado suele incluir pasos redundantes (por ejemplo clicks antes de completar campos), por lo que fue necesario limpiarlo para dejar solo las acciones necesarias.

### Flujos grabados
Se grabaron varios flujos completos y simples:

- Login exitoso y validación de que se muestra el inventario.
- Login + navegación al detalle de un producto y validación de que se ve el nombre del producto.
- Login + agregar un producto al carrito + navegación al carrito y validación de que el producto se ve listado.

En todos los casos, fue necesario limpiar un poco el código generado y agregar expectativas explícitas con
expect para que los tests realmente validen el comportamiento y no solo reproduzcan acciones.