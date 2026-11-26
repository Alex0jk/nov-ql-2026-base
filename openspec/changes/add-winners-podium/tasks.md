# Tasks

## 1. Lógica del sorteo (`src/sorteo/`)

- [x] 1.1 En `src/sorteo/participantes.js`, reemplazar `MINIMO_PARA_SORTEAR` por `CANTIDADES_GANADORES`, `CANTIDAD_POR_DEFECTO` y `participantesNecesarios(cantidad)`, y hacer que `puedeSortear(participantes, cantidad)` sea verdadero solo si hay más participantes que ganadores; verificar con pruebas en `test/sorteo/participantes.test.js` para los límites 0, 1, 3 y 4 participantes con 1, 2 y 3 ganadores.
- [x] 1.2 En `src/sorteo/sorteo.js`, reemplazar `elegirGanador` por `elegirGanadores(participantes, cantidad, generarEntero)` con Fisher-Yates parcial sobre una copia, que devuelva el arreglo en orden de lugar y falle con cantidad inválida o participantes insuficientes; verificar con pruebas en `test/sorteo/sorteo.test.js`: cantidad exacta, todos distintos, todos de la lista, la lista original no se modifica y los errores.
- [x] 1.3 Agregar a `test/sorteo/sorteo.test.js` la prueba de equiprobabilidad exhaustiva con 5 participantes y 3 ganadores (recorrer todas las secuencias del generador falso); verificar que cada una de las 60 ordenaciones aparece exactamente una vez.
- [x] 1.4 Ejecutar `npm test`, `npm run lint` y `npm run coverage`; verificar que `src/sorteo/` mantiene al menos 90% de líneas y 80% de ramas.

## 2. Interfaz: cantidad, aviso y resultado

- [x] 2.1 En `src/index.html`, agregar el `fieldset` con la leyenda "Cantidad de ganadores" y los radios 1, 2 y 3 (1 marcado), y un elemento de aviso `role="status"` para el mensaje de insuficientes; verificar que `test/ui/aplicacion.test.js` comprueba que existen tres radios con el 1 seleccionado.
- [x] 2.2 Crear `src/ui/resultado.js` que construya, con `createElement` y `textContent`, el resultado de un ganador ("¡Tenemos un ganador!") o el podio ("¡Tenemos un podio!") con etiquetas "1.er lugar", "2.º lugar" y "3.er lugar"; verificar con `test/ui/resultado.test.js` para 1, 2 y 3 ganadores y para un nombre con HTML mostrado como texto.
- [x] 2.3 En `src/ui/aplicacion.js`, guardar la cantidad en el estado, llamar a `elegirGanadores`, mostrar el mensaje "Se necesitan al menos {N + 1} participantes para sortear {N} ganador(es)." y deshabilitar el botón cuando no se puede sortear, y ocultar el resultado al cambiar la cantidad; verificar con pruebas en `test/ui/aplicacion.test.js` que cubren los escenarios de la spec (justos, uno menos, un participante, lista vacía, cantidad inválida tras quitar y cambio de cantidad que oculta el resultado).
- [x] 2.4 Confirmar que `aplicacion.js` y `resultado.js` cumplen los límites de 150 líneas por archivo y 25 por función; verificar con `npm run lint`.

## 3. Estilos y adaptación del podio

- [x] 3.1 En `src/styles.css`, dar estilo al grupo de radios (área táctil de 44px con `pointer: coarse`) y al aviso de insuficientes; verificar con una captura a 375px donde el grupo y el mensaje se ven completos.
- [x] 3.2 En `src/styles.css`, agregar el podio con el 1.er lugar al centro y más alto, el 2.º a la izquierda y el 3.º a la derecha (orden visual solo por CSS), con tonos de `--azul-*` existentes y sin valores de color sueltos; verificar con capturas del podio de 2 y de 3 ganadores a 1280px.
- [x] 3.3 Medir con Chrome headless el podio de 3 con nombres de 50 caracteres sin espacios a 320px, 375px, 768px y 1280px; verificar que no hay desplazamiento horizontal y que los nombres quedan dentro de sus lugares.

## 4. Verificación integral y documentación

- [x] 4.1 Recorrer el ejemplo del ticket (Ana, Pedro, María, Luis y Sofía con 3 ganadores) en el navegador; verificar que se muestra "¡Tenemos un podio!" con tres lugares distintos, y que con 1 ganador el resultado es idéntico al de antes ("¡Tenemos un ganador!").
- [x] 4.2 Comprobar el caso de la lista que se achica (4 participantes, 3 ganadores, quitar uno) y el cambio de cantidad con resultado visible; verificar que el botón se deshabilita con el mensaje correcto y que el resultado desaparece.
- [x] 4.3 Con aprobación del equipo, actualizar en `AGENTS.md` la sección "Comportamiento que no debe cambiar" para reflejar que se necesitan N + 1 participantes para N ganadores; verificar leyendo el archivo.
- [x] 4.4 Ejecutar `npm test`, `npm run lint` y `npm run coverage`; verificar que todo pasa y que las pruebas previas de comportamiento (agregar, quitar, duplicados, vacíos) siguen pasando sin cambios.

## Workflow follow-up

- Revisar el cambio y archivarlo con `/openspec-archive-change` cuando se hayan cumplido los requisitos de revisión del proyecto.
- Verificar que la spec `sorteo-de-ganadores` aparece en `openspec/specs/` tras archivar.
- Configurar el CI del Ticket #2 (pruebas y CI) en un cambio aparte: este cambio no lo incluye.
