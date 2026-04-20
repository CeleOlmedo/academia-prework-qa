# README - DÍA 33 - MUSTAFF + OLMEDO
## Introducción a API Testing con Axios

## API usada
- JSONPlaceholder: https://jsonplaceholder.typicode.com/

## Endpoints probados

- `GET https://jsonplaceholder.typicode.com/posts/1`
- `POST https://jsonplaceholder.typicode.com/posts`
- `PUT https://jsonplaceholder.typicode.com/posts/1`
- `DELETE https://jsonplaceholder.typicode.com/posts/1`
- `GET https://jsonplaceholder.typicode.com/posts/invalido` (error esperado: `404`)

## Cómo ejecutar los tests con Node

**Runner:** Node.js + `assert` (`node:assert/strict`) + Axios. No se usa Vitest ni Jest.

**Dependencia:** el script usa Axios desde `node_modules`. Instalar una vez:

**Comando** (desde la raíz del repositorio):

```bash
node D33_api_basico/api.smoke.test.js
```
