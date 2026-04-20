## CONSIGNA 7 — Suite Cucumber (Gherkin + Axios)
 
Encajá el mismo comportamiento en **Cucumber**. La corrida debe ser como en **D34**: **`cucumber-js`** con **`--import`** a los `.js` de soporte y steps.
Estructura:
helpers/Api.js          ← consigna 1 (helper de API)
features/api.feature
features/support/world.js
features/step_definitions/api.steps.js
package.json
 
### `package.json` (completá lo marcado con `___`)
{
 "name": "set-c-api-cucumber",
 "version": "1.0.0",
 "private": true,
 "type": "module",
 "scripts": {
   "test:axios": "node helpers/Api.js",
   "test:cucumber": "cucumber-js features/api.feature --import features/support/world.js --import features/support/hooks.js --import features/step_definitions/api.steps.js"
 },
 "dependencies": {
   "axios": "^1.15.0"
 },
 "devDependencies": {
   "@cucumber/cucumber": "10.0.0"
 }
}
 
### `features/api.feature` (3 escenarios; podés ajustar redacción o mantener este mismo)
 
Feature: Restful Booker — ping, autenticación y recurso inexistente
 
 Scenario: La API responde al ping
   When consulto el endpoint ping
   Then recibo status 201 en el ping
 
 Scenario: Obtengo token de administrador
   When solicito token con credenciales demo
   Then recibo status 200 y un token valido
 
 Scenario: Un booking inexistente devuelve 404
   When consulto un booking que no existe
   Then recibo status 404
 


 
### `features/support/world.js` (completá `___`)
 
import { setWorldConstructor } from '@cucumber/cucumber';
export class ApiWorld {
 constructor() {
   this.lastStatus = null;
   this.lastData = null;
   this.lastToken = null;
 }
}
setWorldConstructor(___);
 
### `features/step_definitions/api.steps.js` (completá imports y `___` en los steps)
 
import { When, Then } from '@cucumber/cucumber';
import assert from 'node:assert/strict';
import { getPing, postAuth, getBookingNotFound } from '___';
 
When('consulto el endpoint ping', async function () {
 const res = await ___ ();
 this.lastStatus = res. ___;
 this.lastData = res. ___;
});
 
Then('recibo status 201 en el ping', function () {
 assert.equal(this.lastStatus, ___);
});
 
When('solicito token con credenciales demo', async function () {
 const res = await ___ ();
 this.lastStatus = res.status;
 this.lastToken = ___;
});
 
Then('recibo status 200 y un token valido', function () {
 assert.equal(this.lastStatus, ___);
 assert.equal(typeof this.lastToken, '___');
 assert.ok(this.lastToken.length > 0);
});
 
When('consulto un booking que no existe', async function () {
 const res = await ______ ();
 this.lastStatus = ___;
});
 
Then('recibo status ___', function () {
 assert.equal(this.lastStatus, ___);
});
 