import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  agregarParticipante,
  quitarParticipante,
  puedeSortear,
  participantesNecesarios,
  CANTIDADES_GANADORES,
  CANTIDAD_POR_DEFECTO,
} from '../../src/sorteo/participantes.js';

test('agrega un participante a una lista vacía', () => {
  const resultado = agregarParticipante([], 'Ana');
  assert.deepEqual(resultado, { exito: true, participantes: ['Ana'] });
});

test('recorta los espacios del nombre', () => {
  assert.deepEqual(agregarParticipante(['Ana'], '  Pedro  ').participantes, ['Ana', 'Pedro']);
});

test('rechaza nombres vacíos o solo espacios', () => {
  assert.deepEqual(agregarParticipante([], ''), { exito: false, error: 'vacio' });
  assert.deepEqual(agregarParticipante([], '   '), { exito: false, error: 'vacio' });
});

test('rechaza duplicados sin distinguir mayúsculas ni espacios', () => {
  assert.deepEqual(agregarParticipante(['Ana'], 'ANA'), { exito: false, error: 'duplicado' });
  assert.deepEqual(agregarParticipante(['Ana'], ' ana '), { exito: false, error: 'duplicado' });
});

test('no modifica la lista original', () => {
  const original = ['Ana'];
  agregarParticipante(original, 'Pedro');
  quitarParticipante(original, 0);
  assert.deepEqual(original, ['Ana']);
});

test('quita el participante de la posición indicada', () => {
  assert.deepEqual(quitarParticipante(['Ana', 'Pedro', 'María'], 1), ['Ana', 'María']);
});

test('quitar un índice inexistente deja la lista igual', () => {
  assert.deepEqual(quitarParticipante(['Ana'], 5), ['Ana']);
});

test('las cantidades de ganadores son 1, 2 y 3 y la de por defecto es 1', () => {
  assert.deepEqual(CANTIDADES_GANADORES, [1, 2, 3]);
  assert.equal(CANTIDAD_POR_DEFECTO, 1);
});

test('se necesita un participante más que ganadores', () => {
  assert.equal(participantesNecesarios(1), 2);
  assert.equal(participantesNecesarios(2), 3);
  assert.equal(participantesNecesarios(3), 4);
});

const lista = (n) => Array.from({ length: n }, (_, i) => `P${i}`);

test('con 1 ganador se puede sortear desde 2 participantes', () => {
  assert.equal(puedeSortear(lista(0), 1), false);
  assert.equal(puedeSortear(lista(1), 1), false);
  assert.equal(puedeSortear(lista(2), 1), true);
});

test('con 2 ganadores se puede sortear desde 3 participantes', () => {
  assert.equal(puedeSortear(lista(2), 2), false);
  assert.equal(puedeSortear(lista(3), 2), true);
});

test('con 3 ganadores se puede sortear desde 4 participantes', () => {
  assert.equal(puedeSortear(lista(3), 3), false);
  assert.equal(puedeSortear(lista(4), 3), true);
  assert.equal(puedeSortear(lista(5), 3), true);
});
