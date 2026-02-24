# Día 2 - Criterios de aceptación - Olmedo Celeste y Martin Cabrera

======================================================
## Historias de Usuario - N°1 - Registro de usuario
======================================================

### Historia: HU-01
**Como:** Usuario no registrado
**Quiero:** Crear una cuenta
**Para:** Poder acceder a las funcionalidades del sistema

**Valor de negocio (1–2 líneas):**
- Permitir a los usuarios crear una cuenta para acceder a las funcionalidades 
del sistema
- Proveer una experiencia de usuario fluida y segura

**Criterios de aceptación (3–5):**
1. El usuario debe poder crear una cuenta con un correo electrónico y una 
contraseña    
2. Si el usuario ya tiene cuenta, debe visualizar un mensaje que indique que 
ya tiene cuenta y debe ingresar con su correo electrónico y contraseña
3. Si el usuario deja un campo vacío, debe visualizar un mensaje que indique 
que el campo es requerido
4. El usuario tiene que ingresar una contraseña de al menos 8 caracteres
5. Si el usuario ingresa una contraseña que no cumple con los requisitos, debe 
visualizar un mensaje que indique que la contraseña no cumple con los requisitos

**Ideas de prueba (mínimo 5):**
- Se crea una cuenta con un correo electrónico y una contraseña válidos
- Se crea una cuenta con un correo electrónico y una contraseña inválidos y se 
debe visualizar el mensaje de error correspondiente
- Se crea una cuenta con un correo electrónico y una contraseña que ya existe 
- Se crea una cuenta con la cantidad mínima de caracteres permitidos para la 
contraseña
- Al ingresar una contraseña que no cumple con la longitud mínima, se visualiza 
el mensaje 'La contraseña debe tener al menos 8 caracteres'

**Notas de QA (supuestos/riesgos/preguntas):**
- El usuario registrado no existe en la base de datos
- El usuario registrado no quedó guardado en la base de datos
- ¿La contraseña se encripta antes de guardarse en la base de datos?

======================================================
## Historias de Usuario - N°2 - Inicio de sesión
======================================================

### Historia: HU-02
**Como:** Usuario registrado
**Quiero:** iniciar sesión con mi email y contraseña
**Para:** acceder a mi cuenta personal

**Valor de negocio (1–2 líneas):**
- Permite que el usuario pueda acceder a su cuenta sin tener que registrarse de 
nuevo

**Criterios de aceptación (3–5):**
1. Si se ingresa email y contraseña válido lo redirige a su cuenta personal    
2. Si se ingresa una contraseña o email incorrectos no ingresa a la cuenta y se 
mostrará un mensaje de credencial invalida
3. Si se dejan campos vacíos se mostrará un mensaje de campo requerido
4. La opcion “iniciar sesion” no debe funcionar mientras no se hayan completado 
los campos

**Ideas de prueba (mínimo 5):**
- Login con email y contraseña válidos
- Login con email inexistente
- Login con contraseña incorrecta 
- Login con mail correcto, contraseña incorrecta y viceversa
- Login con campos vacíos
- Que las advertencias de errores sean las correctas

**Notas de QA (supuestos/riesgos/preguntas):**
- Todas las pruebas son con el usuario registrado.
- Posible riesgo en seguridad y confiabilidad del usuario, problemas de 
autenticación con el backend.
- ¿Tiene límite de intentos?


======================================================
## Historias de Usuario - N°3 - Transferencia bancaria
======================================================

### Historia: HU-03
**Como:** cliente bancario
**Quiero:** transferir dinero a otra cuenta
**Para:** enviar pagos

**Valor de negocio (1–2 líneas):**
- Permite al cliente realizar pagos o enviar dinero de forma rápida y 
segura desde su cuenta

**Criterios de aceptación (3–5):**
1. Si el cliente ingresa un monto válido y tiene saldo suficiente, la 
transferencia se realiza, se debita de la cuenta origen y se acredita en la 
cuenta destino    
2. Si el monto ingresado es mayor al saldo disponible, el sistema rechaza la 
operación y muestra el mensaje “Monto no disponible”.
3. El campo monto solo permite ingresar valores numéricos positivos.
4. Se solicita doble confirmación antes de ejecutar la transferencia.

**Ideas de prueba (mínimo 5):**
- Transferir el dinero y que se reste de tu cuenta
- Transferir un monto mayor al disponible
- Tratar de escribir otros caracteres que no sean números en el apartado del 
monto
- Transferir monto 0
- Transferir monto negativo
- Transferir el saldo exacto disponible
- Transferir un monto con decimales
- Transferir a una cuenta inexistente
- Verificar que el mensaje de confirmación funcione y sea claro

**Notas de QA (supuestos/riesgos/preguntas):**
- La cuenta destino existe.
- Error en la actualización del saldo, problemas si se hacen transferencias 
simultáneas, riesgo de seguridad si no hay doble confirmación.
- ¿Hay límite de monto?¿Hay límite diario?¿Que pasa si se cierra la app o se 
pierde la conexión?
