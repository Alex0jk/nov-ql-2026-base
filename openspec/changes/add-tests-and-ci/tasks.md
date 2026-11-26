# Tasks

## 1. Pruebas que cierran los vacíos

- [x] 1.1 Crear `test/ui/color-base.test.js` que lea `src/styles.css` e `src/index.html` y verifique la spec `color-base`: variables azules en `:root`, título, botón principal y fondo usando `var(--azul-*)`, sin colores literales fuera de `:root` y sin `style=` ni manejadores en línea; verificar con `npm test`.
- [x] 1.2 Agregar a `test/sorteo/sorteo.test.js` una prueba exhaustiva con el generador falso: para listas de 2 a 5 participantes (con menos no se sortea) y todas las salidas posibles, el ganador pertenece a la lista y con 1 ganador el resultado tiene exactamente un elemento; verificar con `npm test`.
- [x] 1.3 Revisar `test/ui/aplicacion.test.js` contra `specs/participantes` y agregar solo los escenarios no cubiertos (varios participantes en orden, espacios alrededor del nombre); verificar con `npm test`.
- [x] 1.4 Confirmar que las pruebas existentes cubren "no se puede sortear sin participantes suficientes" (lista vacía y un participante, en `test/sorteo/` y `test/ui/`); agregar lo que falte.
- [x] 1.5 Ejecutar `npm test` tres veces seguidas y verificar que el resultado es idéntico (deterministas), y `npm run coverage` para confirmar los umbrales.

## 2. Workflow de GitHub Actions

- [x] 2.1 Resolver con el desarrollador las preguntas abiertas 1 a 4 de `design.md` antes de escribir el workflow.
- [x] 2.2 Crear `.github/workflows/ci.yml` con disparadores `pull_request` hacia `main`, `push` a ramas distintas de `main` y `workflow_call`, y los pasos `npm ci`, `npm run lint`, `npm test` y `npm run coverage` separados; verificar leyendo el archivo contra la spec `integracion-continua`.
- [ ] 2.3 Cuando el desarrollador lo pida, abrir un pull request de prueba y verificar que el workflow termina en verde; comprobar que una rama con una prueba rota y otra con un error de lint terminan en rojo y muestran qué falló.

## 3. Documentación

- [x] 3.1 Agregar a `README.md` la sección "Pruebas, lint y CI" con `npm test`, `npm run coverage`, `npm run lint` y qué ejecuta el workflow; verificar que los comandos coinciden con los scripts de `package.json`.

## 4. Verificar que las pruebas detectan errores

- [x] 4.1 Romper a propósito, de una en una y sin guardar el cambio, (a) la elección para devolver a alguien fuera de la lista, (b) la regla para permitir sortear con la lista vacía y (c) la variable azul usada por el título y el botón; verificar que `npm test` falla en cada caso y revertir cada cambio de inmediato.
- [x] 4.2 Confirmar que no quedó código roto y que `npm test`, `npm run lint` y `npm run coverage` pasan en verde.
