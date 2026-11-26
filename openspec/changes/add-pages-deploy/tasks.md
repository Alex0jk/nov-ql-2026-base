# Tasks

## 1. Preparación y verificación de rutas

- [x] 1.1 Revisar que `src/index.html` y los módulos de `src/` solo usen rutas relativas (sin `/ruta` absoluta ni `localhost`), de modo que no se necesite ruta base
- [x] 1.2 Confirmar que `npm run lint` y `npm test` pasan en limpio tras `npm ci`
- [x] 1.3 Confirmar que existe `.github/workflows/ci.yml` (cambio `add-tests-and-ci`) con el disparador `workflow_call`, que `despliegue.yml` reutiliza

## 2. Workflow de GitHub Actions

- [x] 2.1 Crear `.github/workflows/despliegue.yml` con disparador solo `push` a `main` y permisos por defecto `contents: read`
- [x] 2.2 Agregar el job `verificar`, que llama a `ci.yml` con `uses: ./.github/workflows/ci.yml`
- [x] 2.3 Agregar el job `desplegar` con `needs: verificar`, `environment: github-pages`, permisos `pages: write` e `id-token: write` y `concurrency` sin cancelar
- [x] 2.4 En `desplegar`: `configure-pages`, `upload-pages-artifact` con `path: src` y `deploy-pages`
- [x] 2.5 Confirmar que no hay secretos ni tokens en el archivo

## 3. Configuración del repositorio

- [ ] 3.1 Habilitar GitHub Pages con origen "GitHub Actions" en Settings → Pages (paso manual)

## 4. Documentación

- [x] 4.1 Agregar al `README.md` una sección de despliegue con el enlace a la app publicada (según la respuesta sobre la URL) y cómo revisar ejecuciones con `gh run list` y `gh run watch`

## 5. Verificación

- [ ] 5.1 Abrir un PR de prueba y comprobar que corre lint y pruebas y que NO despliega
- [ ] 5.2 Provocar un fallo de prueba y comprobar que el workflow queda en rojo y sin despliegue (revertirlo después)
- [ ] 5.3 Fusionar a `main`, seguir la ejecución con `gh run watch` y comprobar que despliega
- [ ] 5.4 Abrir la URL publicada y comprobar participantes, color base, podio y cuenta regresiva sin errores 404 en consola

## Workflow follow-up

- Archivar el cambio con `/openspec-archive-change` tras implementar y verificar.
