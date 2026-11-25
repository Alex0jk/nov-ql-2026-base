# Ticket #5 — Entorno completo y revisión de buenas prácticas

> **Opcional:** este reto es para quienes terminen los retos #1 y #2 antes de tiempo, o para continuar después del dojo.

## Descripción

El proyecto ya tiene frontend, backend y base de datos. Ahora queremos que cualquier persona del equipo pueda **levantar todo con un solo comando** y que el proyecto cumpla las buenas prácticas que fuimos acordando.

Primero crea el cambio con OpenSpec (`/openspec-propose`); revísalo y después impleméntalo.

## Criterios de aceptación

### Entorno

- Un solo comando levanta el frontend y el backend juntos (por ejemplo, `npm run dev` en la raíz, `docker compose up` o un script de `devenv`).
- Las migraciones de la base de datos se ejecutan automáticamente al iniciar.
- Existe un comando para cargar **datos de ejemplo** (unos 15 sorteos) y así probar el historial y la paginación.
- El `README.md` explica cómo levantar el proyecto desde cero en menos de 5 pasos.

### Revisión de buenas prácticas

El equipo revisa el proyecto con esta lista (puede pedirle ayuda a la IA, pero la decisión es del equipo). Lo que falte se corrige en este ticket:

- [ ] Todos los endpoints están documentados en Swagger (`/api/docs`), con ejemplos de petición, respuesta y errores.
- [ ] El documento OpenAPI coincide con lo que hace la API (por ejemplo, con una prueba que lo verifique).
- [ ] Toda la configuración se lee de variables de entorno y existe un `.env.example` actualizado.
- [ ] No hay secretos, archivos `.env` ni la base de datos en el repositorio.
- [ ] Todas las consultas SQL son parametrizadas.
- [ ] Los errores siguen el formato común y los `500` no muestran detalles internos.
- [ ] CORS solo permite el origen del frontend.
- [ ] Las capas (rutas → servicios → repositorios) dependen de interfaces y se inyectan.
- [ ] Hay pruebas para cada endpoint y cada pantalla, y el CI pasa.
- [ ] `AGENTS.md` y las especificaciones de `openspec/specs/` reflejan el estado actual del proyecto.

## Consideraciones

- La aplicación publicada en GitHub Pages sigue funcionando sin backend (Reto #2). Publicar el backend queda fuera del alcance de este reto.
- Si la revisión encuentra algo que no da tiempo a corregir, documéntenlo como una tarea pendiente en el `README.md`.

¡El objetivo es dejar el proyecto listo para que cualquiera pueda continuarlo!
