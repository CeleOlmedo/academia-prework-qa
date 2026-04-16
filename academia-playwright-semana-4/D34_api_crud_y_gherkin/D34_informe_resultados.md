# Informe de Resultados – Día 34: API Testing CRUD + Autenticación

## Qué se probó

- Autenticación con `POST /auth` para obtener token de sesión
- Creación de reserva con `POST /booking`
- Lectura de reserva con `GET /booking/:id`
- Actualización de reserva con `PUT /booking/:id` (con token)
- Eliminación de reserva con `DELETE /booking/:id` (con token)
- Integración del flujo CRUD con escenarios Gherkin (Cucumber)

---

## Resultados

- La autenticación devuelve un token válido al usar las credenciales `admin / password123`
- El flujo CRUD respeta el orden correcto: el `bookingId` siempre se obtiene dinámicamente del POST inicial
- La autenticación se aplica correctamente en PUT y DELETE mediante `Cookie: token=...`
- Las validaciones cubren status code, existencia de `bookingId` y campos clave como `firstname`

---

## Que salio bien

- Estructura del proyecto clara y organizada
- El token se maneja en memoria, sin exponer credenciales en el repo
- Los steps de Cucumber están correctamente conectados con axios
- El Gherkin está escrito en lenguaje de intención, sin detalles técnicos de HTTP

---

## Que no salio bien / Riesgos detectados

- Si Restful Booker esta saturada, pueden aparecer fallas intermitentes de red o respuestas no deterministicas (API publica compartida)
- El escenario de Update y Delete en Gherkin crea un booking nuevo en cada `Given`; en un entorno real esto se aisla con estrategia de datos de prueba
- No se ejecuto una prueba negativa automatizada para token expirado (se documento el patron de manejo `401/403` en README)

---

## Evidencia disponible

- Codigo fuente: `features/booking.crud.test.js`, `features/step_definitions/api.steps.js`, `features/api.feature`
- IDs generados dinámicamente en cada ejecución (no fijos)
- Logs esperados: `TOKEN: <valor>`, `BOOKING ID: <valor>`, `CRUD COMPLETO OK`
- Documentacion tecnica: `D34_api_crud_y_gherkin/notas.md` y `README.md`

---

## Token y campos codificados

El token se obtiene en cada ejecucion mediante `POST /auth` y se guarda en una variable en memoria. Se pasa a las requests protegidas en el header `Cookie: token=...` segun indica la documentacion oficial de Restful Booker. No se utilizaron campos cifrados reales porque los IDs de esta API son enteros simples; se documento el patron de IDs opacos y el bloqueo en `notas.md`, sin exponer secretos.
