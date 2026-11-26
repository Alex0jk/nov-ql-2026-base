# Design

## Context

Hoy `src/ui/aplicacion.js` (ver estado del cambio `add-winners-podium`) elige y dibuja el resultado de inmediato en `alSortear`. `src/main.js` es el único punto que crea dependencias reales (el generador con `crypto.getRandomValues`). Las reglas R1, R2 y R3 están en `proposal.md` y en `specs/cuenta-regresiva/spec.md`. La elección y el aspecto del resultado (un ganador o un podio), el mensaje de insuficientes y `puedeSortear` pertenecen a `sorteo-de-ganadores` y no se duplican aquí.

Restricciones de `AGENTS.md`: el no determinismo (tiempo) se inyecta; la lógica de `src/sorteo/` no usa `document`, `window` ni temporizadores directos; colores solo como variables CSS en `:root`; texto con `textContent`; funciones de máximo 25 líneas y archivos de máximo 150; nombres en español; sin dependencias nuevas.

## Goals / Non-Goals

**Goals:**
- Mostrar 3, 2, 1 con un segundo entre cada número y luego el resultado.
- Bloquear sorteo y datos durante la cuenta, y no mostrar cuenta si el sorteo es inválido.
- Pruebas deterministas, sin esperas reales.

**Non-Goals:**
- Cambiar cómo se eligen o se muestran los ganadores.
- Cancelar la cuenta, configurar su duración, sonido o animaciones (ver Open Questions).

## Decisions

1. **Módulo `src/sorteo/cuentaRegresiva.js`:** `iniciarCuentaRegresiva({ desde, programar, alCambiar, alTerminar })` con `desde = 3` (constante `NUMEROS_CUENTA`) y `PASO_MS = 1000`. Llama `alCambiar(3)` de inmediato, programa con `programar(accion, PASO_MS)` el siguiente número y, tras el 1, `alTerminar()`. Devuelve una función `cancelar` para limpiar el temporizador pendiente (útil en pruebas y para futuras ampliaciones; la UI no la expone al usuario). Sin DOM ni `setTimeout`.

2. **Contrato del temporizador inyectado:** `programar(accion, milisegundos) => cancelar`. `src/main.js` lo crea con `setTimeout`/`clearTimeout`. Las pruebas usan un temporizador falso propio (cola de acciones que se dispara a mano) para `src/sorteo/`, y la misma técnica o los fake timers de `node:test` (`mock.timers`) para `src/ui/`. *Alternativa descartada:* llamar `setTimeout` desde la UI y usar solo fake timers: funciona, pero rompe la regla de inyectar el no determinismo.

3. **`iniciarAplicacion` recibe `programar`** junto a `generarEntero`. La UI no repite reglas de negocio: usa `puedeSortear` y el mensaje de `sorteo-de-ganadores`.

4. **Flujo de `alSortear` en la UI:** (a) si `puedeSortear` es falso, no se inicia cuenta y se deja el mensaje de error visible (R3; el botón ya está deshabilitado, esto cubre además un clic forzado); (b) si es verdadero, se llama `ocultarResultado`, se marca el estado `contando = true`, se bloquean los controles y se inicia la cuenta; (c) `alCambiar(n)` escribe `n` con `textContent` en `#cuenta`; (d) `alTerminar` oculta `#cuenta`, elige con `elegirGanadores(...)` y `dibujarResultado(...)`, y desbloquea.

5. **Bloqueo de controles:** una función `bloquearControles(el, bloqueado)` en `src/ui/` fija `disabled` en botón de sortear, radios, campo de nombre, botón "Agregar" y botones de quitar. El re-dibujo (`dibujar`) debe respetar `estado.contando` para que un redibujo no rehabilite el botón. Los manejadores de agregar, quitar y cambiar cantidad ignoran el evento si `estado.contando` es verdadero (defensa además del `disabled`).

6. **HTML y estilos:** nuevo `<p id="cuenta" class="cuenta" aria-live="assertive" hidden>` (o `role="status"`) en `src/index.html`. En `src/styles.css`, `.cuenta` usa `font-size: clamp(...)` grande, centrado, `color: var(--azul-...)` ya existente; sin valores de color sueltos ni estilos en línea.

7. **Pruebas:** `test/sorteo/cuentaRegresiva.test.js` (secuencia 3-2-1-fin, intervalos de 1000 ms exactos, sin temporizadores pendientes, `cancelar`, `desde` de 1 como caso límite). `test/ui/aplicacion.test.js` con `jsdom`, el `index.html` real, generador falso y temporizador falso: R1 (secuencia y resultado al final, uno y podio), R2 (botón, radios, lista y resultado anterior) y R3 (sin cuenta y con mensaje). Las pruebas existentes que sortean avanzan el temporizador falso 3000 ms. Ninguna espera tiempo real.

## Risks / Trade-offs

- [Redibujar la UI durante la cuenta rehabilita controles] → `dibujar` consulta `estado.contando`, con prueba que lo cubre.
- [Un temporizador pendiente al reiniciar la app causa fugas en pruebas] → la función `cancelar` y una comprobación de "sin pendientes" en las pruebas.
- [Cambia el comportamiento visible: el resultado ya no es inmediato] → documentado en la propuesta; actualizar `AGENTS.md` con aprobación del equipo.
- [Dependencia de `add-winners-podium`, aún en curso] → este cambio se implementa y archiva después de ese; si cambia su contrato, se ajusta la spec.

## Open Questions

Decisiones de producto no tomadas (se necesita al desarrollador):
- ¿Se agrega una animación a cada número (escala, fundido)? Si es así, debe respetar `prefers-reduced-motion`.
- ¿Se agrega sonido en cada número o al revelar? (Implica decidir archivos o API de audio y el bloqueo de autoplay.)
- ¿Qué texto acompaña a la cuenta, si alguno (p. ej. "Sorteando…")? Por defecto, solo el número.
- ¿Qué tono exacto de `--azul-*` y qué tamaño máximo tiene el número?
- ¿Debe poder cancelarse la cuenta? Por defecto, no.
- ¿Debe cambiar el texto o la apariencia del botón durante la cuenta (p. ej. "Sorteando…")? Por defecto, solo se deshabilita.
- ¿Conviene un tiempo configurable? Por defecto, fijo en 3 números de 1 s.
