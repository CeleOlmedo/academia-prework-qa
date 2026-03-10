#Día 16 - Instalación y primer test con Playwright - Celeste Olmedo

**Paso 1:**
*Primero cree la carpeta de la semana en cursor para poder ordenar las entregas*

**Paso 2:**
*node -v en terminal, resultado:*
C:\Users\ailin>node -v
v24.13.0

*npm -v en terminal, resultado:*
C:\Users\ailin>npm -v
11.6.2

**Paso 3 y 4:**
*Crear el proyecto*
✔ Success! Created a Playwright Test project at C:\Users\ailin\OneDrive\Documentos\GitHub\academia-prework-qa\prework\entregables_celeste\academia-playwright-semana-4

**Paso 5:**
*Correr los test*
C:\Users\ailin\OneDrive\Documentos\GitHub\academia-prework-qa\prework\entregables_celeste\academia-playwright-semana-4>npx playwright test 

Running 6 tests using 4 workers
  6 passed (11.2s)

**Paso 6:**
*Ver el reporte generado*
C:\Users\ailin\OneDrive\Documentos\GitHub\academia-prework-qa\prework\entregables_celeste\academia-playwright-semana-4>npx playwright show-report

  Serving HTML report at http://localhost:9323. Press Ctrl+C to quit.

**Paso 7:**
*Descripción de lo que encontré*
- playwright.config.js: En este archivo está toda la configuración del playwright como los navegadores que va a utilizar, donde van a correr los test y el reporte HTML.

- carpeta/test: Esta carpeta tiene los archivos de las pruebas automatizadas, las pruebas que aparecen por defecto son sobre la página oficial de playwright y verifican que el título contenga la palabra 'Playwright' y también que el link 'get started' te lleve a una página donde en el encabezado aparezca la palabra 'Installation'.

- package.json: En este archivo se encuentran las dependencias del proyecto, un apartado donde se pueden definir comandos para las pruebas, el nombre y la versión del proyecto, estas son configuraciones para que funcione el proyecto.

