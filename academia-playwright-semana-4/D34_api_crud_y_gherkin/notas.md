# notas.md – Día 34: Autenticación, Token y Campos Opacos

## Autenticacion (Parte A)

Se utiliza un token obtenido mediante `POST /auth`.

El token se guarda en memoria:

- `features/booking.crud.test.js` -> variable `token`
- `features/step_definitions/api.steps.js` -> variable `token`

El token se envia en headers para endpoints protegidos:

`Cookie: token=...`

## Validaciones

Se validan:

- status code
- estructura JSON minima esperada (`firstname`, `lastname`, `bookingdates`)
- existencia de `bookingid`
- campos clave como `firstname` y fechas (`checkin`/`checkout`)

## Flujo CRUD

1. Create → genera bookingId
2. Read → valida datos
3. Update → requiere token
4. Delete → requiere token

## Observaciones

El API utiliza Cookie para autenticacion en lugar de `Authorization: Bearer`.

---

## Parte A2: Patrón API Key + Token Temporal

En muchas APIs reales (por ejemplo APIs de pagos, servicios cloud, etc.) el flujo de autenticación es más complejo que un simple usuario/contraseña:

1. **Registrás una API Key** en el portal del servicio (ej: `x-api-key: abc123`). Esta clave no cambia y se guarda como variable de entorno: `process.env.MI_API_KEY`.

2. **Hacés un POST** a un endpoint como `/auth/token` o `/oauth/token` enviando esa key en el header o en el body.

3. **Recibís un JWT** (token temporal) con un tiempo de vida corto, por ejemplo 1 hora. Ejemplo de respuesta:
   ```json
   { "access_token": "eyJ...", "expires_in": 3600 }
   ```

4. **Usás ese token** en cada request al negocio con `Authorization: Bearer <token>`.

5. **Cuando expira**, el servidor devuelve `401` o `403`. El test debería detectar eso y repetir el paso 2-3 para renovar el token antes de continuar.

**Cómo se detecta la expiración en un test:**
```js
if (error.response?.status === 401) {
  token = await renovarToken();
  // reintentar el request
}
```

**Buenas prácticas:**
- Nunca hardcodear la API Key en el código; usar `.env` con `.env.example` sin valores reales en el repo.
- El token temporal va en memoria durante la ejecución, no en disco.

---

## Parte A3: IDs Opacos (cifrados, codificados o firmados)

En sistemas reales los identificadores no siempre son enteros simples. Algunos ejemplos:

### Caso 1: ID en Base64
Ejemplo hipotetico anonimizado: `eyJib29raW5nSWQiOjEyMzQ1LCJ0cyI6MTcxMzI1NjAwMH0=`

Si un `bookingId` parece un string largo como el ejemplo anterior, podria ser un JSON codificado en Base64. Para inspeccionarlo en Node:
```js
Buffer.from('eyJib29raW5nSWQiOjEyMzQ1LCJ0cyI6MTcxMzI1NjAwMH0=', 'base64').toString('utf8')
// resultado: {"bookingId":12345,"ts":1713256000}
```
Esto sirve solo para **leer** el contenido en entorno de prueba. No significa que la API acepte cualquier valor manipulado.

### Caso 2: ID como JWT
Si el ID tiene el formato `xxxxx.yyyyy.zzzzz` (tres partes separadas por puntos), es un JWT. El payload (parte del medio) puede decodificarse en [jwt.io](https://jwt.io) **solo en entornos de demo**. Nunca pegar tokens de producción en herramientas externas.

### Caso 3: ID cifrado (AES)
Si el ID es un blob opaco sin estructura reconocible, puede estar cifrado simétricamente. En ese caso:
- Se necesita la misma clave/IV que usa el entorno de QA.
- Se coordina con el equipo de desarrollo para obtener un endpoint que genere IDs válidos en test.
- No se intenta "adivinar" el cifrado.

**Bloqueo encontrado en este proyecto:** en Restful Booker los IDs son enteros simples y el backend no expone un endpoint para generar IDs opacos. Por eso no se pudo crear un caso real con ID cifrado en esta API.

**Control de secretos:** no se subieron claves reales al repo; solo se deja `.env.example` sin valores sensibles.
