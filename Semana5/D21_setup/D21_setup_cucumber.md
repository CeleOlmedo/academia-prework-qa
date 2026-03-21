# Día 21 - Setup de Playwright + Cucumber - Cabrera Martin y Olmedo Celeste

# 1. Verificación del proyecto Playwright

Primero verificamos que el proyecto de Playwright creado en la semana anterior funcionara correctamente.

En la terminal ejecutamos:
*npx playwright test*

Los tests se ejecutaron correctamente, lo que confirmó que el entorno de Playwright estaba funcionando antes de integrar Cucumber.

---

# 2. Instalación de Cucumber

Luego instalamos Cucumber dentro del proyecto utilizando el siguiente comando:
*npm install -D @cucumber/cucumber*

Esto agregó la dependencia de Cucumber al proyecto para poder ejecutar tests en formato BDD usando Gherkin.

**Evidencia N°1: Instalación de Cucumber correcta - D21_Evidencias.pdf**

---

# 3. Estructura creada

Creamos la siguiente estructura de carpetas dentro del proyecto:

features/
features/step_definitions/

Y los siguientes archivos:

features/smoke.feature
features/step_definitions/smoke.steps.js

**Evidencia N°2: Estructura de archivos creada - D21_Evidencias.pdf**

---

# 4. Feature creada (Gherkin)

En el archivo:

*features/smoke.feature*

Contenido:

Feature: Smoke

Scenario: Abrir una página y ver un texto
  Given abro la pagina "https://the-internet.herokuapp.com/"
  Then veo el texto "Welcome to the-internet"

Esta feature define un escenario simple que abre una página web y valida que un texto esté visible.

---

# 5. Implementación de Steps

En el archivo:

features/step_definitions/smoke.steps.js

En este archivo se implementaron los steps utilizando Playwright para:

* abrir el navegador
* navegar a la página
* validar que el texto esté visible

**Evidencia adjunta - smoke.steps.js**

---

# 6. Script de ejecución

En el archivo `package.json` se agregó el siguiente script para ejecutar las features de Cucumber:

*"bdd": "cucumber-js"*

Esto permite ejecutar las features con el siguiente comando:

npm run bdd

---

# 7. Problemas encontrados durante la ejecución

Durante la práctica surgieron 2 errores al intentar ejecutar la feature con:

npm run bdd

## Error encontrado por Martin

En el primer intento de ejecución apareció el siguiente error:

*Error: function timed out, ensure the promise resolves within 5000 milliseconds*

Esto ocurrió porque Cucumber tiene por defecto un timeout de 5 segundos para ejecutar cada step, y el navegador de Playwright tardó un poco más en abrir y cargar la página.

**Evidencia N°4: Error Martin - D21_Evidencias.pdf**

### Solución

Se aumentó el timeout agregando la siguiente línea en el archivo de steps:

*setDefaultTimeout(20000);*

De esta forma Cucumber permite hasta 20 segundos para ejecutar cada step.

## Error encontrado por Celeste

Al ejecutar el comando:

npm run bdd

Apareció un error porque el script `bdd` no estaba definido correctamente en el archivo `package.json`.
El problema era que `bdd` estaba colocado dentro de `devDependencies` en lugar de estar dentro de `scripts`, por lo que npm no podía reconocer el comando.

**Evidencia N°5: Error Celeste - D21_Evidencias.pdf**

### Solución

Se corrigió el archivo `package.json` moviendo el script a la sección correcta:

"scripts": {
  "bdd": "cucumber-js"
}

Y dejando `devDependencies` únicamente para las dependencias del proyecto.

# 8. Verificación final

Se corrigieron los errores y se verificó que los archivos se ejecuten correctamente.

**Evidencia N°6: Verificación Martín - D21_Evidencias.pdf**
**Evidencia N°7: Verificación Celeste - D21_Evidencias.pdf**

