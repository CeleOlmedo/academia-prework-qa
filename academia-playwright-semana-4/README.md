# API Testing Restful Booker - Semana 4

Este proyecto valida autenticacion y CRUD completo sobre la API publica de Restful Booker.

## Autenticacion con token (Restful Booker)

- Se usa `POST /auth` con credenciales demo (`admin / password123`) para obtener token.
- El token se guarda en memoria (variables `token` en `features/booking.crud.test.js` y `features/step_definitions/api.steps.js`).
- En requests protegidas se inyecta como header `Cookie: token=<token>` para `PUT /booking/:id` y `DELETE /booking/:id`.
- No se persisten tokens en el repositorio.

## Patron API key + token temporal (A2)

Como segundo ejemplo teorico para APIs reales:

- La API key se guarda como variable de entorno, por ejemplo `process.env.MI_API_KEY`.
- Flujo comun:
  1. Enviar API key a `/auth/token` o `/oauth/token`.
  2. Recibir `access_token` temporal y `expires_in`.
  3. Consumir endpoints con `Authorization: Bearer <token>`.
- Deteccion de expiracion:
  - Si la API responde `401` o `403`, se considera token vencido o invalido.
  - El cliente renueva token y reintenta la request.

Ejemplo simplificado:

```js
async function requestConRefresh(reintento = false) {
  try {
    return await axios.get("/recurso", {
      headers: { Authorization: `Bearer ${tokenActual}` }
    });
  } catch (error) {
    const status = error.response?.status;
    if (!reintento && (status === 401 || status === 403)) {
      tokenActual = await renovarToken(process.env.MI_API_KEY);
      return requestConRefresh(true);
    }
    throw error;
  }
}
```

## Variables de entorno

- Archivo de ejemplo: `.env.example`
- Nunca subir claves reales o tokens activos.
