export const NUMEROS_CUENTA = 3;
export const PASO_MS = 1000;

/**
 * Cuenta regresiva con tiempo inyectado: avisa `desde`, ..., 1 y luego termina.
 * El primer número se avisa de inmediato; cada siguiente paso tarda PASO_MS.
 * @param {object} opciones
 * @param {number} [opciones.desde] primer número de la cuenta
 * @param {(accion: () => void, milisegundos: number) => () => void} opciones.programar
 *   programa una acción y devuelve una función que la cancela
 * @param {(numero: number) => void} opciones.alCambiar
 * @param {() => void} opciones.alTerminar
 * @returns {() => void} cancela el paso pendiente
 */
export function iniciarCuentaRegresiva({ desde = NUMEROS_CUENTA, programar, alCambiar, alTerminar }) {
  let cancelarPendiente = () => {};

  function programarPaso(numero) {
    cancelarPendiente = programar(() => {
      if (numero === 1) return alTerminar();
      alCambiar(numero - 1);
      programarPaso(numero - 1);
    }, PASO_MS);
  }

  alCambiar(desde);
  programarPaso(desde);
  return () => cancelarPendiente();
}
