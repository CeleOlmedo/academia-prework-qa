# Día33 - Introducción a API Testing con Axios - Mustaff y Olmedo

## Dudas

- ¿Cómo conviene manejar y reintentar cuando la API responde con `4xx`?

## Postman (colección D33_practicas)

| # | Método | URL |
|---|--------|-----|
| 1 | GET | `https://jsonplaceholder.typicode.com/posts/1` |
| 2 | POST | `https://jsonplaceholder.typicode.com/posts` |
| 3 | PUT | `https://jsonplaceholder.typicode.com/posts/1` |
| 4 | DELETE | `https://jsonplaceholder.typicode.com/posts/1` |
| 5 (error) | GET | `https://jsonplaceholder.typicode.com/posts/invalido` |

Se adjuntan Capturas.zip con los screenshots.

## Status codes vistos en Postman

- **Éxito:** `200` (GET, PUT, DELETE), `201` (POST).
- **Error probado:** `404` (GET a ruta inválida).

## Ventaja de Postman frente a ir directo al código

Postman permite probar método, URL, headers y body al instante y ver status y JSON sin escribir ni depurar código.

## Qué es un endpoint y qué es request/response

- **Endpoint:** la operación concreta = **método HTTP + URL** (por ejemplo `GET` + `https://jsonplaceholder.typicode.com/posts/1`).
- **Request:** lo que enviamos con axios: método, URL, y cuando aplica `headers` y `body` (JSON en POST/PUT).
- **Response:** lo que devuelve el servidor: **status code**, headers y **body** (JSON) en `response.status` y `response.data`.

## Status codes que validamos en código

- `200` — GET `/posts/1`, PUT `/posts/1`, DELETE `/posts/1`
- `201` — POST `/posts`
- `404` — GET `/posts/invalido`

## Qué validamos en el JSON y por qué

- **GET `/posts/1`:** objeto con `userId`, `id`, `title`, `body` y tipos correctos, para comprobar la forma del recurso y no solo el `200`.
- **POST `/posts`:** objeto con `id` numérico y `title` igual al enviado, para comprobar creación.
- **PUT `/posts/1`:** objeto con `id` numérico, `id` y `title` iguales al enviado, para comprobar actualización.
- **DELETE `/posts/1`:** objeto vacío (`{}`), coherente con la respuesta típica de JSONPlaceholder.
- **GET error `/posts/invalido`:** en código solo validamos el **status `404`**.
