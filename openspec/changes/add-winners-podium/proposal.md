# Proposal

## Why

Los eventos de la comunidad suelen entregar más de un premio, pero el sorteo solo elige a un ganador. Se quiere poder elegir 1, 2 o 3 ganadores y mostrarlos como un podio (1.er, 2.º y 3.er lugar), siguiendo las reglas R1, R2 y R3 de `instrucciones/tarea-2/ticket-3-podio.md`.

## What Changes

- Se agrega un control para elegir la cantidad de ganadores: 1, 2 o 3 (por defecto 1).
- El sorteo elige exactamente esa cantidad de ganadores, todos distintos y con la misma probabilidad para cualquier lugar.
- La cantidad de ganadores debe ser menor que el número de participantes. Si no lo es, no se puede sortear y se muestra el mensaje `Se necesitan al menos {N + 1} participantes para sortear {N} ganador(es).`
- Con 1 ganador el resultado se muestra como hoy ("¡Tenemos un ganador!"). Con 2 o 3 se muestra "¡Tenemos un podio!" con los ganadores en forma de podio, con 1.er lugar al centro y más alto, 2.º a la izquierda y 3.er a la derecha, usando el color base.
- Al cambiar la lista de participantes o la cantidad de ganadores, el resultado anterior deja de mostrarse.
- **Cambio visible de comportamiento:** hoy, con 0 o 1 participantes el botón de sortear solo aparece deshabilitado, sin explicación. Con este cambio se muestra siempre el mensaje de participantes insuficientes cuando el sorteo no se puede hacer.

### Decisiones tomadas (casos que el ticket no cubre)

1. **Control de cantidad:** un grupo de opciones (radio) con 1, 2 y 3, en lugar de un campo numérico libre, porque solo hay tres valores válidos y se toca fácilmente en móvil.
2. **Podio con 2 ganadores:** se muestran solo el 1.er lugar (centro) y el 2.º (izquierda); el lugar derecho queda vacío, sin tercer escalón.
3. **Cantidad seleccionada y pocos participantes:** si el usuario quita participantes y la cantidad elegida deja de ser válida, la cantidad no se cambia sola; el botón se deshabilita y se muestra el mensaje.
4. **Mensaje con lista vacía:** también se muestra con 0 participantes, junto al texto "Aún no hay participantes."
5. **Nuevo sorteo:** presionar "Sortear ganador" otra vez hace un sorteo nuevo e independiente del anterior.
6. **Unicidad:** los nombres ya son únicos en la lista (sin distinguir mayúsculas), por lo que "ganadores distintos" significa participantes distintos.
7. **Textos accesibles:** cada lugar del podio incluye su etiqueta de texto ("1.er lugar", "2.º lugar", "3.er lugar") además de la medalla, para que no dependa solo del emoji.
8. **Diseño adaptable:** el podio debe cumplir `diseno-responsivo` (sin scroll horizontal desde 320px, nombres largos partidos).

## Capabilities

### New Capabilities
- `sorteo-de-ganadores`: cuántos ganadores se eligen, cuándo se puede sortear, cómo se eligen (distintos y equiprobables) y cómo se muestran (ganador único o podio).

### Modified Capabilities
<!-- Ninguna: todavía no existen specs en openspec/specs/ (el cambio make-page-responsive, que crea diseno-responsivo, está pendiente de archivar y no se solapa con esta capability). -->

## Impact

- **Código:** `src/sorteo/` (nueva función para elegir varios ganadores, regla de cantidad mínima de participantes), `src/ui/` (control de cantidad, aviso de insuficientes, render del resultado y del podio), `src/index.html`, `src/styles.css`.
- **Pruebas:** se reemplazan y amplían las de `test/sorteo/` y `test/ui/`.
- **Dependencias:** ninguna.
- **Documentación:** la sección "Comportamiento que no debe cambiar" de `AGENTS.md` queda desactualizada (dice "al menos 2 participantes para sortear"); debe actualizarse con aprobación del equipo.
- **Dependencia del ticket:** el criterio "el CI del Ticket #2 pasa" supone que existe ese CI; hoy no existe. Este cambio garantiza que `npm test`, `npm run lint` y `npm run coverage` pasen; el CI queda fuera de alcance.
