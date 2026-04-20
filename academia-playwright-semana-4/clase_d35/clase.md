## CONSIGNA 1 — Completar el loader de ambientes

Completá los huecos (`___`). Objetivo: leer el nombre del ambiente desde `process.env.ENV`, default **`dev`**, importar el JSON y exportar `environment` con `name` y `baseUrl`.

// config/loadEnvironment.js
import all from './environments.json' with { type: 'json' };
const envName = process.env.ENV ?? 'dev';
const current = all[envName];
 
if (!current?.baseUrl) {
 throw new Error(`Ambiente "${envName}" inválido o sin baseUrl`);
}
 
export const environment = {
 name: envName,
 baseUrl: current.baseUrl,
};

## CONSIGNA 2 — Step con URL “completa”
 
Suponé que ya configuraste `browser.newContext({ baseURL: environment.baseUrl })` y que `environment.baseUrl` es `https://www.saucedemo.com` (sin barra final o con ella, según tu convención).
**Este step mezcla estilos:**
When('abro el inventario directo', async function () {
 await this.page.goto('https://www.saucedemo.com/inventory.html');
});
 
**Tarea:** sin reescribir todo el archivo, respondé:
1. Qué **problema de diseño** tiene respecto a la consigna del día 31 (“no repetir el host en cada step”).

La URL está completa, no se está utilizando la variable baseUrl. Esto hace que se repita y si cambia el ambiente, tenes que cambiar cada step.

2. Cómo quedaría **mejor** la llamada a `goto` usando **solo path** (escribí **una línea** de código ejemplo: `await this.page.goto(___);`).

await this.page.goto('/inventory.html');

CONSIGNA 3 — Script npm multiplataforma con Logs

En el día 31 pedimos activar el depurador de Playwright con **`DEBUG=pw:api`** (trazas de la **API interna** de Playwright en consola; distinto de un `LOG_LEVEL` propio del proyecto).
Completá el script para que se ejecute Cucumber con **`ENV=staging`** y **`DEBUG=pw:api`** en una sola línea de `package.json`:
 "scripts": {
   "test:staging:pwapi": "cross-en ENV=staging DEBUG=pw:api cucumber-js"
 }

 ## CONSIGNA 4 — Allure
### (a) Completá los comandos
 
npm install -D cross-env
 
npm install -D allure commandline
 
npx allure generate reports/allure-results --clean -o reports/allure-report
 
npx allure open reports/allure-report
 
"test:staging": "cross-env ENV=staging DEBUG=pw:api cucumber-js"

### (b) Un solo HTML (misma idea, otra salida)
    Respuesta:
npx allure generate reports/allure-results --clean --single-file -o reports/allure-report-single
 
 Si de vez en cuendo me pasa. Una disculpa
 
Si
 
## CONSIGNA 1 — Completar el loader de ambientes
Completá los huecos (`___`). Objetivo: leer el nombre del ambiente desde `process.env.ENV`, default **`dev`**, importar el JSON y exportar `environment` con `name` y `baseUrl`.
// config/loadEnvironment.js
import all from './environments.json' ___ { ___: 'json' };
const envName = process.env.ENV ___ 'dev';
const current = ___;
 
if (!current?.baseUrl) {
 throw new Error(`Ambiente "${envName}" inválido o sin baseUrl`);
}
 
export const environment = {
 name: ___,
 baseUrl: ___,
};
 
import all from './environments.json' assert { type: 'json' };
 
const envName = process.env.ENV ?? 'dev';

const current = all[envName];
 
if (!current?.baseUrl) {

  throw new Error(`Ambiente "${envName}" inválido o sin baseUrl`);

}
 
export const environment = {

  name: envName,

  baseUrl: current.baseUrl,

};
 
// config/loadEnvironment.js

import all from './environments.json' assert { type: 'json' };
 
const envName = process.env.ENV ?? 'dev';
 
const current = all[envName];
 
if (!current?.baseUrl) {

  throw new Error(`Ambiente "${envName}" inválido o sin baseUrl`);

}
 
export const environment = {

  name: envName,

  baseUrl: current.baseUrl,

};
 
// config/loadEnvironment.js
import all from './environments.json' with { type: 'json' };
const envName = process.env.ENV ?? 'dev';
const current = all[envName];
 
if (!current?.baseUrl) {
 throw new Error(`Ambiente "${envName}" inválido o sin baseUrl`);
}
 
export const environment = {
 name: envName,
 baseUrl: current.baseUrl,
};
 
// config/loadEnvironment.js

import all from './environments.json' with { type: 'json' };

const envName = process.env.ENV ?? 'dev';

const current = all[envName];
 
if (!current?.baseUrl) {

  throw new Error(`Ambiente "${envName}" inválido o sin baseUrl`);

}
 
export const environment = {

  name: envName,

  baseUrl: current.baseUrl,

};
 
## CONSIGNA 2 — Step con URL “completa”
 
Suponé que ya configuraste `browser.newContext({ baseURL: environment.baseUrl })` y que `environment.baseUrl` es `https://www.saucedemo.com` (sin barra final o con ella, según tu convención).
**Este step mezcla estilos:**
When('abro el inventario directo', async function () {
 await this.page.goto('https://www.saucedemo.com/inventory.html');
});
 
**Tarea:** sin reescribir todo el archivo, respondé:
1. Qué **problema de diseño** tiene respecto a la consigna del día 31 (“no repetir el host en cada step”).  
2. Cómo quedaría **mejor** la llamada a `goto` usando **solo path** (escribí **una línea** de código ejemplo: `await this.page.goto(___);`).
 
Se vuelve a llamar a la url en vez de usar environment.baseUrl, rompe con el uso del ambiente dinámico
 
await this.page.goto('/inventory.html');
 
**Tarea:** sin reescribir todo el archivo, respondé:
1. Qué **problema de diseño** tiene respecto a la consigna del día 31 (“no repetir el host en cada step”).
 
La URL está completa, no se está utilizando la variable baseUrl. Esto hace que se repita y si cambia el ambiente, tenés que cambiar cada step.
 
2. Cómo quedaría **mejor** la llamada a `goto` usando **solo path** (escribí **una línea** de código ejemplo: `await this.page.goto(___);`).
 
await this.page.goto('/inventory.html');
 
1- Problema de diseño

Se está hardcodeando la URL completa, lo que duplica el host y rompe la configuración de multi-ambiente (si cambia el ambiente hay que modificar todos los steps).
2-await this.page.goto('/inventory.html');
 
1. Problema de diseño

Está hardcodeando el host completo (https://www.saucedemo.com) dentro del step.

Viola la consigna:
no usa baseURL
repite datos
no permite cambiar de ambiente (dev / staging)
 
2. await this.page.goto('/inventory.html');
 
 
 
Sauce Labs Swag Labs app
 
CONSIGNA 3 — Script npm multiplataforma con Logs
En el día 31 pedimos activar el depurador de Playwright con **`DEBUG=pw:api`** (trazas de la **API interna** de Playwright en consola; distinto de un `LOG_LEVEL` propio del proyecto).
Completá el script para que se ejecute Cucumber con **`ENV=staging`** y **`DEBUG=pw:api`** en una sola línea de `package.json`:
 "scripts": {
   "test:staging:pwapi": "___ ENV=staging DEBUG=pw:api cucumber-js"
 }
 
"scripts": {
   ""test:staging:pwapi": "cross-env ENV=staging DEBUG=pw:api cucumber-js"
}
 
 "scripts": {
   "test:staging:pwapi": "cross-en ENV=staging DEBUG=pw:api cucumber-js"
 }
 
"scripts": {

  "test:staging:pwapi": "cross-env ENV=staging DEBUG=pw:api cucumber-js"

}
 
"scripts": {

  "test:staging:pwapi": "cross-env ENV=staging DEBUG=pw:api cucumber-js"

}
 
## CONSIGNA 4 — Allure
### (a) Completá los comandos
 
**1.** Paquete npm para variables de entorno multiplataforma (`ENV=...`, `DEBUG=...`, etc.):
npm install -D ___
 
**2.** Paquete npm que instala la **CLI** de Allure (permite `npx allure generate` y `npx allure open`):
npm install -D ___
 
**3.** Generación del sitio estático: completá **entrada** (carpeta de resultados crudos) y **salida** (`-o`), en una sola línea (usá las rutas típicas del curso bajo `reports/`):
npx allure generate ___ --clean -o ___
 
**4.** Apertura en el navegador del reporte **ya generado** (subcomando + ruta):
npx allure ___ ___
 
**5.** *(Adicional)* Una línea de script en `package.json` que ejecute **`cucumber-js`** con **`ENV=staging`** y DEBUG=pw:api de forma multiplataforma:
"test:staging": "___ ENV=staging DEBUG=pw:api cucumber-js"


### (b) Un solo HTML (misma idea, otra salida)
Escribí **una línea completa** de terminal: igual que el comando **`allure generate`** del punto (a)-3 (misma carpeta de entrada `reports/allure-results` y mismos flags base), pero agregando **`--single-file`** y directorio de salida **`reports/allure-report-single`** (no pisar `reports/allure-report`).

    Respuesta:
 
ya vengo, tengo una reunión y vuelvo
 
 ## CONSIGNA 4 — Allure
### (a) Completá los comandos
 
npm install -D cross-env
 
npm install -D allure commandline
 
npx allure generate reports/allure-results --clean -o reports/allure-report
 
npx allure open reports/allure-report
 
"test:staging": "cross-env ENV=staging DEBUG=pw:api cucumber-js"
 
### (b) Un solo HTML (misma idea, otra salida)
    Respuesta:
npx allure generate reports/allure-results --clean --single-file -o reports/allure-report-single
 
Parte A:
1. Variables de entorno multiplataforma:
npm install -D cross-env
2. CLI de Allure (para npx allure generate / npx allure open):
npm install -D allure-commandline
3. Generación (entrada = resultados crudos, salida = reporte HTML):
npx allure generate reports/allure-results --clean -o reports/allure-report
4. Abrir el reporte ya generado:
npx allure open reports/allure-report
5. Script en package.json:
"test:staging": "cross-env ENV=staging DEBUG=pw:api cucumber-js"
 
Parte B:
npx allure generate reports/allure-results --clean -o reports/allure-report-single --single-file
 
**1.** Paquete npm para variables de entorno multiplataforma (`ENV=...`, `DEBUG=...`, etc.):
npm install -D cross-env
 
**2.** Paquete npm que instala la **CLI** de Allure (permite `npx allure generate` y `npx allure open`):
npm install -D allure-commandline
 
**3.** Generación del sitio estático: completá **entrada** (carpeta de resultados crudos) y **salida** (`-o`), en una sola línea (usá las rutas típicas del curso bajo `reports/`):
npx allure generate reports/allure-results --clean -o reports/allure-report
 
**4.** Apertura en el navegador del reporte **ya generado** (subcomando + ruta):
npx allure open reports/allure-report
 
**5.** *(Adicional)* Una línea de script en `package.json` que ejecute **`cucumber-js`** con **`ENV=staging`** y DEBUG=pw:api de forma multiplataforma:
"test:staging": "cross-env ENV=staging DEBUG=pw:api cucumber-js"
 
 
### (b) Un solo HTML (misma idea, otra salida)
npx allure generate reports/allure-results --clean --single-file -o reports/allure-report-single
 


(a)
 
1. Paquete para variables de entorno multiplataforma

Permite usar ENV y DEBUG en cualquier sistema (Windows, Mac, Linux):
 
npm install -D cross-env
 
2. CLI de Allure

Instala la herramienta que genera y abre los reportes:
 
npm install -D allure-commandline
 
3. Generar el reporte HTML (sitio estático)

Toma los resultados crudos (allure-results) y genera el reporte final:
 
npx allure generate reports/allure-results --clean -o reports/allure-report
 
4. Abrir el reporte en el navegador

Muestra el reporte ya generado:
 
npx allure open reports/allure-report
 
5. Script npm con ENV + DEBUG

Ejecuta Cucumber usando ambiente staging y mostrando logs internos de Playwright:
 
"test:staging": "cross-env ENV=staging DEBUG=pw:api cucumber-js"

(b) Un solo HTML (reporte en archivo único)
 
Genera el mismo reporte pero en un único archivo HTML (útil para entregar):
 
npx allure generate reports/allure-results --clean --single-file -o reports/allure-report-single
 
## CONSIGNA 5 — Fallo + capturas a demanda en pasos críticos

Ya venimos utilizando screenshot solo si el escenario falla** (base que ya usás en D32.
import { After } from '@cucumber/cucumber';
import { Status } from '@cucumber/cucumber';
After(async function (scenario) {
 if (scenario.result?.status === Status.FAILED && this.page) {
   const png = await this.page.screenshot({ fullPage: true });
   await this.attach(png, 'image/png');
 }
});
**Parte A — helper para puntos clave** (no en **todos** los steps: solo donde el step lo invoque). Completá los `___`:
export async function attachCriticalScreenshot(world, label) {
 if (process.env.SCREENSHOT_KEY_POINTS !== 'true' || !world.page) return;
 const png = await world.page.screenshot({ fullPage: true });
 await world.attach(png, 'image/png');
}

**Parte B — uso en un step crítico** (ejemplo: después de una acción de negocio importante). Completá la llamada al helper (world + etiqueta descriptiva para el reporte):
 
When('confirmo el pedido y veo el número de orden', async function () {
 await this.orderPage.confirm();
 await attachCriticalScreenshot(this, 'orden confirmada');
});
 
## CONSIGNA 6 — Axios (completar código)
 
Completá los `___` en **`helpers/Api.js`** (cliente HTTP / helper que aloja funciones con llamadas a API). Debe exportar tres funciones async que usen **axios** y **`node:assert/strict`**:
 
1. **`getPing()`** — `GET /ping` → status **201**, body string coherente (p. ej. contiene `Created`).
2. **`postAuth()`** — `POST /auth` con `{ username: 'admin', password: 'password123' }` y headers JSON → status **200**, `token` string no vacío.
3. **`getBookingNotFound()`** — `GET /booking/999999999` con **`validateStatus: () => true`** → status **404**.
 
**Plantilla:**
import axios from 'axios';
import assert from 'node:assert/strict';
const BASE = enviroment.baseUrl;

export async function getPing() {
 const res = await axios.get(`${BASE}/ping`, { validateStatus: () => true });
 assert.equal(res.status, 201);
 assert.ok(res.data.includes('Created'));
}

export async function postAuth() {
 const res = await axios.post(
   `${BASE}/auth`,
   { username: 'admin', password: 'password123' },
   { headers: { Accept: 'application/json', 'Content-Type': 'application/json' }, validateStatus: () => true }
 );
 assert.equal(res.status, 200);
 assert.ok(typeof res.data.token === 'string' && res.data.token.length > 0);
}
 
export async function getBookingNotFound() {
 const res = await axios.get(`${BASE}/booking/999999999`, { validateStatus: () => true });
 assert.equal(res.status, 404);
 assert.equal(res.data, 'Not Found');
}
