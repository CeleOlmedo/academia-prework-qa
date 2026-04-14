# Día 31 - Configuración multi-ambiente - Olmedo Celeste

## Parte A - environments.json

- El archivo environments.json se encuentra en la carpeta config y contiene la configuración de los ambientes.
- La ruta real del archivo es: prework\entregables_celeste\academia-playwright-semana-4\config\environments.json

```json
{
  "dev": {
    "baseUrl": "https://www.saucedemo.com"
  },
  "staging": {
    "baseUrl": "https://www.saucedemo.com"
  }
}
```

## Parte B - Loader de configuración en JS

- Se creó el archivo loadEnvironment.js en la carpeta config para cargar la configuración del ambiente.
- La ruta real del archivo es: prework\entregables_celeste\academia-playwright-semana-4\config\loadEnvironment.js
- El ambiente se decide leyendo `process.env.ENV`. Si no está definida, el default es `dev`.

```js
const envName = process.env.ENV ?? 'dev';
```

- Se usa la sintaxis `with { type: 'json' }` (Node ≥ 22) para importar el JSON de ambientes.
- Si el ambiente no existe en el JSON o no tiene `baseUrl`, el loader lanza un error antes de que arranquen los tests.

## Parte C - Conectar con Playwright + Cucumber

- En el `Before` de hooks.js se crea el contexto con `baseURL` cargada desde el loader:

```js
this.context = await this.browser.newContext({ baseURL: environment.baseUrl });
```

- Los Page Objects navegan con rutas relativas, sin repetir el host:

```js
// pages/LoginPage.js
async gotoLogin() {
  await this.page.goto('/');
}
```
- Los steps no contienen ninguna URL hardcodeada, solo llaman métodos de las Pages.

## Parte D - Scripts npm y cross-env

- Se instaló `cross-env` como dependencia para garantizar compatibilidad en Windows, Linux y macOS.

| Comando | ENV | Descripción |
|---|---|---|
| `npm run test` | dev | Corre contra dev (default) |
| `npm run test:dev` | dev | Explícito, mismo resultado |
| `npm run test:staging` | staging | Corre contra staging |
| `npm run test:dev:verbose` | dev | Con LOG_LEVEL=verbose |
| `npm run test:debug` | dev | Con DEBUG=pw:api + LOG_LEVEL=verbose |

- URL efectiva en dev: 
[INFO] Ambiente activo: dev — baseUrl: https://www.saucedemo.com
- URL efectiva en staging:
[INFO] Ambiente activo: staging — baseUrl: https://www.saucedemo.com

## Parte E - Logs en consola

- Se definió la variable `LOG_LEVEL` en hooks.js para controlar el nivel de detalle en consola:

```js
const level = process.env.LOG_LEVEL ?? 'info';
const verbose = level === 'verbose';
```

| LOG_LEVEL | Comportamiento |
|---|---|
| `quiet` | Sin console.log desde hooks |
| `info` | Ambiente activo + inicio/fin de cada escenario |
| `verbose` | Todo lo anterior + cada request/response HTTP |

- Ejemplo de salida con 'npx cross-env ENV=dev **LOG_LEVEL=info** npm run test:dev':

[INFO] Ambiente activo: dev — baseUrl: https://www.saucedemo.com
[INFO] ▶ Escenario: El Item total es la suma de los precios de los productos en carrito
......[INFO] ■ Fin: El Item total es la suma de los precios de los productos en carrito [PASSED]
.[INFO] ▶ Escenario: Comprar el primer producto visible usando Pages
..[INFO] ■ Fin: Comprar el primer producto visible usando Pages [PASSED]
.[INFO] ▶ Escenario: Login válido con usuario estándar
....[INFO] ■ Fin: Login válido con usuario estándar [PASSED]
.[INFO] ▶ Escenario: Login válido usando users.json
...[INFO] ■ Fin: Login válido usando users.json [PASSED]
.[INFO] ▶ Escenario: Usuario bloqueado — mensaje desde constants/messages.js
...[INFO] ■ Fin: Usuario bloqueado — mensaje desde constants/messages.js [PASSED]
.

- Para ver las llamadas internas de Playwright en consola: 
**npm run test:debug**
equivale a: cross-env ENV=dev DEBUG=pw:api LOG_LEVEL=verbose cucumber-js --config cucumber.js

## Parte F - Adjuntos en el reporte HTML

- En el `After` de hooks.js se adjuntan dos elementos al reporte por escenario:
  - **Screenshot** (`image/png`) — cuando el escenario falla
  - **Log de red** (`text/plain`) — cuando `LOG_LEVEL=verbose` o cuando el escenario falla

- El log de red se construye acumulando eventos `request` y `response` en `this.diagnosticLog` durante el escenario.
- Comando usado para generar el reporte con adjuntos:

*npx cross-env ENV=dev LOG_LEVEL=verbose npm run bdd:report:share*


- Cuando un escenario falla, se toma una captura de pantalla y se agrega al reporte, al ingresar a la sección del feature y luego desplegar el Scenario, se puede ver toda la información.
- Se adjunta reporte con errores.
- Ejemplo de texto en reporte sin errores (fragmento).
Ambiente: dev | baseUrl: https://www.saucedemo.com
Escenario: Login válido con usuario estándar

→ GET https://www.saucedemo.com/
← 200 https://www.saucedemo.com/
→ GET https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500
...

## Parte G - Validación contra dev y staging

```bash
# Contra dev
npm run test:dev
# URL efectiva: https://www.saucedemo.com

# Contra staging
npm run test:staging
# URL efectiva: https://www.saucedemo.com
```