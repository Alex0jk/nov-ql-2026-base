# Proposal

## Why

El selector de ganadores funciona, pero nada avisa si un cambio lo rompe. Antes de agregar funcionalidades se necesitan guard rails: pruebas que verifiquen lo que dicen las especificaciones y una verificación automática en cada cambio (Ticket #2, `instrucciones/tarea-2/ticket-2-pruebas-y-ci.md`).

## Estado actual (brecha real)

Ya existe y NO se vuelve a proponer:
- Pruebas con `node:test` en `test/sorteo/` y `test/ui/` (jsdom), ejecutables con `npm test`; `npm run coverage` con umbrales de 90% de líneas y 80% de ramas.
- Linter ESLint con `npm run lint` (incluye los límites de 150 líneas por archivo y 25 por función).
- Pruebas de agregar participantes, error por vacío o duplicado, ganadores distintos y de la lista, equiprobabilidad exacta, lista vacía, un participante y podio.

Falta:
- No hay workflow de GitHub Actions (no existe `.github/`).
- El `README.md` solo menciona los comandos de pruebas y lint de pasada; no explica cómo ejecutarlos ni qué hace el CI.
- No hay ninguna prueba que verifique que el color base azul se aplica a la interfaz ni que los colores viven solo en variables CSS.
- Las pruebas no comprueban, para todas las salidas posibles del generador, que con 1 ganador el resultado es un único participante de la lista.
- No hay evidencia de que las pruebas detecten errores reales (no se ha roto código a propósito para comprobarlo).
- `openspec/specs/` está vacío; los cambios `add-winners-podium` y `make-page-responsive` siguen sin archivar.

## What Changes

- Agregar un workflow de GitHub Actions que ejecuta el lint y las pruebas en cada `push` y en cada pull request hacia `main`, y falla si cualquiera falla.
- Agregar pruebas que cubran los vacíos anteriores: color base aplicado y sin colores sueltos, ganador único siempre dentro de la lista para todas las salidas del generador, y los escenarios de agregar participantes aún sin cubrir.
- Documentar en `README.md` cómo ejecutar pruebas, cobertura y lint localmente, y qué verifica el CI.
- Comprobar que las pruebas detectan errores rompiendo código a propósito (temporal, sin commitear).
- Sin cambios de comportamiento visible de la aplicación.

## Capabilities

### New Capabilities
- `participantes`: agregar participantes a la lista con sus validaciones (nombre vacío, duplicado sin distinguir mayúsculas).
- `color-base`: la interfaz usa el color base azul definido por el equipo, solo mediante variables CSS.
- `integracion-continua`: verificación automática de lint y pruebas en cada push y pull request hacia `main`, y documentación para ejecutarlas localmente.

### Modified Capabilities
<!-- Ninguna: openspec/specs/ está vacío. El sorteo de un único ganador, "siempre de la lista" y "no sortear sin participantes suficientes" ya los describe sorteo-de-ganadores (cambio add-winners-podium, pendiente de archivar); este cambio solo agrega pruebas para esos requisitos. -->

## Impact

- **Archivos nuevos:** `.github/workflows/ci.yml`, `test/ui/color-base.test.js`.
- **Archivos modificados:** `README.md`, y ampliaciones en `test/sorteo/sorteo.test.js` y `test/ui/aplicacion.test.js`. Ninguno de `src/`.
- **No se modifican** `package.json`, `eslint.config.js` ni `openspec/specs/` a mano (los scripts `test`, `lint` y `coverage` ya existen).
- **Dependencias:** ninguna.
- **Orden:** conviene archivar `add-winners-podium` antes, para que `sorteo-de-ganadores` exista en `openspec/specs/` y las pruebas se contrasten con una spec principal.
