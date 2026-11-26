# Tasks

## 1. Lógica de la cuenta regresiva (`src/sorteo/`)

- [x] 1.1 Crear `src/sorteo/cuentaRegresiva.js` con `iniciarCuentaRegresiva({ desde, programar, alCambiar, alTerminar })`, `PASO_MS = 1000` y función `cancelar`; sin `setTimeout` ni DOM; verificar con `test/sorteo/cuentaRegresiva.test.js` usando un temporizador falso: secuencia 3, 2, 1 y fin, intervalos de 1000 ms, `alTerminar` solo una vez, sin pendientes al terminar, `cancelar` y `desde` igual a 1.
- [x] 1.2 Ejecutar `npm run coverage`; verificar que `src/sorteo/` mantiene al menos 90% de líneas y 80% de ramas.

## 2. Interfaz: cuenta, bloqueo y flujo

- [x] 2.1 En `src/index.html`, agregar `#cuenta` con `aria-live` y `hidden`; verificar en `test/ui/aplicacion.test.js` que existe y está oculto al inicio.
- [x] 2.2 En `src/main.js`, crear `programar` real con `setTimeout`/`clearTimeout` y pasarlo a `iniciarAplicacion`; verificar leyendo que no se usan temporizadores fuera de `main.js`.
- [x] 2.3 En `src/ui/aplicacion.js` (o un módulo nuevo en `src/ui/` si se acerca al límite de 150 líneas), implementar el flujo: sorteo inválido sin cuenta (R3), ocultar resultado anterior, bloquear y desbloquear controles, mostrar cada número con `textContent` y dibujar el resultado al terminar; verificar con pruebas `jsdom` con generador y temporizador falsos que cubren R1, R2 y R3.
- [x] 2.4 Hacer que `dibujar` y los manejadores de agregar, quitar y cambiar cantidad respeten `estado.contando`; verificar con una prueba que intenta modificar datos durante la cuenta.
- [x] 2.5 Actualizar las pruebas existentes de `test/ui/` que sortean para avanzar el temporizador falso 3000 ms; verificar que ninguna espera tiempo real.

## 3. Estilos

- [ ] 3.1 En `src/styles.css`, agregar `.cuenta` grande, centrada y con una variable `--azul-*` existente, sin colores sueltos; verificar con captura a 1280px.
- [ ] 3.2 Medir con Chrome headless a 320px, 375px, 768px y 1280px; verificar que no hay desplazamiento horizontal.

## 4. Verificación integral y documentación

- [x] 4.1 Recorrer el ejemplo del ticket (Ana, Pedro, María, Luis y Sofía, 1 ganador) en el navegador; verificar 3, 2, 1 y luego "¡Tenemos un ganador!".
- [x] 4.2 Probar con 3 ganadores (podio), con un participante (sin cuenta, con mensaje) y con un resultado previo visible (se oculta al iniciar).
- [ ] 4.3 Con aprobación del equipo, actualizar `AGENTS.md` ("Comportamiento que no debe cambiar") para incluir la cuenta regresiva; verificar leyendo el archivo.
- [x] 4.4 Ejecutar `npm test`, `npm run lint` y `npm run coverage`; verificar que todo pasa y que las pruebas previas siguen pasando.

## Workflow follow-up

- Revisar el cambio y archivarlo con `/openspec-archive-change` después de archivar `add-winners-podium`.
- Verificar que la spec `cuenta-regresiva` aparece en `openspec/specs/` tras archivar.
