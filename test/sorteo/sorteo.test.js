import { test } from 'node:test';
import assert from 'node:assert/strict';
import { elegirGanadores } from '../../src/sorteo/sorteo.js';

const PARTICIPANTES = ['Ana', 'Pedro', 'María', 'Luis', 'Sofía'];

// Generador falso: devuelve los valores de la secuencia, uno por llamada.
function generadorDeSecuencia(secuencia, registro = []) {
  let posicion = 0;
  return (maximo) => {
    registro.push(maximo);
    return secuencia[posicion++];
  };
}

test('con 1 ganador elige al participante que indica el generador', () => {
  assert.deepEqual(elegirGanadores(PARTICIPANTES, 1, () => 2), ['María']);
});

test('cada posición puede ser la ganadora', () => {
  const ganadores = PARTICIPANTES.map((_, i) => elegirGanadores(PARTICIPANTES, 1, () => i)[0]);
  assert.deepEqual(ganadores, PARTICIPANTES);
});

test('devuelve exactamente la cantidad pedida, en orden de lugar', () => {
  const resultado = elegirGanadores(PARTICIPANTES, 3, generadorDeSecuencia([2, 0, 1]));
  assert.equal(resultado.length, 3);
  assert.deepEqual(resultado, ['María', 'Pedro', 'Luis']);
});

test('los ganadores son distintos y están en la lista, aunque el generador repita', () => {
  for (const cantidad of [1, 2, 3]) {
    const resultado = elegirGanadores(PARTICIPANTES, cantidad, () => 0);
    assert.equal(new Set(resultado).size, cantidad);
    resultado.forEach((g) => assert.ok(PARTICIPANTES.includes(g)));
  }
});

test('pide al generador un máximo que disminuye en cada lugar', () => {
  const registro = [];
  elegirGanadores(PARTICIPANTES, 3, generadorDeSecuencia([0, 0, 0], registro));
  assert.deepEqual(registro, [5, 4, 3]);
});

test('no modifica la lista original', () => {
  const original = [...PARTICIPANTES];
  elegirGanadores(PARTICIPANTES, 3, generadorDeSecuencia([4, 3, 2]));
  assert.deepEqual(PARTICIPANTES, original);
});

test('casi todos ganan: 2 ganadores entre 3 participantes', () => {
  const resultado = elegirGanadores(['Ana', 'Pedro', 'María'], 2, generadorDeSecuencia([2, 1]));
  assert.deepEqual(resultado, ['María', 'Ana']);
});

test('cada ordenación posible de 3 entre 5 sale exactamente una vez (equiprobable)', () => {
  const conteo = new Map();
  for (let a = 0; a < 5; a++) {
    for (let b = 0; b < 4; b++) {
      for (let c = 0; c < 3; c++) {
        const clave = elegirGanadores(PARTICIPANTES, 3, generadorDeSecuencia([a, b, c])).join('|');
        conteo.set(clave, (conteo.get(clave) ?? 0) + 1);
      }
    }
  }
  assert.equal(conteo.size, 60);
  assert.ok([...conteo.values()].every((veces) => veces === 1));
});

test('para cualquier salida del generador el ganador único pertenece a la lista', () => {
  for (let total = 2; total <= 5; total++) {
    const lista = PARTICIPANTES.slice(0, total);
    for (let salida = 0; salida < total; salida++) {
      const resultado = elegirGanadores(lista, 1, () => salida);
      assert.equal(resultado.length, 1);
      assert.ok(lista.includes(resultado[0]));
    }
  }
});

test('falla con la lista vacía y con un solo participante', () => {
  assert.throws(() => elegirGanadores([], 1, () => 0), /suficientes participantes/);
  assert.throws(() => elegirGanadores(['Ana'], 1, () => 0), /suficientes participantes/);
});

test('falla si no hay más participantes que ganadores', () => {
  assert.throws(() => elegirGanadores(['Ana', 'Pedro', 'María'], 3, () => 0), /suficientes participantes/);
});

test('falla con una cantidad que no es 1, 2 o 3', () => {
  for (const cantidad of [0, 4, -1, 1.5, '2', undefined]) {
    assert.throws(() => elegirGanadores(PARTICIPANTES, cantidad, () => 0), /1, 2 o 3/);
  }
});
