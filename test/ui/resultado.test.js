import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { dibujarResultado } from '../../src/ui/resultado.js';

let documento;
let contenedor;

beforeEach(() => {
  documento = new JSDOM('<section id="resultado"></section>').window.document;
  contenedor = documento.getElementById('resultado');
});

const titulo = () => contenedor.querySelector('.titulo').textContent;
const lugares = () => [...contenedor.querySelectorAll('.podio .lugar')];

test('con un ganador muestra el título y el nombre, sin podio', () => {
  dibujarResultado(documento, contenedor, ['María']);
  assert.equal(titulo(), '¡Tenemos un ganador!');
  assert.equal(contenedor.querySelector('.ganador').textContent, 'María');
  assert.equal(contenedor.querySelector('.podio'), null);
  assert.equal(contenedor.classList.contains('es-podio'), false);
});

test('con tres ganadores muestra el podio en orden de lugar', () => {
  dibujarResultado(documento, contenedor, ['María', 'Luis', 'Ana']);
  assert.equal(titulo(), '¡Tenemos un podio!');
  assert.equal(contenedor.classList.contains('es-podio'), true);
  assert.deepEqual(lugares().map((l) => l.querySelector('.nombre').textContent), ['María', 'Luis', 'Ana']);
  assert.deepEqual(lugares().map((l) => l.className), ['lugar lugar-1', 'lugar lugar-2', 'lugar lugar-3']);
});

test('cada lugar indica su posición con texto y medalla', () => {
  dibujarResultado(documento, contenedor, ['María', 'Luis', 'Ana']);
  const etiquetas = lugares().map((l) => l.querySelector('.etiqueta').textContent);
  assert.deepEqual(etiquetas, ['🥇 1.er lugar', '🥈 2.º lugar', '🥉 3.er lugar']);
});

test('con dos ganadores solo hay 1.er y 2.º lugar', () => {
  dibujarResultado(documento, contenedor, ['María', 'Luis']);
  assert.equal(titulo(), '¡Tenemos un podio!');
  assert.equal(lugares().length, 2);
  assert.equal(contenedor.querySelector('.lugar-3'), null);
});

test('volver a dibujar reemplaza el contenido y quita la marca de podio', () => {
  dibujarResultado(documento, contenedor, ['María', 'Luis', 'Ana']);
  dibujarResultado(documento, contenedor, ['Ana']);
  assert.equal(contenedor.querySelector('.podio'), null);
  assert.equal(contenedor.classList.contains('es-podio'), false);
  assert.equal(contenedor.querySelectorAll('.titulo').length, 1);
});

test('un nombre con HTML se muestra como texto', () => {
  dibujarResultado(documento, contenedor, ['<b>x</b>', 'Luis']);
  assert.equal(contenedor.querySelector('b'), null);
  assert.equal(lugares()[0].querySelector('.nombre').textContent, '<b>x</b>');
});
