import { CANTIDADES_GANADORES, puedeSortear } from './participantes.js';

/**
 * Elige ganadores distintos con un Fisher-Yates parcial sobre una copia.
 * @param {string[]} participantes
 * @param {number} cantidad cuántos ganadores (uno de CANTIDADES_GANADORES)
 * @param {(maximo: number) => number} generarEntero devuelve un entero en [0, maximo)
 * @returns {string[]} ganadores en orden de lugar (el primero es el 1.er lugar)
 */
export function elegirGanadores(participantes, cantidad, generarEntero) {
  if (!CANTIDADES_GANADORES.includes(cantidad)) {
    throw new Error('La cantidad de ganadores debe ser 1, 2 o 3.');
  }
  if (!puedeSortear(participantes, cantidad)) {
    throw new Error('No hay suficientes participantes para sortear.');
  }
  const copia = [...participantes];
  for (let i = 0; i < cantidad; i++) {
    const j = i + generarEntero(copia.length - i);
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia.slice(0, cantidad);
}
