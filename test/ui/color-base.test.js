import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('../../src/styles.css', import.meta.url), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
const html = readFileSync(new URL('../../src/index.html', import.meta.url), 'utf8');

const bloqueRaiz = css.match(/:root\s*\{[^}]*\}/)[0];
const fueraDeRaiz = css.replace(bloqueRaiz, '');
const COLOR_LITERAL = /#[0-9a-f]{3,8}\b|\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch)\(|\b(?:white|black|red|green|blue|gray|grey|navy|orange|yellow|purple|pink)\b/i;

function declaraciones(selector) {
  const escapado = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const bloques = [...css.matchAll(new RegExp(`(?:^|\\})\\s*${escapado}\\s*\\{([^}]*)\\}`, 'g'))];
  return bloques.map((b) => b[1]).join(';');
}

test(':root define variables de color azul', () => {
  const azules = [...bloqueRaiz.matchAll(/--azul-[\w-]+\s*:\s*([^;]+);/g)];
  assert.ok(azules.length > 0);
  azules.forEach((v) => assert.match(v[1], COLOR_LITERAL));
});

test('el título, el botón principal y el fondo usan variables azules', () => {
  assert.match(declaraciones('h1'), /color:\s*var\(--azul-[\w-]+\)/);
  assert.match(declaraciones('.primario'), /background:\s*var\(--azul-[\w-]+\)/);
  assert.match(declaraciones('body'), /background:[^;]*var\(--azul-[\w-]+\)/);
});

test('fuera de :root no hay colores literales', () => {
  assert.doesNotMatch(fueraDeRaiz, COLOR_LITERAL);
});

test('index.html no tiene estilos ni manejadores de eventos en línea', () => {
  assert.doesNotMatch(html, /\sstyle\s*=/i);
  assert.doesNotMatch(html, /\son[a-z]+\s*=/i);
});
