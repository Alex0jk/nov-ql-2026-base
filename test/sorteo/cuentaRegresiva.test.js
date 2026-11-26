import { test } from 'node:test';
import assert from 'node:assert/strict';
import { iniciarCuentaRegresiva, PASO_MS } from '../../src/sorteo/cuentaRegresiva.js';
import { crearTemporizadorFalso } from '../ayudas.js';

function iniciar(desde) {
  const temporizador = crearTemporizadorFalso();
  const eventos = [];
  const cancelar = iniciarCuentaRegresiva({
    desde,
    programar: temporizador.programar,
    alCambiar: (n) => eventos.push(n),
    alTerminar: () => eventos.push('fin'),
  });
  return { temporizador, eventos, cancelar };
}

test('el paso es de 1000 ms', () => {
  assert.equal(PASO_MS, 1000);
});

test('muestra 3 de inmediato, 2 a 1 s, 1 a 2 s y termina a 3 s', () => {
  const { temporizador, eventos } = iniciar();
  assert.deepEqual(eventos, [3]);
  temporizador.avanzar(999);
  assert.deepEqual(eventos, [3]);
  temporizador.avanzar(1);
  assert.deepEqual(eventos, [3, 2]);
  temporizador.avanzar(1000);
  assert.deepEqual(eventos, [3, 2, 1]);
  temporizador.avanzar(999);
  assert.deepEqual(eventos, [3, 2, 1]);
  temporizador.avanzar(1);
  assert.deepEqual(eventos, [3, 2, 1, 'fin']);
});

test('termina una sola vez y no deja pendientes', () => {
  const { temporizador, eventos } = iniciar();
  temporizador.avanzar(10000);
  assert.deepEqual(eventos, [3, 2, 1, 'fin']);
  assert.equal(temporizador.cantidadPendientes(), 0);
});

test('cancelar detiene la cuenta y limpia el pendiente', () => {
  const { temporizador, eventos, cancelar } = iniciar();
  temporizador.avanzar(1000);
  cancelar();
  temporizador.avanzar(5000);
  assert.deepEqual(eventos, [3, 2]);
  assert.equal(temporizador.cantidadPendientes(), 0);
});

test('con desde igual a 1 muestra 1 y termina a 1 s', () => {
  const { temporizador, eventos } = iniciar(1);
  assert.deepEqual(eventos, [1]);
  temporizador.avanzar(1000);
  assert.deepEqual(eventos, [1, 'fin']);
});
