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
const elegirCantidad = (n) => documento.querySelector(`input[name="cantidad"][value="${n}"]`).click();
const sortear = () => {
  documento.getElementById('sortear').click();
  temporizador.avanzar(3000);
};
const puedeSorteo = () => !documento.getElementById('sortear').disabled;

beforeEach(() => {
  documento = new JSDOM(HTML).window.document;
  temporizador = crearTemporizadorFalso();
  iniciarAplicacion({ documento, generarEntero: () => 1, programar: temporizador.programar });
});

test('al iniciar hay tres opciones de cantidad y la 1 está seleccionada', () => {
  const radios = [...documento.querySelectorAll('input[name="cantidad"]')];
  assert.deepEqual(radios.map((r) => r.value), ['1', '2', '3']);
  assert.deepEqual(radios.map((r) => r.checked), [true, false, false]);
});

test('cambiar la cantidad deja seleccionada solo la opción elegida', () => {
  elegirCantidad(3);
  const marcadas = [...documento.querySelectorAll('input[name="cantidad"]')].filter((r) => r.checked);
  assert.deepEqual(marcadas.map((r) => r.value), ['3']);
});

test('con la lista vacía muestra el aviso de insuficientes para 1 ganador', () => {
  assert.equal(texto('aviso'), 'Se necesitan al menos 2 participantes para sortear 1 ganador(es).');
  assert.equal(documento.getElementById('aviso').hidden, false);
  assert.equal(puedeSorteo(), false);
});

test('con un participante y 1 ganador sigue sin poder sortear', () => {
  agregar('Ana');
  assert.equal(texto('aviso'), 'Se necesitan al menos 2 participantes para sortear 1 ganador(es).');
  assert.equal(puedeSorteo(), false);
});

test('con participantes suficientes oculta el aviso y habilita el sorteo', () => {
  ['Ana', 'Pedro'].forEach(agregar);
  assert.equal(documento.getElementById('aviso').hidden, true);
  assert.equal(puedeSorteo(), true);
});

test('3 ganadores con 3 participantes no se puede; con 4 sí', () => {
  ['Ana', 'Pedro', 'María'].forEach(agregar);
  elegirCantidad(3);
  assert.equal(puedeSorteo(), false);
  assert.equal(texto('aviso'), 'Se necesitan al menos 4 participantes para sortear 3 ganador(es).');
  agregar('Luis');
  assert.equal(puedeSorteo(), true);
  assert.equal(documento.getElementById('aviso').hidden, true);
});

test('al quitar participantes la cantidad no cambia sola y el sorteo se bloquea', () => {
  ['Ana', 'Pedro', 'María', 'Luis'].forEach(agregar);
  elegirCantidad(3);
  documento.querySelector('#lista li button').click();
  assert.equal(documento.querySelector('input[name="cantidad"][value="3"]').checked, true);
  assert.equal(puedeSorteo(), false);
  assert.equal(texto('aviso'), 'Se necesitan al menos 4 participantes para sortear 3 ganador(es).');
});

test('con 3 ganadores muestra un podio con tres lugares distintos', () => {
  ['Ana', 'Pedro', 'María', 'Luis', 'Sofía'].forEach(agregar);
  elegirCantidad(3);
  sortear();
  assert.equal(documento.querySelector('#resultado .titulo').textContent, '¡Tenemos un podio!');
  const nombres = [...documento.querySelectorAll('#resultado .podio .nombre')].map((n) => n.textContent);
  assert.equal(nombres.length, 3);
  assert.equal(new Set(nombres).size, 3);
});

test('con 2 ganadores muestra un podio de dos lugares', () => {
  ['Ana', 'Pedro', 'María'].forEach(agregar);
  elegirCantidad(2);
  sortear();
  assert.equal(documento.querySelector('#resultado .titulo').textContent, '¡Tenemos un podio!');
  assert.equal(documento.querySelectorAll('#resultado .podio .lugar').length, 2);
});

test('cambiar la cantidad oculta el resultado vigente', () => {
  ['Ana', 'Pedro', 'María', 'Luis'].forEach(agregar);
  sortear();
  assert.equal(documento.getElementById('resultado').hidden, false);
  elegirCantidad(2);
  assert.equal(documento.getElementById('resultado').hidden, true);
});

test('agregar un participante oculta el resultado vigente', () => {
  ['Ana', 'Pedro'].forEach(agregar);
  sortear();
  agregar('María');
  assert.equal(documento.getElementById('resultado').hidden, true);
});

test('sortear de nuevo reemplaza el resultado anterior', () => {
  ['Ana', 'Pedro', 'María', 'Luis'].forEach(agregar);
  elegirCantidad(2);
  sortear();
  sortear();
  assert.equal(documento.querySelectorAll('#resultado .podio').length, 1);
  assert.equal(documento.querySelectorAll('#resultado .lugar').length, 2);
});
