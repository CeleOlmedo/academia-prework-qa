# Dia 34 - Notas (token e IDs) - Quintana Agustín y Olmedo Celeste

## Dónde guardamos el token

Se guarda en memoria durante la ejecucion:

- `features/booking.crud.test.js` -> variable `token`
- `features/step_definitions/api.steps.js` -> variable `token`

`.env` se usa solo para demos locales y el repo incluye `.env.example` sin valores sensibles.

## Cómo se pasa el token en axios

En Restful Booker se inyecta en headers asi:

```js
headers: {
  Cookie: `token=${token}`
}
```

## Segundo ejemplo de documentacion publica sin claves reales

Ejemplo teorico: una API pide `process.env.MI_API_KEY`, luego `POST /auth/token`, y devuelve JWT temporal (`access_token`, `expires_in`).

## Ejemplo hipotetico o anonimizado

El `bookingId` parece un blob Base64; lo decodificamos para ver el JSON interno en entorno de prueba:

```js
Buffer.from("eyJib29raW5nSWQiOjEyMzQ1LCJ0cyI6MTcxMzI1NjAwMH0=", "base64").toString("utf8");
// {"bookingId":12345,"ts":1713256000}
```

## Bloqueo al intentar manipular IDs

No se pudo generar un ID valido manipulando datos porque Restful Booker acepta IDs emitidos por backend. Esto es el comportamiento esperado en APIs seguras.
