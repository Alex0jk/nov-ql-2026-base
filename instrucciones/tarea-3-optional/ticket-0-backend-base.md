# Ticket #0 — Crear el backend: una JSON API

> **Opcional:** este reto es para quienes terminen los retos #1 y #2 antes de tiempo, o para continuar después del dojo.

## Descripción

Hasta ahora el selector de ganadores vive solo en el navegador: al recargar la página, todo se pierde. Queremos **guardar el historial de sorteos**, y para eso necesitamos un **backend**.

En este ticket creamos la base del backend: un proyecto nuevo que expone una **JSON API**, con pruebas, CI y documentación desde el primer día. Todavía no guarda datos; eso llega en los siguientes tickets.

Como en el Reto #2: primero actualiza `AGENTS.md` con las reglas del backend, luego crea el cambio con OpenSpec (`/openspec-propose`), revísalo e impleméntalo.

## Criterios de aceptación

- Existe un proyecto de backend en el mismo repositorio (por ejemplo, en `backend/`), separado del frontend.
- La API responde en `GET /api/health`:

  ```json
  { "estado": "ok" }
  ```

- La API está documentada con **OpenAPI** y se puede explorar con **Swagger UI** en `/api/docs`.
- El backend tiene pruebas automáticas y se ejecutan con un solo comando.
- El CI del Reto #2 ejecuta también el linter y las pruebas del backend.
- `AGENTS.md` incluye las reglas del backend (comandos, estructura y buenas prácticas).
- El `README.md` explica cómo ejecutar el backend localmente.

## Buenas prácticas

- **Documentación del API:** cada endpoint está descrito en OpenAPI (ruta, parámetros, cuerpo, respuestas y errores). Si un endpoint no está en Swagger, no está terminado.
- **Configuración por variables de entorno:** el puerto y la ruta de la base de datos no van "quemados" en el código. Incluye un archivo `.env.example`.
- **Separación por capas:** rutas (HTTP) → servicios (reglas de negocio) → repositorios (datos). Cada capa depende de interfaces, no de implementaciones.
- **Prefijo `/api`:** todas las rutas del backend empiezan con `/api`.

## Ejemplo

```sh
cd backend
npm install
npm run dev
# API escuchando en http://localhost:3000
curl http://localhost:3000/api/health
# { "estado": "ok" }
```

Abre `http://localhost:3000/api/docs` y verás la documentación en Swagger UI.

## Consideraciones

- Puedes usar cualquier lenguaje y framework (Express, Fastify, Hono, NestJS, FastAPI, etc.).
- Muchos frameworks pueden generar el documento OpenAPI a partir del código o validar las peticiones a partir del documento. Elijan un enfoque y documéntenlo en `AGENTS.md`.

¡El objetivo es empezar el backend con los mismos guard rails que el frontend!
