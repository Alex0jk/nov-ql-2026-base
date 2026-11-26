# Selector de ganadores — Coding Dojo

Proyecto base para el Coding Dojo de desarrollo asistido por IA.

Viene casi vacío a propósito: la aplicación la generas tú, con ayuda de la IA.

## Requisitos

- Node.js **22.20.0** o superior
- Un asistente de código: OpenCode, Claude Code, Codex o GitHub Copilot
- GitHub CLI (`gh`) y una cuenta de GitHub

## Instrucciones

Los tickets de cada reto están en [`instrucciones/`](instrucciones/):

| Reto | Carpeta | Tema |
| --- | --- | --- |
| #1 | [`tarea-1/`](instrucciones/tarea-1/) | Vibe coding: generar el selector de ganadores |
| #2 | [`tarea-2/`](instrucciones/tarea-2/) | Guard rails y Spec Driven Development |
| #3 | [`tarea-3-optional/`](instrucciones/tarea-3-optional/) | Backend e historial _(opcional)_ |

## Primeros pasos

```sh
npm install
npx openspec --version
```

## Ejecutar la aplicación

```sh
npm install
npm run dev        # abre http://localhost:8001
```

Si el puerto 8001 está ocupado: `PORT=8002 npm run dev`.
La app debe abrirse por HTTP; abrir `src/index.html` con doble clic no funciona porque usa ES modules.

## Pruebas, lint y CI

| Comando | Qué hace |
| --- | --- |
| `npm test` | Ejecuta todas las pruebas (`node:test`, con `jsdom` para la interfaz). |
| `npm run coverage` | Ejecuta las pruebas y falla si `src/sorteo/` baja de 90% de líneas o 80% de ramas. |
| `npm run lint` | Revisa el código con ESLint (incluye los límites de 150 líneas por archivo y 25 por función). |

El CI (`.github/workflows/ci.yml`) ejecuta `npm ci`, `npm run lint`, `npm test` y `npm run coverage`, cada uno en su propio paso, en cada pull request hacia `main` y en cada push a ramas distintas de `main`. Si falla el lint o una prueba, el resultado queda en rojo y el registro indica cuál falló.

## Despliegue

La aplicación se publica en GitHub Pages: <https://alex0jk.github.io/nov-ql-2026-base/>

> Supuesto: la URL se deriva del remote `origin` (`Alex0jk/nov-ql-2026-base`); si el repositorio cambia de dueño o nombre, hay que actualizarla.

Cada push a `main` (por ejemplo, al fusionar un pull request) ejecuta `.github/workflows/despliegue.yml`: primero reutiliza el CI y, solo si pasa, sube la carpeta `src/` a Pages sin paso de build. Los pull requests y las demás ramas nunca despliegan. Si la verificación o el despliegue fallan, sigue publicada la versión anterior.

Requisito único: en Settings → Pages, elegir como origen "GitHub Actions".

Para revisar las ejecuciones: `gh run list` y `gh run watch`.

## ¿Qué incluye?

| Archivo / carpeta | Para qué sirve |
| --- | --- |
| `AGENTS.md` | Las reglas del proyecto para la IA. **Está vacío: lo llenas tú.** |
| `CLAUDE.md` | Hace que Claude Code lea `AGENTS.md`. |
| `openspec/` | Especificaciones del proyecto con [OpenSpec](https://github.com/Fission-AI/OpenSpec). |
| `.agents/skills/`, `.claude/skills/` | Comandos de OpenSpec para OpenCode, Claude Code, Codex y GitHub Copilot. |
| `instrucciones/` | Los tickets de cada reto. |

## Flujo con OpenSpec

Desde tu agente de IA:

1. `/openspec-propose <cambio>` — crea la propuesta, las specs y las tareas
   (en Codex: `$openspec-propose`)
2. Revisa la propuesta
3. `/openspec-apply-change` — implementa el cambio
4. `/openspec-archive-change` — actualiza `openspec/specs/`

Las especificaciones se escriben en español (ver `openspec/config.yaml`).
