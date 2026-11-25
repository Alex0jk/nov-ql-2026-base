# Ticket #2 — Pruebas automáticas y verificaciones en CI

## Descripción

El selector de ganadores funciona, pero hoy nada nos avisa si un cambio lo rompe. Antes de agregar nuevas funcionalidades necesitamos **guard rails**: pruebas automáticas y verificaciones que se ejecuten solas en cada cambio.

Este ticket se construye sobre el **Ticket #1**. Crea un cambio con OpenSpec (`/openspec-propose`) que describa las pruebas y el CI. Las pruebas deben verificar lo que dicen las especificaciones de `openspec/specs/`, no lo que hace el código.

## Criterios de aceptación

- El cambio se propuso, implementó y archivó con OpenSpec.
- El proyecto tiene pruebas automáticas que cubren, como mínimo:
  - agregar participantes;
  - que el sorteo elige a **un único** ganador;
  - que el ganador **siempre** es uno de los participantes de la lista;
  - que no se puede sortear sin participantes;
  - que el color base elegido se aplica a la interfaz.
- Las pruebas se ejecutan localmente con un solo comando (por ejemplo, `npm test`).
- El proyecto tiene un linter y/o formatter configurado y se ejecuta con un solo comando.
- Existe un workflow de **GitHub Actions** que ejecuta el linter y las pruebas:
  - en cada `push`;
  - en cada **pull request** hacia `main`.
- Si una prueba o el linter fallan, el workflow falla (✗ en rojo).
- El `README.md` explica cómo ejecutar las pruebas y el linter localmente.

## Ejemplo

1. Abres un pull request que cambia el botón **"Sortear ganador"**.
2. GitHub Actions ejecuta automáticamente el linter y las pruebas.
3. Si todo pasa, el pull request muestra ✓ en verde.
4. Si algo falla, muestra ✗ en rojo y puedes ver qué prueba falló.

## Consideraciones

- Puedes usar cualquier framework de pruebas (Vitest, Jest, Playwright, etc.).
- Las pruebas deben ser **deterministas**: no pueden fallar "a veces" por culpa del azar del sorteo.
- Comprueba que las pruebas detectan errores: rompe algo a propósito y verifica que fallen.

¡El objetivo es que cada cambio futuro esté protegido por las pruebas!
