
# Día 1 – Reflexión sobre Calidad de Software

=====================================================================================
## ENTREGABLE 1 —---------- Bug real que sufrí como usuario -------------------------|
=====================================================================================

**Contexto:**  
La aplicación que estaba utilizando era 'Mercado Pago' y estaba intentando pagar en
el supermercado Carrefour con QR.

**Qué pasó:**  
La aplicación me mostró 'Pago realizado' pero no ingresó el pago en la caja. Tuve que
volver a pagar y esperar que se actualice el estado del pago en el historial a 'Pago 
rechazado' para poder hacer el reclamo correspondiente.

**Qué debería haber pasado:**  
La aplicación debería haber mostrado 'Pago en proceso' si el dinero no ingresó en la 
caja o si el pago no impactó automáticamente.

**Impacto:**  
Me generó desconfianza en la aplicación y me hizo perder tiempo al tener que repetir
el pago y después gestionar un reclamo.


**Dimensiones de calidad afectadas (elegí 2 o 3 y explicá por qué):**  

- Confiabilidad: Dentro de la calidad del software se busca asegurar que los 
productos sean confiables y que satisfagan las necesidades del usuario. En el caso
planteado la  aplicación da información errónea al mostrar una devolución positiva al
pago y este no haber impactado verdaderamente, lo que genera desconfianza en el 
usuario.

- Usabilidad:  Este caso también afecta la usabilidad, ya que no debería mostrarse 
una respuesta positiva y luego en el historial una respuesta negativa, esto genera 
confusión en el usuario, afectando la facilidad de aprendizaje.

- Funcionalidad: El sistema no funciona correctamente si muestra información errónea. 
Hay una falta de validación o una validación incorrecta, entre el flujo de datos de 
la aplicación y el sistema externo.

**Qué habría hecho un buen QA para prevenirlo (3 acciones concretas):**  

1. Realizaría pruebas de integración verificando la interacción entre la aplicación
y los sistemas externos.

2. Definiría que ante cualquier demora en el pago o en la confirmación externa el 
sistema debe mostrar un estado de 'Pago en proceso'.

3. Diseñar casos de prueba específicos para cuando la respuesta de cobro sea lenta o
nula, validando que la aplicación no asuma un pago exitoso sin una confirmación real.

=====================================================================================
## ENTREGABLE 1B —----------------- Mini post-mortem --------------------------------|
=====================================================================================

**Cómo lo detectarías en simple**

En refinamiento pediría que especifiquen los posibles estados del pago (pendiente,
aprobado, rechazado y en proceso) y que definan los criterios de aceptación para cada 
uno. También solicitaría reglas para mostrar el resultado 'Pago exitoso' y tener 
evidencia de su acreditación antes de enviarlo.
Las primeras validaciones que probaría serían pruebas de integración entre el sistema 
y su comunicación con terceros, en este caso Mercado Pago, realizando pruebas de caja 
negra enfocadas en salidas negativas.
Si el bug apareciera, crearía un informe del error con ID de transacción, fecha y 
hora y los datos de entrada utilizados, además adjuntaría como evidencia gráfica 
capturas de pantalla del estado del pago que muestra el sistema.

=====================================================================================
## ENTREGABLE 2 —------------------- Mi día a día como QA ---------------------------|
=====================================================================================

**Cómo imagino mi día a día como QA en una empresa**

Como QA comenzaría la jornada con una reunión de equipo para entender el estado del 
proyecto, identificar los riesgos antes de comenzar a escribir código y las 
prioridades del sprint. Luego revisar las historias de usuario y que los criterios de
aceptación sean claros y verificables. 
Durante la jornada realizar tareas de control de calidad ejecutando pruebas 
funcionales manuales y colaborar en la automatización de otras pruebas más críticas. 
Trabajaría de manera cercana con los desarrolladores y el project manager notificando 
los avances y dudas, tratando de mejorar la calidad desde las primeras etapas del 
proceso.
Además, documentaría bugs con evidencia clara, participaría en mejorar procesos y 
contribuiría en construir una cultura de calidad dentro del equipo.

=====================================================================================
## ENTREGABLE 3 —------------------- Glosario personal ------------------------------|
=====================================================================================

**Definiciones con mis palabras**

1. Bug/Defecto: Es el resultado del error, una anomalía en la lógica del sistema.

2. Error: La acción humana produce un resultado incorrecto en el sistema.

3. Falla: Manifestación del bug que se produce en la ejecución del sistema.

4. Caso de prueba: Es la manera en la que un probador (tester) determina si una 
funcionalidad o sistema satisface los requisitos de funcionamiento.

5. Evidencia: Demostraciones de que el software está listo y satisface las políticas 
de calidad.

6. Severidad: Es el nivel de gravedad o grado de impacto que tiene un bug sobre el 
funcionamiento del sistema.

7. Prioridad: Determinar qué casos de prueba deben verificarse primero según el 
análisis de riesgos.

8. QA (Quality Assurance): Se enfoca en mejorar los procesos de la creación del 
producto, busca prevenir errores.

9. QC (Quality Control):  Se enfoca en la calidad del producto final, orientado a 
detectar errores.

10. Compatibilidad: Capacidad de un sistema para intercambiar información con otros 
productos o coexistir con otros sistemas.

=====================================================================================
—------------------------------------------------------------------------------------|
=====================================================================================