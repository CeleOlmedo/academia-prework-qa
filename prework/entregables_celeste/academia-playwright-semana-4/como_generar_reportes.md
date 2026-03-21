# Para generar el reporte HTML de los tests se necesitan dos cosas:

**1. Agregar estos scripts en el package.json:**

"bdd:report:json": "node --input-type=module -e \"import{mkdirSync}from'fs';mkdirSync('artifacts/reports',{recursive:true})\" && cucumber-js --format progress --format json:artifacts/reports/cucumber-report.json",
"bdd:report:html": "node scripts/generate-cucumber-html-report.js",
"bdd:report:share": "npm run bdd:report:json && npm run bdd:report:html"

**2. Crear la carpeta scripts y el archivo: scripts/generate-cucumber-html-report.js para generar el reporte.**
El archivo que utilizamos se los comparto por privado

## El siguiente paso es correr el comando en terminal para generar el reporte:

npm run bdd:report:share

Esto primero corre los tests y genera un cucumber-report.json, 
y luego lo convierte en el reporte HTML que queda en artifacts/reports/html/index.html.