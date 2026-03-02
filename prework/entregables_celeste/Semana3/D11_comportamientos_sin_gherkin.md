
# Día 11 - Introducción a BDD - Agustín Quintana y Celeste Olmedo

## Flujo de Negocio elegido: **Login**

**Objetivo del usuario:**
    El usuario quiere ingresar en el sistema para acceder a sus datos y utilizar
las funcionalidades de la aplicación

**Precondiciones:**
- El usuario tiene ya una cuenta registrada en el sistema.
- La cuenta no está bloqueada ni suspendida.
- El usuario cuenta con credenciales válidas.
- El usuario cuenta con los medios necesarios para acceder a la plataforma 
(dispositivo compatible y conexión a internet activa).
- La cuenta no tiene una sesión activa.

**Comportamientos clave:**
- Si el sistema permite ingresar credenciales entonces el usuario puede iniciar el proceso de login
- Si el usuario ingresa sus credenciales válidas entonces el sistema valida su identidad
- Si la autenticación es exitosa entonces el usuario accede al área principal del sistema
- Si el usuario es un administrador entonces, al ingresar, el sistema lo diferencia de un usuario normal
- Si el usuario ingresa luego de varios intentos fallidos entonces el sistema le solicita renovar la contraseña
- Al ingresar el usuario el sistema registra cada inicio de sesión
- Si el usuario ingresa la credencial de contraseña entonces el sistema protege la información (no muestra texto plano)
- Si el usuario desea salir de la cuenta entonces el sistema cierra la sesión
- Si el usuario ya tiene una sesión activa, entonces el sistema restringe la nueva conexión
- Si el usuario deja los campos vacíos, entonces el sistema informa que es necesario ingresar datos en los campos

## **Casos negativos / alternativos:**
- Si el usuario ingresa una contraseña que no coincide con la registrada entonces el sistema no permite el acceso
- Si el usuario intenta ingresar luego de superar el límite máximo de intentos fallidos permitidos, entonces el sistema bloquea temporalmente el acceso
- Si el usuario intenta ingresar a una cuenta que se encuentra bloqueada o suspendida, entonces el sistema no permite el acceso

## **Preguntas de clarificación:**
- ¿Cuántos intentos fallidos están permitidos antes de bloquear la cuenta?
- ¿El login se realiza únicamente con las credenciales?
- ¿Existe recuperación de contraseña?


