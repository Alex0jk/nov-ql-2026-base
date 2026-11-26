import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';
import { iniciarAplicacion } from '../../src/ui/aplicacion.js';
import { crearTemporizadorFalso } from '../ayudas.js';

const HTML = readFileSync(new URL('../../src/index.html', import.meta.url), 'utf8');
let documento;
let temporizador;

const id = (nombre) => documento.getElementById(nombre);
const agregar = (nombre) => {
  id('nombre').value = nombre;
  id('form-participante').requestSubmit();
};
const elegirCantidad = (n) => documento.querySelector(`input[name="cantidad"][value="${n}"]`).click();
const iniciarSorteo = () => id('sortear').click();
const nombres = () => [...documento.querySelectorAll('#lista li span')].map((s) => s.textContent);

beforeEach(() => {
  documento = new JSDOM(HTML).window.document;
  temporizador = crearTemporizadorFalso();
  iniciarAplicacion({ documento, generarEntero: () => 1, programar: temporizador.programar });
});

test('la cuenta existe, tiene aria-live y está oculta al inicio', () => {
  assert.equal(id('cuenta').hidden, true);
  assert.equal(id('cuenta').getAttribute('aria-live'), 'assertive');
});

test('muestra 3, 2, 1 y luego el ganador a los 3 s', () => {
  ['Ana', 'Pedro', 'María', 'Luis', 'Sofía'].forEach(agregar);
  iniciarSorteo();
  assert.equal(id('cuenta').textContent, '3');
  assert.equal(id('cuenta').hidden, false);
  assert.equal(id('resultado').hidden, true);
  temporizador.avanzar(1000);
  assert.equal(id('cuenta').textContent, '2');
  temporizador.avanzar(1000);
  assert.equal(id('cuenta').textContent, '1');
  assert.equal(id('resultado').hidden, true);
  temporizador.avanzar(1000);
  assert.equal(id('cuenta').hidden, true);
  assert.equal(documento.querySelector('#resultado .titulo').textContent, '¡Tenemos un ganador!');
  assert.equal(documento.querySelector('#resultado .ganador').textContent, 'Pedro');
});

test('con 3 ganadores muestra el podio al terminar la cuenta', () => {
  ['Ana', 'Pedro', 'María', 'Luis', 'Sofía'].forEach(agregar);
  elegirCantidad(3);
  iniciarSorteo();
  temporizador.avanzar(2999);
  assert.equal(id('resultado').hidden, true);
  temporizador.avanzar(1);
  assert.equal(documento.querySelectorAll('#resultado .podio .lugar').length, 3);
});

test('durante la cuenta se bloquean botón, radios, campo, agregar y quitar', () => {
  ['Ana', 'Pedro', 'María'].forEach(agregar);
  iniciarSorteo();
  assert.equal(id('sortear').disabled, true);
  assert.equal(id('cantidad').disabled, true);
  assert.equal(id('nombre').disabled, true);
  assert.equal(id('agregar').disabled, true);
  assert.equal(documento.querySelector('#lista li button').disabled, true);
  temporizador.avanzar(3000);
  assert.equal(id('sortear').disabled, false);
  assert.equal(id('cantidad').disabled, false);
  assert.equal(id('nombre').disabled, false);
  assert.equal(id('agregar').disabled, false);
  assert.equal(documento.querySelector('#lista li button').disabled, false);
});

test('los eventos de datos durante la cuenta se ignoran', () => {
  ['Ana', 'Pedro', 'María'].forEach(agregar);
  iniciarSorteo();
  agregar('Luis');
  documento.querySelector('#lista li button').click();
  elegirCantidad(2);
  iniciarSorteo();
  assert.deepEqual(nombres(), ['Ana', 'Pedro', 'María']);
  assert.equal(id('contador').textContent, '3');
  temporizador.avanzar(3000);
  assert.equal(documento.querySelector('#resultado .ganador').textContent, 'Pedro');
  assert.equal(temporizador.cantidadPendientes(), 0);
});

test('el resultado anterior se oculta al iniciar la cuenta', () => {
  ['Ana', 'Pedro'].forEach(agregar);
  iniciarSorteo();
  temporizador.avanzar(3000);
  assert.equal(id('resultado').hidden, false);
  iniciarSorteo();
  assert.equal(id('resultado').hidden, true);
  temporizador.avanzar(3000);
  assert.equal(id('resultado').hidden, false);
});

test('con participantes insuficientes no hay cuenta y se ve el mensaje', () => {
  agregar('Ana');
  id('sortear').disabled = false; // clic forzado
  iniciarSorteo();
  assert.equal(id('cuenta').hidden, true);
  assert.equal(temporizador.cantidadPendientes(), 0);
  assert.equal(id('aviso').hidden, false);
  assert.match(id('aviso').textContent, /Se necesitan al menos 2 participantes/);
});
