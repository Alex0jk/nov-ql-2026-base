# Selector de ganadores — Coding Dojo

Proyecto base para el Coding Dojo de desarrollo asistido por IA.

Viene casi vacío a propósito: la aplicación la generas tú, con ayuda de la IA.

## Requisitos

- Node.js **22.20.0** o superior
- Un agente de IA: OpenCode, Codex o Claude Code
- GitHub CLI (`gh`) y una cuenta de GitHub

## Primeros pasos

```sh
npm install
npx openspec --version
```

## ¿Qué incluye?

| Archivo / carpeta | Para qué sirve |
| --- | --- |
| `AGENTS.md` | Las reglas del proyecto para la IA. **Está vacío: lo llenas tú.** |
| `CLAUDE.md` | Hace que Claude Code lea `AGENTS.md`. |
| `openspec/` | Especificaciones del proyecto con [OpenSpec](https://github.com/Fission-AI/OpenSpec). |
| `.agents/skills/`, `.claude/skills/` | Comandos de OpenSpec para OpenCode, Codex y Claude Code. |

## Flujo con OpenSpec

Desde tu agente de IA:

1. `/openspec-propose <cambio>` — crea la propuesta, las specs y las tareas
   (en Codex: `$openspec-propose`)
2. Revisa la propuesta
3. `/openspec-apply-change` — implementa el cambio
4. `/openspec-archive-change` — actualiza `openspec/specs/`

Las especificaciones se escriben en español (ver `openspec/config.yaml`).
