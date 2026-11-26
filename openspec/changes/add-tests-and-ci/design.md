# Design

## Context

El proyecto ya tiene `npm test` (`node --test 'test/**/*.test.js'`), `npm run coverage` y `npm run lint` (ESLint). Existen 5 archivos de prueba (`test/sorteo/` y `test/ui/`), sin pruebas de color ni de la hoja de estilos. No existe `.github/`. Restricciones de `AGENTS.md`: sin dependencias nuevas, sin tocar scripts de `package.json` ni la configuración de lint, pruebas deterministas con generador falso, Node >= 22.20.0, el color base no se cambia.

## Goals / Non-Goals

**Goals:**
- Un workflow reutilizable que repita en cada push y pull request lo que el equipo ejecuta localmente, sin duplicar ejecuciones en `main`.
- Pruebas que verifiquen las specs (comportamiento observable), cerrando los vacíos listados en `proposal.md`.
- Evidencia de que las pruebas detectan errores.

**Non-Goals:**
- Cambiar el código de `src/`, los scripts de `package.json` o la configuración de ESLint.
- Agregar un formatter, Playwright o pruebas end to end en navegador (el linter existente cumple el criterio "linter y/o formatter").
- Configurar protección de rama o checks obligatorios en GitHub (es configuración del repositorio).

## Decisions

1. **Workflow `.github/workflows/ci.yml`** con disparadores `pull_request` hacia `main`, `push` a ramas distintas de `main` (`branches-ignore: [main]`) y `workflow_call`. Un job en `ubuntu-latest`: checkout, `setup-node` con `node-version: 22.x` y caché de npm, `npm ci`, `npm run lint`, `npm test` y `npm run coverage` (ya pasa en limpio). Pasos separados para que el registro muestre cuál falló; acciones fijadas por versión mayor; sin matriz ni formatter. Los push a `main` NO lo disparan directamente: los cubre `despliegue.yml` (cambio `add-pages-deploy`), que llama a este workflow con `workflow_call`, así cada push y cada PR ejecutan las verificaciones una sola vez. *Alternativa:* un solo paso con `&&`; descartada porque oculta qué falló.
2. **Pruebas del color base leyendo `src/styles.css` e `src/index.html` como texto.** jsdom no calcula bien las variables CSS, así que se verifica: (a) `:root` define variables azules; (b) fuera de `:root` no hay colores literales; (c) las reglas de `h1`, `.primario` y `body` usan `var(--azul-...)`; (d) `index.html` no tiene `style=` ni `onclick=`. Se prueba lo especificado (el azul se usa y está centralizado), no los valores hexadecimales exactos, para no atar la prueba a una decisión de producto.
3. **Ganador siempre de la lista:** prueba en `test/sorteo/sorteo.test.js` que recorre todas las salidas posibles del generador falso para listas de 2 a 5 participantes (con menos de 2 no se puede sortear) y comprueba que cada ganador pertenece a la lista y que con 1 ganador el resultado tiene exactamente un elemento. Es exhaustiva y determinista (sin azar real).
4. **Pruebas de agregar participantes:** completar solo los escenarios de `specs/participantes` que no estén ya cubiertos, sin duplicar los existentes.
5. **Las pruebas detectan errores:** mutaciones manuales temporales (ganador fuera de la lista, habilitar sorteo con lista vacía, quitar la variable azul), cada una ejecutada con `npm test` para confirmar que falla y revertida de inmediato. El resultado se anota en el pull request; no se guarda código roto.
6. **README:** nueva sección "Pruebas, lint y CI" con `npm test`, `npm run coverage`, `npm run lint` y una descripción breve del workflow.

## Risks / Trade-offs

- Si cambian los nombres de las variables CSS, la prueba de color podría romperse → se mitiga probando "usa alguna variable `--azul-*`" y no un nombre fijo por elemento.
- Las specs principales están vacías hasta archivar los cambios pendientes → las pruebas se contrastan con las specs delta; conviene archivar `add-winners-podium` antes.
- El workflow no puede probarse por completo en local → se verifica en un pull request de prueba (una rama con un fallo a propósito debe mostrar ✗).

## Open Questions

Resueltas (preguntas 1 a 4):
1. **Versión de Node en CI:** `22.x` (cumple `engines` >= 22.20.0).
2. **Matriz:** ninguna; `ubuntu-latest` con una sola versión de Node.
3. **Fallos:** lint y pruebas en pasos separados; el job se detiene en el primer paso que falla.
4. **Cobertura:** se incluye `npm run coverage` como paso aparte porque pasa en limpio.

Pendientes:
5. **Formatter (p. ej. Prettier):** el ticket admite "linter y/o formatter"; hoy solo hay linter. Se agrega un formatter? Implicaría una dependencia nueva.
6. **Protección de `main`:** se exige el check como obligatorio para fusionar? Es configuración del repositorio, fuera del código.
7. **Orden de archivado:** se archivan antes `add-winners-podium` y `make-page-responsive`?
8. **Alcance de la prueba de color:** basta verificar el uso de variables azules (propuesto) o se quieren fijar valores exactos del azul?
