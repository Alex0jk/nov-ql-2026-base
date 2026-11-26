# Design

## Context

Hoy `src/styles.css` define una tarjeta de `max-width: 480px`, un `body` con `min-height: 100vh` y centrado con `display: grid`, y no tiene ninguna media query. `src/index.html` ya incluye el meta viewport. La lista de participantes usa `flex-wrap`, pero los nombres no se parten (solo `.ganador` tiene `word-break`). Ver `proposal.md` para la motivación.

Restricciones del proyecto (`AGENTS.md`): sin frameworks, los colores solo como variables en `:root`, sin estilos en línea, y el comportamiento visible no cambia. Por eso todo el cambio vive en CSS.

## Goals / Non-Goals

**Goals:**
- Cumplir los requisitos de `specs/diseno-responsivo/spec.md` solo con CSS (y como máximo atributos de HTML).
- Mantener una sola hoja de estilos, con enfoque "móvil primero": los estilos base sirven para 320px y las media queries agregan para pantallas mayores.

**Non-Goals:**
- Modo oscuro, orientación horizontal específica, impresión o soporte de navegadores sin `clamp()` / `dvh`.
- Cambiar textos, colores, estructura del DOM o lógica de JavaScript.
- Agregar herramientas de pruebas visuales (Playwright, etc.): sería una dependencia nueva.

## Decisions

1. **Móvil primero con dos puntos de quiebre: 480px y 768px.** Se eligen por contenido: a 480px caben en una fila el campo y "Agregar"; a 768px la tarjeta puede crecer. *Alternativa:* quiebres por dispositivo (375/414/1024), descartada porque se desactualiza y no responde a un problema concreto.

2. **Fila de entrada: `flex-direction: column` por defecto, `row` desde 480px.** *Alternativa:* `flex-wrap` con un `min-width` en el campo; descartada porque el botón puede quedar solo en una segunda línea a un ancho intermedio, con un aspecto irregular.

3. **Tamaños con `clamp()`** para el título (`clamp(1.5rem, 6vw, 2rem)`) y el ganador (`clamp(1.75rem, 8vw, 2.5rem)`). Cambia suavemente sin saltos. *Alternativa:* valores fijos por media query, descartada por ser más código y producir saltos visibles.

4. **Área táctil con `@media (pointer: coarse)`**: `min-height: 44px` en campo y botones, y el botón × pasa a `min-width: 44px; min-height: 44px`. Con puntero fino (ratón) el diseño compacto actual se conserva. *Alternativa:* aplicar 44px siempre; descartada porque agranda la interfaz en escritorio sin necesidad.

5. **Nombres largos: `overflow-wrap: anywhere`** en el texto del participante y `min-width: 0` en el elemento flex que lo contiene, para que el contenedor pueda encogerse. El `li` deja de ser una píldora de ancho al contenido cuando el nombre es largo (`max-width: 100%`). *Alternativa:* truncar con puntos suspensivos; descartada porque oculta información del nombre, y el ganador debe verse completo.

6. **Altura con `min-height: 100vh` seguido de `min-height: 100dvh`.** Los navegadores que no entienden `dvh` ignoran la segunda declaración y usan `vh`.

7. **Tarjeta: relleno de 20px por defecto y 28px desde 480px; `max-width` 480px por defecto, 560px desde 768px y 640px desde 1024px.** Se reutilizan los quiebres de la decisión 1 más 1024px solo para el ancho máximo. *Alternativa:* un único `max-width: 640px`; descartada porque a 480–640px de pantalla no deja márgenes.

8. **Verificación visual manual con capturas** a 320px, 375px, 768px y 1280px usando Firefox o Chrome headless, que ya están en la máquina, sin instalar nada. Las 20 pruebas existentes cubren que el comportamiento no cambió.

## Risks / Trade-offs

- [Las propiedades de área táctil dependen de `pointer: coarse`, que un navegador puede reportar mal] → Es una mejora progresiva: si no aplica, el diseño compacto sigue siendo usable.
- [Sin pruebas automáticas de diseño, una regresión visual puede pasar inadvertida] → Se documentan las capturas de verificación en las tareas; se puede automatizar en un cambio futuro si el equipo acepta una herramienta nueva.
- [`overflow-wrap: anywhere` puede partir palabras en medio] → Solo afecta a nombres que no caben; en nombres normales no se nota.
- [`AGENTS.md` limita el CSS: los colores deben salir de variables] → Los cambios de este diseño no introducen colores nuevos.
