# AGENTS.md

Este archivo tiene dos partes:
- **Parte 1: Guía general.** Principios que aplican a cualquier proyecto del equipo.
- **Parte 2: Guía de la aplicación.** Decisiones propias del selector de ganadores. Si una regla de la Parte 2 contradice la Parte 1, gana la Parte 2.

---

# Parte 1: Guía general

## Diseño del código
- Una sola responsabilidad por módulo.
- La lógica de negocio no conoce la interfaz gráfica ni el entorno de ejecución (DOM, red, disco).
- Las dependencias se reciben desde fuera (parámetro o constructor); solo el punto de entrada crea las implementaciones reales.
- Las fuentes de no determinismo (azar, fecha y hora, red) se inyectan; nunca se llaman directamente desde la lógica.
- Las funciones de la lógica de negocio son puras o reciben su estado explícitamente; no usan estado global mutable.
- Los módulos dependen de contratos simples (funciones o interfaces), no de implementaciones concretas.
- Nombres de identificadores, funciones y archivos en un solo idioma (español), sin mezclar. Excepción: nombres impuestos por APIs o herramientas.
- Textos visibles al usuario y comentarios en español.
- Sin código comentado ni logs de depuración.
- Todo dato del usuario se trata como no confiable: nunca se interpreta como código ni como HTML.

## Pruebas
- Todo cambio de comportamiento incluye pruebas automáticas en el mismo cambio.
- Un bug se corrige primero con una prueba que lo reproduce.
- No se da por terminada una tarea si las pruebas o el lint fallan.
- No se desactivan, omiten ni borran pruebas para que pasen.
- Las pruebas son deterministas: no dependen de azar real, reloj ni orden de ejecución, y no comparten estado entre sí.
- Se prueban siempre los casos límite: vacío, un solo elemento, entradas inválidas y duplicados.
- La cobertura mínima se define en la Parte 2 y se verifica con un comando que falla si no se alcanza.

## Proceso
- Un refactor no cambia el comportamiento visible.
- Los cambios son pequeños y revisables; no se mezclan refactor y funcionalidad nueva en el mismo cambio.
- Las reglas nuevas de este archivo se proponen al equipo; la IA no las escribe por su cuenta.

## Lo que la IA no debe hacer
- Agregar dependencias (`dependencies` o `devDependencies`) sin preguntar antes.
- Introducir frameworks, bundlers o lenguajes nuevos sin que se pida.
- Modificar workflows de CI, scripts de `package.json` ni la configuración de lint sin que se pida.
- Hacer commit, push ni abrir PR sin que se pida.
- Editar `openspec/specs/` a mano; se actualiza con el flujo de OpenSpec.
- Usar `eval`, ni desactivar reglas de lint (`// eslint-disable`) sin justificarlo en un comentario.
- Tomar decisiones de producto (colores, textos, alcance) sin preguntar al desarrollador.

---

# Parte 2: Guía de la aplicación

## Proyecto
Selector de ganadores para sorteos. Solo frontend (sin backend), con HTML, CSS y JavaScript (ES modules) sin frameworks. El usuario agrega participantes y sortea un único ganador. El color base de la interfaz es azul y lo decide el equipo, no el usuario final.

## Comandos
- Instalar: `npm install`
- Ejecutar: `npm run dev` (sirve `src/` en `http://localhost:8001` con `scripts/servir.js`, solo `node:http`, sin dependencias externas; el puerto se cambia con `PORT`)
- Pruebas: `npm test`
- Cobertura: `npm run coverage`
- Revisar el código (lint): `npm run lint`
- Antes de dar una tarea por terminada deben pasar `npm test` y `npm run lint`.

## Tecnología
- JavaScript moderno (ES modules, `type: "module"`); Node.js >= 22.20.0 para las herramientas.
- Sin frameworks ni librerías de UI. El navegador es el único entorno de ejecución de la app.
- Pruebas: el runner nativo de Node (`node:test` y `node:assert`). No se usa Jest ni Vitest.
- Lint: ESLint con `eslint.config.js`; también hace cumplir los límites de 150 líneas por archivo y 25 por función.
- Las pruebas de `src/sorteo/` corren en Node, sin navegador y sin DOM. Las de `src/ui/` usan `jsdom`.
- La app se sirve por HTTP (los ES modules no cargan con `file://`); no se abre `index.html` directamente.

## Estructura del código
- `src/index.html`, `src/styles.css`: página y estilos.
- `src/main.js`: único punto de entrada. Crea las dependencias reales y las conecta.
- `src/sorteo/`: lógica de dominio (lista de participantes, validaciones, elección del ganador). No importa nada de `src/ui/` ni usa `document`, `window` ni `Math.random`.
- `src/ui/`: lectura y escritura del DOM y manejo de eventos. No contiene reglas de negocio.
- `test/`: refleja la estructura de `src/` (`test/sorteo/...`). Un archivo de prueba por módulo, con nombre `*.test.js`.

## Diseño del código (específico)
- Un archivo no supera las 150 líneas y una función no supera las 25.
- El generador aleatorio se inyecta como función `(max) => entero` que devuelve un entero en `[0, max)`.
- Solo `src/main.js` crea el generador real, con `crypto.getRandomValues`. Nunca se llama a `Math.random()`.
- El sorteo es uniforme: sin sesgo de módulo.
- Sin `var`; `const` por defecto.
- El HTML no tiene estilos ni manejadores de eventos en línea (`style=`, `onclick=`).
- Los colores se definen solo como variables CSS en `:root`; no hay valores de color sueltos en otras reglas.
- El texto del usuario se inserta con `textContent`, nunca con `innerHTML`.

## Pruebas (específico)
- Cobertura mínima de `src/sorteo/`: 90% de líneas y 80% de ramas. `npm run coverage` falla por debajo de ese umbral.
- Las pruebas del sorteo inyectan un generador falso y comprueban resultados exactos.
- Casos obligatorios: lista vacía, un solo participante, nombre vacío o solo espacios, nombre duplicado sin distinguir mayúsculas, y que cada posición pueda ser elegida.
- La capa `src/ui/` se prueba con `jsdom` cargando el `index.html` real, e inyectando un generador falso.

## Comportamiento que no debe cambiar
- Para sortear N ganadores (1, 2 o 3; por defecto 1) se necesitan al menos N + 1 participantes; si no se cumple, el botón está deshabilitado y se muestra el mensaje de participantes insuficientes.
- No se permiten nombres vacíos ni duplicados (sin distinguir mayúsculas), y se muestra un mensaje de error.
- Con 1 ganador el resultado muestra "¡Tenemos un ganador!" y el nombre; con 2 o 3 muestra "¡Tenemos un podio!" con los ganadores distintos en forma de podio. Cambiar la lista o la cantidad oculta el resultado.
- No se guardan datos entre sesiones.

## Lo que la IA no debe hacer (específico)
- Cambiar el color base ni elegir uno nuevo sin preguntar al desarrollador.
- Agregar backend, almacenamiento (`localStorage`, cookies) ni llamadas de red.
- Agregar TypeScript.
