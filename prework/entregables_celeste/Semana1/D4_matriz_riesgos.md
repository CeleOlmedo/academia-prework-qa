
#Día 4 - Shift-left, Análisis de riesgos e Introducción a APIs - Mustaff Noelia y Olmedo Celeste

===================================================================================================
## **Matriz de riesgos simple**
===================================================================================================

##**HU-01 - Inicio de sesión**
##**HU-02 - Carrito de compra**
##**HU-03 - Transferencia bancaria**

| **Historia** | **ID**   | **Riesgo**                                                                                                                      | **Tipo**      | **Impacto** | **Prob**  | **Mitigación**                                                                                                                                     |
|----------|------|-----------------------------------------------------------------------------------------------------------------------------|-----------|---------|-------|------------------------------------------------------------------------------------------------------------------------------------------------|
| HU-01    | RI01 | Iniciar sesión con credenciales incorrectas                                                                                 | Funcional | Alto    | Baja  | - Realizar pruebas con credenciales incorrectas<br>- Verificar la función de validación en el backend                                          |
| HU-01    | RI02 | Al presionar el botón "Iniciar sesión" el<br>usuario ingresa aunque los campos estén<br>incompletos                        | Funcional | Alto    | Baja  | - Inhabilitar el botón hasta que los campos estén<br>completos<br>- Validar en el frontend y en el backend que los campos<br>sean obligatorios |
| HU-01    | RI03 | No muestra mensaje de error ante credenciales<br>incorrectas                                                                | Funcional | Medio   | Media | - Verificar mensaje visible y claro en la interfaz                                                                                             |
| HU-01    | RI04 | Bloqueo de cuenta sin aviso ante intentos<br>reiterados                                                                     | Negocio   | Alto    | Media | - Validar límite de intentos<br>- Mostrar un mensaje de advertencia con el límite de <br>intentos restantes                                    |
| HU-01    | RI05 | Perdida de confianza por fallas en la<br>autenticaciónnnn                                                                   | Negocio   | Alto    | Baja  | - Pruebas en el flujo de autenticación                                                                                                         |
| HU-01    | RI06 | Falta de encriptación ante datos sensibles                                                                                  | Técnico   | Alto    | Baja  | - Verificar sistema de encriptación en el backend<br>- Evaluar otro servicio de encriptación en caso de fallas<br>reiteradas                   |
| HU-02    | RI07 | Se permite agregar más unidades que el stock<br>disponible                                                                  | Funcional | Alto    | Baja  | - Pruebas de actualización del límite de stock <br>luego de una compra                                                                         |
| HU-02    | RI08 | El total no se actualiza correctamente al modificar <br>cantidades de productos                                             | Funcional | Alto    | Media | - Pruebas de cálculo con distintos escenarios (descuentos,<br>envío, múltiples cantidades)                                                     |
| HU-02    | RI09 | No se muestra correctamente el resumen de compra                                                                            | Funcional | Medio   | baja  | - Verifique que incluya toda la información disponible<br>y necesaria antes de confirmar la compra                                               |
| HU-02    | RI10 | El precio de un producto en el carrito cambia y no<br>se notifica al usuario                                                | Negocio   | Alto    | Media | - Mostrar un mensaje de advertencia con actualización del<br>precio                                                                              |
| HU-02    | RI11 | Cobro incorrecto de envío por mal cálculo                                                                                   | Negocio   | Alto    | Baja  | - Validar función del cálculo por zona geográfica                                                                                                |
| HU-02    | RI12 | Falla de conexión durante el proceso de pago por<br>caída del servidor                                                      | Técnico   | Alto    | Media | - Validar que el sistema maneja correctamente errores del<br>tipo 500                                                                            |
| HU-03    | RI13 | Monto descontado superior al monto enviado                                                                                  | Funcional | Alto    | Baja  | - Validación de monto en el backend antes de confirmar<br>el pago                                                                              |
| HU-03    | RI14 | Cierre de sesión por límite de tiempo superado                                                                              | Funcional | Medio   | Media | - Mostrar alerta con el tiempo restante de sesión                                                                                              |
| HU-03    | RI15 | Bloqueo temporal por superar el límite de<br>Transacciones diarias                                                         | Funcional | Medio   | Alta  | - Mensaje claro inicial de cantidad de transacciones<br>días permitidos<br>- Aumentar límite según frecuencia de ingreso del usuario           |
| HU-03    | RI16 | Pérdida de clientes por transacciones<br>duplicadas                                                                         | Negocio   | Alto    | Media  | - Validar los ID de transacción en el backend<br>- Verificar doble confirmación                                                                |
| HU-03    | RI17 | Nuevas regulaciones legales para<br>transacciones bancarias                                                                 | Negocio   | Medio   | Media | - Revisar periódicamente las normativas vigentes                                                                                               |
| HU-03    | RI18 | Alta demora en impacto de pagos por alto volumen<br>de transacciones simultáneas                                            | Técnico   | Medio   | Alta  | - Realizar pruebas de carga y de estrés<br>- Monitorear en tiempo real la cantidad de transacciones                                            |

===================================================================================================
## **Top 5 riesgos de todo el sistema**
===================================================================================================

1. RI01 - Iniciar sesión con credenciales incorrectas
    Este riesgo tiene máxima prioridad porque si no se validan las credenciales
    de ingreso las cuentas quedan vulnerables a ingresos no autorizados, lo que puede 
    derivar en robo de información, robo de dinero y pérdida de reputación para la empresa.

2. RI13 - Monto descontado superior al monto enviado
3. RI16 - Pérdida de clientes por transacciones duplicadas
4. RI11 - Cobro incorrecto de envío por mal cálculo
    Estos riesgos generan un impacto económico directo en el cliente y pueden causar problemas 
    legales, reclamos y pérdida de credibilidad por parte del cliente.

5. RI17 - Nuevas regulaciones legales para transacciones bancarias
    El impacto es alto porque puede implicar multas, cambios obligatorios en el sistema
    o bloqueo de operaciones.



===================================================================================================
## **Mini plan de pruebas**
===================================================================================================

| **Nombre de prueba**                                                                                                                      |**Prioridad**|
|-------------------------------------------------------------------------------------------------------------------------------------------|-----------|
| El usuario ingresa con credenciales válidas                                                                                               | Alta      |
| El usuario ingresa con credenciales incorrectas                                                                                           | Alta      |
| El usuario intenta ingresar con campos obligatorios vacíos                                                                                | Media     |
| El usuario agrega productos al carrito y realiza la compra                                                                                | Alta      |
| El usuario intenta agregar al carrito una cantidad mayor al stock disponible                                                              | Media     |
| Se muestra una confirmación de compra donde detalla los datos de los <br>productos, datos del usuario, medio de pago y total de la compra | Baja      |
| El usuario transfiere dinero y se resta correctamente de la cuenta                                                                        | Alta      |
| El usuario transfiere a otra cuenta el monto "0"                                                                                          | Baja      |
| El usuario intenta transferir más dinero del saldo disponible                                                                             | Media     |
| Al transferir se genera un comprobante de la transferencia que se puede<br>descargar y compartir                                          | Media     |


Como evidencia guardaríamos comprobantes de transferencia, mails de confirmación de inicio de sesión, capturas 
de pantalla de los resultados obtenidos, ID's de transacciones generadas y las respuestas de las API's, para respaldar
el funcionamiento del sistema.
