# Día 17 - Estructura del proyecto y configuración básica - Celeste Olmedo

##**Parte A - Preguntas básicas:**

**¿Qué valor tiene use.baseURL?**
    Tiene el valor de: 'http://localhost:3000' pero la línea está comentada, entonces recibe
    la URL que esté declarada en el archivo del test.

**¿Qué browsers/proyectos están configurados?**
    Los browser que se encuentran configurados en el archivo son: Desktop Chrome, Desktop Firefox
    y Desktop Safari.

**¿Hay reporter configurado?**
    Si hay un reporter configurado que devuelve un HTML con las pruebas ejecutadas.

##**Parte B - ¿Que hacen los siguientes comandos?**

*npx playwright test --help* Abre la lista de comandos que se pueden utilizar en terminal para 
ejecutar test en playwright.

*npx playwright test --list* Lista todos los test que están cargados pero sin ejecutarlos.
Listing tests:
  [chromium] › example.spec.js:4:5 › has title
  [chromium] › example.spec.js:11:5 › get started link
  [firefox] › example.spec.js:4:5 › has title
  [firefox] › example.spec.js:11:5 › get started link
  [webkit] › example.spec.js:4:5 › has title
  [webkit] › example.spec.js:11:5 › get started link
Total: 6 tests in 1 file

*npx playwright test -g* Solo corre los test que contengan la palabra o letras descritas en el
comando.


##**Parte C - Cambios en configuración**

- Cambio en los retries: 
antes *retries: process.env.CI ? 2 : 0*
ahora **retries: 2**
//Esto significa que siempre, si un test falla, playwright lo va a volver a ejecutar hasta 2 veces.

- Cambio carpeta de salida de los reportes:
antes: *reporter: 'html',*
ahora: **reporter: [['html', { outputFolder: 'reporte-tests' }]],**

Output antes:
To open last HTML report run:

  npx playwright show-report

Output nuevo:
To open last HTML report run:

  npx playwright show-report reporte-tests


