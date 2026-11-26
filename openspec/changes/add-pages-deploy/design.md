# Design

## Context

- La app se sirve desde `src/` (`index.html`, `styles.css`, `main.js`, `sorteo/`, `ui/`), con ES modules y sin bundler. `index.html` usa rutas relativas (`styles.css`, `main.js`), por lo que funciona en el subdirectorio `/<repositorio>/` sin configurar ruta base.
- `scripts/servir.js` solo es para desarrollo; Pages sirve archivos estáticos por HTTPS, lo que basta para ES modules.
- Scripts existentes: `npm run lint`, `npm test`. El cambio `add-tests-and-ci` crea `.github/workflows/ci.yml` (disparadores `pull_request` hacia `main`, `push` a ramas distintas de `main` y `workflow_call`); este cambio lo reutiliza.
- Node >= 22.20.0 (`engines`). Ver proposal.md - Why para la motivación.

## Goals / Non-Goals

**Goals:**
- Un workflow que verifique y, solo en `push` a `main`, despliegue `src/` en Pages.
- Fallos visibles y sin alterar la versión publicada.

**Non-Goals:**
- Introducir bundler, paso de build o cambios en `src/`.
- Entornos de preview por PR, dominio propio o rollback automático.
- Modificar scripts de `package.json`, lint o agregar dependencias.

## Decisions

1. **`.github/workflows/despliegue.yml` con dos jobs, disparado solo por `push` a `main`.** El job `verificar` llama a `ci.yml` con `uses: ./.github/workflows/ci.yml` (que corre `npm ci`, lint y `npm test`). El job `desplegar` declara `needs: verificar`; no necesita `if` porque el workflow solo corre en `main`. Así cada push y cada PR ejecutan las verificaciones una sola vez (ramas y PR por `ci.yml`, `main` por `despliegue.yml`) y solo `main` despliega. Alternativa: duplicar los pasos de verificación en el workflow de despliegue; descartada por duplicar ejecuciones y mantenimiento. `needs` garantiza "misma ejecución, mismo commit".
2. **Publicar `src/` sin build.** Pasos de `desplegar`: `actions/configure-pages`, `actions/upload-pages-artifact` con `path: src`, `actions/deploy-pages`. Alternativa: copiar a `dist/`; innecesario porque no hay transformación.
3. **Rutas relativas, sin ruta base.** Se mantiene lo actual; una tarea verifica que no existan rutas absolutas (`/styles.css`) en `index.html` ni en los módulos.
4. **Permisos mínimos.** Permisos por defecto `contents: read` a nivel de workflow; solo el job `desplegar` añade `pages: write` e `id-token: write`, con `environment: github-pages`. Acciones fijadas por versión mayor (`actions/checkout@v4`, `configure-pages@v5`, `upload-pages-artifact@v3`, `deploy-pages@v4`). Sin secretos.
5. **Concurrencia.** `concurrency: group: pages, cancel-in-progress: false` en el job de despliegue para no cortar un despliegue en curso.
6. **Fallos.** Si lint o pruebas fallan, `desplegar` se omite y la ejecución queda en rojo; si `deploy-pages` falla, la ejecución queda en rojo y Pages sigue sirviendo la versión anterior. Revisión con `gh run list` y `gh run watch`.

## Risks / Trade-offs

- [Pages no habilitado con origen "GitHub Actions"] → el despliegue falla; paso manual en tareas y README.
- [Rutas absolutas rompen en subdirectorio] → tarea de verificación y comprobación manual de la URL publicada.
- [Una rama con PR abierto ejecuta `ci.yml` dos veces (por `push` y por `pull_request`)] → aceptado; es el comportamiento exigido por el Ticket #2. En `main` no hay duplicado.
- [Reglas del entorno `github-pages` pueden bloquear el despliegue desde `main`] → revisar las reglas del entorno.

## Migration Plan

1. Habilitar Pages (Settings → Pages → Source: GitHub Actions).
2. Fusionar el cambio a `main`; la primera ejecución publica.
3. Verificar la URL publicada y completar el enlace en el README.
4. Rollback: revertir el commit en `main` (dispara un nuevo despliegue) o deshabilitar el job `desplegar`.

## Open Questions

Resueltas:

- URL del README: `https://alex0jk.github.io/nov-ql-2026-base/`, derivada del remote `origin` (supuesto).
- Workflow de CI: archivo separado `ci.yml` (cambio `add-tests-and-ci`), reutilizado con `workflow_call`.
- Acciones fijadas por versión mayor.
- Node: `22.x` (en `ci.yml`).

Pendiente:

- ¿El repositorio es público? (Pages en repositorios privados depende del plan.)
