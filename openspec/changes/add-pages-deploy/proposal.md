# Proposal

## Why

Hoy la aplicación solo corre en local (`npm run dev`). Queremos que cualquiera la use desde el navegador sin instalar nada, y que cada cambio aprobado llegue a producción sin pasos manuales. Se construye sobre el Ticket #2: solo se publica una versión que haya pasado lint y pruebas.

## What Changes

- Se agrega `.github/workflows/despliegue.yml`, que corre solo en `push` a `main`: su job `verificar` reutiliza `ci.yml` (cambio `add-tests-and-ci`, vía `workflow_call`) y su job `desplegar` publica la carpeta `src/` en GitHub Pages únicamente si la verificación pasó.
- La verificación de pull requests y de ramas distintas de `main` la hace `ci.yml`; así cada push y cada PR ejecutan lint y pruebas una sola vez.
- Los pull requests nunca despliegan.
- No hay paso de build: `src/` se publica tal cual, porque la app usa ES modules y rutas relativas (`styles.css`, `main.js`), compatibles con el subdirectorio de GitHub Pages.
- El `README.md` incluye el enlace a la aplicación publicada.
- Sin dependencias nuevas y sin secretos en el código (se usa el `GITHUB_TOKEN` temporal con permisos mínimos).

## Capabilities

### New Capabilities
- `pages-deployment`: Reglas de cuándo, cómo y bajo qué condiciones se publica la aplicación en GitHub Pages, y qué ocurre si falla una verificación o el despliegue.

### Modified Capabilities

(ninguna; `openspec/specs/` no tiene capacidades existentes que cambien de requisitos)

## Impact

- Archivo nuevo: `.github/workflows/despliegue.yml` (depende de `.github/workflows/ci.yml` del cambio `add-tests-and-ci`, que debe implementarse antes).
- Archivo modificado: `README.md` (enlace a la app publicada y nota del despliegue).
- Configuración externa (manual, una vez): habilitar Pages con origen "GitHub Actions" en Settings → Pages.
- Sin cambios en `src/`, `package.json`, scripts ni lint.
