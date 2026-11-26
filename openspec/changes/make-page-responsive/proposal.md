# Proposal

## Why

La página ya incluye el meta viewport y una tarjeta de ancho flexible, pero no se diseñó para pantallas pequeñas: en un móvil de 320px la fila de "Nombre + Agregar" queda apretada, el nombre del ganador (2.5rem) puede desbordar, los botones de quitar participante (×) son difíciles de tocar y la página usa `100vh`, que en navegadores móviles queda cortado por la barra de direcciones. En pantallas grandes la tarjeta de 480px queda pequeña y perdida. Conviene corregirlo ahora, antes de agregar más funcionalidades (podio, cuenta regresiva) que añadirán más contenido a la misma pantalla.

## What Changes

- La interfaz se adapta a anchos desde 320px hasta escritorio sin scroll horizontal.
- En pantallas estrechas la fila de entrada se apila en vertical: el campo y el botón "Agregar" ocupan todo el ancho.
- Los controles interactivos (botones y campo de texto) tienen un área táctil mínima de 44px en pantallas táctiles.
- Los nombres largos se ajustan (se parten en varias líneas) sin desbordar la tarjeta ni la lista de participantes.
- El tamaño de títulos y del nombre del ganador escala con el ancho de la pantalla (`clamp()`).
- El espaciado de la tarjeta se reduce en pantallas pequeñas y la tarjeta crece en pantallas grandes (ancho máximo mayor).
- La altura mínima de la página usa `dvh` (con `vh` de respaldo) para no quedar cortada en móviles.
- No cambia ninguna regla de negocio, texto, color ni el comportamiento de la aplicación. Solo cambia `src/styles.css` y, si hace falta, atributos de `src/index.html`.

## Capabilities

### New Capabilities
- `diseno-responsivo`: cómo se presenta y se usa la interfaz en distintos tamaños de pantalla (sin desbordes, área táctil mínima, adaptación del diseño y legibilidad).

### Modified Capabilities
<!-- Ninguna: todavía no existen specs en openspec/specs/. -->

## Impact

- **Código:** `src/styles.css` (media queries, `clamp()`, `dvh`, tamaños táctiles) y posiblemente `src/index.html` (atributos como `inputmode`/`enterkeyhint` en el campo de nombre).
- **Pruebas:** la lógica y los handlers no cambian, por lo que las 20 pruebas existentes deben seguir pasando. La verificación del diseño es visual, con capturas a 320px, 768px y 1280px.
- **Dependencias:** ninguna. Sin frameworks ni librerías nuevas.
- **Supuestos (a confirmar al revisar):**
  - "Responsivo" significa cubrir móvil (320–480px), tablet (~768px) y escritorio (≥1024px); no se pide orientación horizontal específica ni modo oscuro.
  - Los puntos de quiebre se eligen por contenido, no por dispositivo concreto.
  - No se pide soporte para navegadores anteriores a los que ya soportan `clamp()` y `dvh`; `vh` queda como respaldo.
