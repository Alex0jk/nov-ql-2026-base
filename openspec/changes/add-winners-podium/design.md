# Design

## Context

Hoy `src/sorteo/sorteo.js` expone `elegirGanador(participantes, generarEntero)` y `src/sorteo/participantes.js` expone `puedeSortear(participantes)` con el mínimo fijo `MINIMO_PARA_SORTEAR = 2`. `src/ui/aplicacion.js` (91 de 150 líneas permitidas) guarda el estado `{ participantes }` y dibuja el único ganador en `#resultado`. El generador aleatorio se inyecta como `(maximo) => entero` en `[0, maximo)`. Ver `proposal.md` para las decisiones de producto y `specs/sorteo-de-ganadores/spec.md` para los requisitos.

Restricciones de `AGENTS.md`: la lógica de `src/sorteo/` no conoce el DOM ni usa `Math.random`; los colores salen de variables CSS; funciones de máximo 25 líneas y archivos de máximo 150; nombres en español; sin dependencias nuevas.

## Goals / Non-Goals

**Goals:**
- Elegir 1 a 3 ganadores distintos y equiprobables con el generador inyectado, de forma verificable en pruebas deterministas.
- Mostrar un ganador o un podio sin romper el diseño responsivo.

**Non-Goals:**
- Más de 3 ganadores, premios con nombre, animaciones del sorteo o guardar resultados.
- Cambiar cómo se agregan o quitan participantes.

## Decisions

1. **Algoritmo: Fisher-Yates parcial sobre una copia.** Para `i` de 0 a `cantidad - 1`, se elige `j = i + generarEntero(longitud - i)`, se intercambian las posiciones `i` y `j` y se toman las primeras `cantidad`. Cada ordenación de `cantidad` participantes distintos tiene la misma probabilidad si el generador es uniforme. No muta la lista original. *Alternativas:* (a) sacar uno y repetir hasta no repetir (rechazo): no acota las repeticiones y complica las pruebas; (b) mezclar toda la lista y cortar: hace trabajo innecesario y consume más números del generador.

2. **El generador sigue siendo `(maximo) => entero` y se inyecta igual.** `src/main.js` no cambia. Las pruebas pueden recorrer todas las secuencias posibles de un generador falso y comprobar que cada ordenación aparece exactamente una vez (equiprobabilidad verificada de forma exacta, sin estadística).

3. **`elegirGanador` pasa a `elegirGanadores(participantes, cantidad, generarEntero)`** y devuelve un arreglo ordenado (índice 0 = 1.er lugar). Lanza un error si la cantidad no es un entero de 1 a 3 o si no hay más participantes que ganadores. El nombre anterior se elimina: solo lo usa `src/ui/aplicacion.js`.

4. **Reglas de cantidad en `src/sorteo/`:** `CANTIDADES_GANADORES = [1, 2, 3]`, `CANTIDAD_POR_DEFECTO = 1`, `participantesNecesarios(cantidad) = cantidad + 1` y `puedeSortear(participantes, cantidad)` (verdadero si `participantes.length > cantidad`). `MINIMO_PARA_SORTEAR` se elimina. Con la cantidad por defecto, el comportamiento actual (mínimo 2) se conserva. La UI no repite estas reglas: las importa.

5. **El texto del mensaje de insuficientes vive en la UI**, igual que los mensajes de error actuales, construido con `participantesNecesarios(cantidad)`. Se usa la plantilla literal del ticket, incluido "ganador(es)".

6. **Control de cantidad: tres `input type="radio"` dentro de un `fieldset` con `legend` "Cantidad de ganadores".** Se accede con teclado (flechas), lo lee un lector de pantalla y se adapta al área táctil de 44px de `diseno-responsivo`. *Alternativas:* `select` (un toque extra, peor en escritorio) y campo numérico (permite valores inválidos).

7. **Render del resultado en un módulo nuevo `src/ui/resultado.js`.** `aplicacion.js` queda con el estado y los eventos, y `resultado.js` construye con `createElement` y `textContent` el bloque de un ganador o el podio (por esto se mantienen los límites de 150 líneas y 25 por función). Podio: una lista ordenada `ol` con tres columnas en un orden visual fijo (2.º, 1.er, 3.º) usando CSS (`order`), de modo que el orden del DOM y de lectura siga siendo 1.º, 2.º, 3.º. Con 2 ganadores solo se crean dos columnas, y el lugar derecho queda como espacio vacío para que el 1.er lugar siga al centro.

8. **Estilos del podio:** escalones con alturas distintas (1.er > 2.º > 3.º) y tonos de `--azul-*` existentes; no se agregan colores nuevos. En 320px las tres columnas comparten el ancho con `min-width: 0` y `overflow-wrap: anywhere` para los nombres, y la tipografía de los nombres usa `clamp()` como el resto de la página.

9. **Cambiar la cantidad oculta el resultado** reutilizando `ocultarResultado()`, igual que agregar o quitar participantes (R3). La cantidad vive en el estado de `aplicacion.js` como un número, junto a `participantes`.

10. **Pruebas:** se actualizan `test/sorteo/sorteo.test.js` y `test/sorteo/participantes.test.js`, y se agrega la prueba de equiprobabilidad exhaustiva; `test/ui/aplicacion.test.js` cubre los radios, el mensaje, el podio y R3 con `jsdom`, y se agrega `test/ui/resultado.test.js` para el render. La verificación visual del podio a 320px, 768px y 1280px se hace con capturas, igual que en `make-page-responsive`.

## Risks / Trade-offs

- [Un error en el intercambio de Fisher-Yates produce ganadores repetidos o sesgo sin que se note] → La prueba exhaustiva sobre todas las secuencias del generador detecta tanto repetidos como sesgo.
- [El orden visual del podio cambia el orden del DOM y confunde a lectores de pantalla] → El DOM conserva el orden 1.º, 2.º, 3.º y el reordenamiento es solo CSS; cada lugar incluye su etiqueta de texto.
- [Mostrar el mensaje con lista vacía cambia el comportamiento visible de la app] → Está documentado en la propuesta y cubierto con un escenario en la spec.
- [Los emojis de medalla se ven distinto según el sistema] → La posición también está en texto, así que el podio se entiende sin ellos.
- [`AGENTS.md` conserva la línea "al menos 2 participantes"] → Hay una tarea para actualizarla con aprobación del equipo.

## Open Questions

- ¿Conviene una animación breve al revelar el podio? No cambia la spec ni las tareas; puede decidirse después (ya existe la clase `animar` que respeta `prefers-reduced-motion`).
