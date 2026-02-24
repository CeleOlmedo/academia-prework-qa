
#Día 3 -  Pirámide de Testing y niveles de pruebas

##Grupo: Noelia Mustaff | Agustin Quintana | Celeste Olmedo | Martin Cabrera

##**Sistema elegido:** 

Opción A - E-commerce

##**Flujos críticos:** 
 - Registro/Log in
 - Pago 
 - Agregar productos al Carrito
 - Búsqueda de productos


##**Ejemplos de pruebas por nivel:**

_Unitarias:_

    - Validación de formato de mail.
    - Calcular el total del carrito.
    - Aplicar descuentos correctamente.
    - Agregar productos al carrito.
    - Eliminar productos al carrito.
    - Calcular el costo de envío por zona.
    - Validar stock mayor a cero.
    - Validar número de tarjeta.

_Integración:_

    - Registro/Log in de usuario + impacto en la base de datos.
    - Compra de productos + actualización de stock.
    - Confirmación de compra + servicio de pago.
    - Búsqueda de producto + resultados desde base de datos.
    - Aplicación de cupón + actualización del total.
    - Confirmación de compra + envío de mail de confirmación.

_E2E/UI:_

    - Usuario se registra + inicia sesión + búsqueda de producto + agrega 
    al carrito + pago + confirmación de compra

    - Usuario inicia sesión + búsqueda de producto + agrega al carrito + 
    elimina del carrito + cierra sesión

    - Usuario inicia sesión + agrega un producto sin stock al carrito + 
    intento de pago + mensaje de error

    - Usuario inicia sesión + búsqueda de producto + agrega al carrito + 
    aplicación de cupón + pago + confirmación de compra

    - Usuario intenta iniciar sesión + mensaje de error de contraseña + 
    cambio de contraseña + mail de recuperación + ingreso de contraseña 
    nueva + inicio de sesión

_Manual:_

    - Usuario se registra + inicia sesión + búsqueda de producto + agrega al 
    carrito + pago + confirmación de compra. Porque requiere de la percepción 
    humana para evaluar si la interfaz es amigable con el usuario y la 
    confirmación de compra es clara.

    - Usuario intenta iniciar sesión + mensaje de error de contraseña + cambio 
    de contraseña + mail de recuperación + ingreso de contraseña nueva + inicio 
    de sesión. Porque requiere de servicios externos de email real y no tiene un 
    flujo de alta frecuencia.


##**Candidatos a automatizar primero:**

1) Registro/Log in de usuario + impacto en la base de datos.

    **Riesgo/impacto:** Alto. Es la "puerta" del sistema. Si falla, el usuario no 
    puede acceder a sus datos, carrito, etc. por ende no efectuaría ninguna compra, lo 
    que representa una pérdida.
    **Frecuencia de uso:** Muy alta. Se utiliza cada vez que el usuario desea 
    acceder al sistema.
    **Estabilidad del flujo:** Muy Alta. El flujo casi no cambia.


2) Confirmación de compra + servicio de pago.

    **Riesgo/impacto:** Crítico. Un error genera reclamos, pérdida de confianz
     y podría generar acciones legales por parte del comprador.
    **Frecuencia de uso:** Alta. Es el paso final obligatorio para cada venta
     exitosa.
    **Estabilidad del flujo:** Alta. Una vez definido el sistema de pagos, rara
     vez se cambia.


3) Cálculo de Total de carrito

    **Riesgo/impacto:** Crítico. Cobrar de más o de menos genera problemas legales o 
    contables.
    **Frecuencia de uso:** Constante. Se ejecuta cada vez que alguien agrega un 
    producto al carrito.
    **Estabilidad del flujo:** Totalmente estable. La lógica detrás del cálculo de 
    total no varía.


##**Qué NO automatizaríamos primero:**

- Pruebas de interfaz: la automatización de las pruebas verifica que funcionen 
correctamente pero no que el usuario lo entienda.
- Pruebas exploratorias: no siguen un patrón, intentan caminos inusuales.
- Pruebas de usabilidad: si las funcionalidades son intuitivas para el usuario.


##**Señales de que un E2E es frágil:**

- Tiene alto costo de mantenimiento
- Necesita datos externos
- Cubre demasiadas validaciones en un solo test
- Es muy lento
- Cuando no pueden ejecutarse de forma local porque necesita que todos los servicios 
estén activos al mismo tiempo.