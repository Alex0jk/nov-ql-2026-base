# Proposal

## Why

El sorteo es más emocionante con un poco de suspenso. Antes de mostrar a los ganadores, la aplicación debe mostrar una cuenta regresiva 3… 2… 1…, siguiendo las reglas R1, R2 y R3 de `instrucciones/tarea-2/ticket-4-cuenta-regresiva.md`.

## What Changes

- Al presionar "Sortear ganador" con un sorteo válido, se muestra una cuenta regresiva de 3 a 1, con un segundo entre cada número, de forma grande y visible y con el color base de la aplicación.
- Después del 1 se muestra el resultado: un ganador o un podio, según lo define la capability `sorteo-de-ganadores` (cambio `add-winners-podium`). Este cambio no redefine cómo se eligen ni cómo se muestran los ganadores.
- Durante la cuenta regresiva: el botón "Sortear ganador" está deshabilitado, no se puede modificar la lista de participantes ni la cantidad de ganadores, y el resultado anterior deja de mostrarse.
- Si el sorteo no se puede realizar (por ejemplo, participantes insuficientes), no se muestra la cuenta regresiva; se muestra directamente el mensaje de error ya definido en `sorteo-de-ganadores`.
- El tiempo se inyecta: la lógica de la cuenta recibe una función `programar(accion, milisegundos)` que devuelve una función para cancelar. Solo `src/main.js` crea la implementación real (con `setTimeout`). Las pruebas usan un temporizador inyectado falso (o fake timers) y no esperan segundos reales.

### Decisiones tomadas (casos que el ticket no cubre)

1. **Reloj inyectado:** la cuenta regresiva vive en `src/sorteo/` como lógica sin DOM ni `setTimeout` directo, y recibe `programar` desde fuera, igual que el generador aleatorio.
2. **Cuándo se eligen los ganadores:** al terminar la cuenta (después del 1), con el generador inyectado; mientras tanto la lista y la cantidad están bloqueadas, así que el resultado no depende del momento.
3. **Bloqueo de la cantidad y de la lista:** se deshabilitan los radios, el campo de nombre, el botón "Agregar" y los botones de quitar mientras dure la cuenta; al terminar se vuelven a habilitar.
4. **Sin cancelación:** el usuario no puede detener la cuenta una vez iniciada.
5. **Cada número dura un segundo:** el 3 aparece al instante de presionar, el 2 a 1 s, el 1 a 2 s y el resultado a 3 s.
6. **Accesibilidad:** la cuenta se anuncia con una región `aria-live` y no depende solo del color.
7. **Diseño adaptable:** el número grande debe cumplir `diseno-responsivo` (sin scroll horizontal desde 320px).

## Capabilities

### New Capabilities
- `cuenta-regresiva`: cuándo se muestra la cuenta 3-2-1, qué se bloquea mientras dura, y cuándo aparece el resultado.

### Modified Capabilities
<!-- Ninguna spec existente cambia: `sorteo-de-ganadores` (add-winners-podium) y `diseno-responsivo` (make-page-responsive) están pendientes de archivar y solo se referencian. Este cambio asume que `add-winners-podium` se aplica y archiva antes. -->

## Impact

- **Código:** `src/sorteo/` (nuevo módulo de cuenta regresiva con temporizador inyectado), `src/ui/` (render del número, bloqueo de controles, flujo del botón), `src/main.js` (crea el `programar` real), `src/index.html`, `src/styles.css`.
- **Pruebas:** nuevas en `test/sorteo/` y `test/ui/` con temporizador inyectado falso; las de `test/ui/aplicacion.test.js` que sortean deben avanzar el temporizador falso.
- **Dependencias:** ninguna.
- **Documentación:** `AGENTS.md` ("Comportamiento que no debe cambiar") no menciona la cuenta; actualizarla requiere aprobación del equipo.
- **Dependencias entre cambios:** requiere `add-winners-podium` (mensaje de insuficientes y resultado único/podio).
- **Fuera de alcance:** el CI del Ticket #2.
