import { iniciarAplicacion } from './ui/aplicacion.js';

const TOPE_UINT32 = 0x100000000;

// Generador real: entero uniforme en [0, maximo), sin sesgo de módulo.
function enteroAleatorioSeguro(maximo) {
  const limite = Math.floor(TOPE_UINT32 / maximo) * maximo;
  const buffer = new Uint32Array(1);
  do {
    crypto.getRandomValues(buffer);
  } while (buffer[0] >= limite);
  return buffer[0] % maximo;
}

// Temporizador real: programa una acción y devuelve la función que la cancela.
function programar(accion, milisegundos) {
  const id = setTimeout(accion, milisegundos);
  return () => clearTimeout(id);
}

iniciarAplicacion({ documento: document, generarEntero: enteroAleatorioSeguro, programar });
