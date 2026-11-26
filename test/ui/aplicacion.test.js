import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';
import { iniciarAplicacion } from '../../src/ui/aplicacion.js';
import { crearTemporizadorFalso } from '../ayudas.js';

const HTML = readFileSync(new URL('../../src/index.html', import.meta.url), 'utf8');
let documento;
let temporizador;

function agregar(nombre) {
  documento.getElementById('nombre').value = nombre;
  documento.getElementById('form-participante').requestSubmit();
}

const texto = (id) => documento.getElementById(id).textContent;
const sortear = () => {
  documento.getElementById('sortear').click();
  temporizador.avanzar(3000);
};
const nombresEnLista = () => [...documento.querySelectorAll('#lista li span')].map((s) => s.textContent);

beforeEach(() => {
  documento = new JSDOM(HTML).window.document;
  temporizador = crearTemporizadorFalso();
  iniciarAplicacion({ documento, generarEntero: () => 1, programar: temporizador.programar });
});

test('al iniciar no hay participantes y el botón está deshabilitado', () => {
  assert.equal(texto('contador'), '0');
  assert.equal(documento.getElementById('sortear').disabled, true);
  assert.equal(documento.getElementById('vacio').hidden, false);
});

test('agrega participantes y habilita el sorteo con dos', () => {
  agregar('Ana');
  assert.equal(documento.getElementById('sortear').disabled, true);
  agregar('Pedro');
  assert.deepEqual(nombresEnLista(), ['Ana', 'Pedro']);
  assert.equal(texto('contador'), '2');
  assert.equal(documento.getElementById('sortear').disabled, false);
});

test('muestra error con nombre vacío y con duplicado', () => {
  agregar('  ');
  assert.equal(texto('error'), 'Escribe un nombre.');
  agregar('Ana');
  agregar('ana');
  assert.equal(texto('error'), 'Ese participante ya está en la lista.');
  assert.deepEqual(nombresEnLista(), ['Ana']);
});

test('limpia el error y el campo tras agregar bien', () => {
  agregar('');
  agregar('Ana');
  assert.equal(documento.getElementById('error').hidden, true);
  assert.equal(documento.getElementById('nombre').value, '');
});

test('sortear muestra al ganador elegido por el generador inyectado', () => {
  ['Ana', 'Pedro', 'María'].forEach(agregar);
  sortear();
  assert.equal(documento.getElementById('resultado').hidden, false);
  assert.equal(documento.querySelector('#resultado .titulo').textContent, '¡Tenemos un ganador!');
  assert.equal(documento.querySelector('#resultado .ganador').textContent, 'Pedro');
  assert.equal(documento.querySelector('#resultado .podio'), null);
});

test('quitar un participante oculta el resultado y actualiza la lista', () => {
  ['Ana', 'Pedro', 'María'].forEach(agregar);
  sortear();
  documento.querySelector('#lista li button').click();
  assert.equal(documento.getElementById('resultado').hidden, true);
  assert.deepEqual(nombresEnLista(), ['Pedro', 'María']);
});

test('un nombre con HTML se muestra como texto', () => {
  agregar('<b>x</b>');
  assert.equal(documento.querySelector('#lista b'), null);
  assert.deepEqual(nombresEnLista(), ['<b>x</b>']);
});

test('varios participantes aparecen en el orden en que se agregaron', () => {
  ['Luis', 'Ana', 'María'].forEach(agregar);
  assert.deepEqual(nombresEnLista(), ['Luis', 'Ana', 'María']);
  assert.equal(texto('contador'), '3');
});

test('los espacios alrededor del nombre se descartan al agregarlo', () => {
  agregar('   Ana   ');
  assert.deepEqual(nombresEnLista(), ['Ana']);
});
