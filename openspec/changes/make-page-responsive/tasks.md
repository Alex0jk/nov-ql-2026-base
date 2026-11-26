# Tasks

## 1. Base móvil primero

- [x] 1.1 En `src/styles.css`, poner `min-height: 100vh` seguido de `min-height: 100dvh` en `body`, y reducir el relleno de `.tarjeta` a 20px por defecto; verificar con `grep -n "100dvh" src/styles.css` y revisando que a 320px la tarjeta no toque los bordes.
- [x] 1.2 Hacer que `.fila` sea columna por defecto (campo y "Agregar" a todo el ancho) y pase a fila desde 480px con una media query; verificar con una captura a 375px (apilado) y otra a 600px (en una fila).
- [x] 1.3 Reducir el título y el nombre del ganador con `clamp()` según el diseño; verificar con capturas a 320px y 1280px en las que el ganador sea más pequeño en el móvil.

## 2. Nombres largos y lista

- [x] 2.1 Agregar `overflow-wrap: anywhere` al texto del participante y `min-width: 0` / `max-width: 100%` al `li` de `.lista`; verificar agregando un nombre de 50 caracteres sin espacios a 320px: se ve completo, dentro de la tarjeta y con el botón × visible.
- [x] 2.2 Confirmar que el ganador con un nombre de 50 caracteres a 320px se muestra completo dentro del bloque de resultado; verificar con captura.

## 3. Área táctil y pantallas grandes

- [x] 3.1 Agregar `@media (pointer: coarse)` con 44px mínimos de alto en campo y botones, y 44px por 44px en el botón ×; verificar emulando un dispositivo táctil en las herramientas del navegador y midiendo los elementos.
- [x] 3.2 Subir el `max-width` de `.tarjeta` a 560px desde 768px y a 640px desde 1024px, y el relleno a 28px desde 480px; verificar con capturas a 768px y 1280px donde la tarjeta está centrada y no supera 640px.

## 4. Verificación integral

- [x] 4.1 Comprobar que no hay desplazamiento horizontal a 320px, 375px, 768px y 1280px (`document.documentElement.scrollWidth <= clientWidth` en la consola) con 10 participantes agregados.
- [x] 4.2 Ejecutar `npm test`, `npm run lint` y `npm run coverage`; verificar que pasan igual que antes del cambio (20 pruebas, sin errores de lint, cobertura de `src/sorteo/` por encima de 90/80).
- [x] 4.3 Recorrer el flujo completo a 375px (agregar 3 participantes, quitar uno, sortear) y verificar que los textos, el azul base y el resultado "¡Tenemos un ganador!" son iguales que en escritorio.

## Workflow follow-up

- Revisar el cambio y archivarlo con `/openspec-archive-change` cuando se hayan cumplido los requisitos de revisión del proyecto.
- Verificar que la spec `diseno-responsivo` aparece en `openspec/specs/` tras archivar.
