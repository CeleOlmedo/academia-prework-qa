# Día 34 - API Testing: Autenticación y CRUD - Quintana Agustín y Olmedo Celeste

## Qué valor guardamos como key

En local, la key se guarda idealmente como `process.env.MI_API_KEY`.

## Token temporal y expiración en un test

- **Cómo se obtiene el token temporal:** se envía la API key (por ejemplo en header `x-api-key` o en el body, según la documentación pública de la API) a un endpoint tipo `POST /auth/token` o `POST /oauth/token`, y la respuesta incluye `access_token` (y suele venir `expires_in`).

- **Cómo se detecta la expiración:** si una request falla con status `401` o `403`, se interpreta token vencido o inválido; el test (o el cliente) vuelve a pedir token y reintenta la request.

```js
try {
  return await axios.get("/recurso", {
    headers: { Authorization: `Bearer ${tokenActual}` }
  });
} catch (error) {
  const status = error.response?.status;
  if (status === 401 || status === 403) {
    tokenActual = await obtenerTokenConApiKey(process.env.MI_API_KEY);
    return axios.get("/recurso", {
      headers: { Authorization: `Bearer ${tokenActual}` }
    });
  }
  throw error;
}
```
