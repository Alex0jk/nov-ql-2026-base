import {
  agregarParticipante,
  quitarParticipante,
  puedeSortear,
  participantesNecesarios,
  CANTIDAD_POR_DEFECTO,
} from '../sorteo/participantes.js';
import { elegirGanadores } from '../sorteo/sorteo.js';
import { iniciarCuentaRegresiva } from '../sorteo/cuentaRegresiva.js';
import { dibujarResultado } from './resultado.js';
import { mostrarNumeroCuenta, ocultarCuenta, bloquearControles } from './cuenta.js';

const MENSAJES_ERROR = {
  vacio: 'Escribe un nombre.',
  duplicado: 'Ese participante ya está en la lista.',
};

function buscarElementos(documento) {
  const porId = (id) => documento.getElementById(id);
  return {
    formulario: porId('form-participante'),
    entradaNombre: porId('nombre'),
    mensajeError: porId('error'),
    lista: porId('lista'),
    textoVacio: porId('vacio'),
    contador: porId('contador'),
    selectorCantidad: porId('cantidad'),
    aviso: porId('aviso'),
    botonAgregar: porId('agregar'),
    botonSortear: porId('sortear'),
    cuenta: porId('cuenta'),
    resultado: porId('resultado'),
  };
}

function mostrarError(el, clave) {
  el.mensajeError.textContent = clave ? MENSAJES_ERROR[clave] : '';
  el.mensajeError.hidden = !clave;
}

function textoInsuficientes(cantidad) {
  return `Se necesitan al menos ${participantesNecesarios(cantidad)} participantes para sortear ${cantidad} ganador(es).`;
}

function ocultarResultado(el) {
  el.resultado.hidden = true;
  el.resultado.classList.remove('animar');
}

function crearItem(documento, nombre, alQuitar, bloqueado) {
  const item = documento.createElement('li');
  const texto = documento.createElement('span');
  texto.textContent = nombre;
  const quitar = documento.createElement('button');
  quitar.type = 'button';
  quitar.disabled = bloqueado;
  quitar.textContent = '×';
  quitar.setAttribute('aria-label', `Quitar a ${nombre}`);
  quitar.addEventListener('click', alQuitar);
  item.append(texto, quitar);
  return item;
}

function dibujar(ctx) {
  const { documento, el, estado } = ctx;
  const items = estado.participantes.map((nombre, indice) =>
    crearItem(documento, nombre, () => alQuitar(ctx, indice), estado.contando),
  );
  el.lista.replaceChildren(...items);
  el.contador.textContent = estado.participantes.length;
  el.textoVacio.hidden = estado.participantes.length > 0;
  const puede = puedeSortear(estado.participantes, estado.cantidad);
  el.botonSortear.disabled = !puede || estado.contando;
  el.aviso.hidden = puede;
  el.aviso.textContent = puede ? '' : textoInsuficientes(estado.cantidad);
}

function alCambiarCantidad(ctx, evento) {
  if (ctx.estado.contando) return;
  ctx.estado.cantidad = Number(evento.target.value);
  ocultarResultado(ctx.el);
  dibujar(ctx);
}

function alQuitar(ctx, indice) {
  if (ctx.estado.contando) return;
  ctx.estado.participantes = quitarParticipante(ctx.estado.participantes, indice);
  ocultarResultado(ctx.el);
  dibujar(ctx);
}

function alAgregar(ctx, evento) {
  const { el, estado } = ctx;
  evento.preventDefault();
  if (estado.contando) return;
  const resultado = agregarParticipante(estado.participantes, el.entradaNombre.value);
  if (!resultado.exito) return mostrarError(el, resultado.error);
  mostrarError(el, null);
  estado.participantes = resultado.participantes;
  el.entradaNombre.value = '';
  el.entradaNombre.focus();
  ocultarResultado(el);
  dibujar(ctx);
}

function mostrarResultado(ctx) {
  const { documento, el, estado, generarEntero } = ctx;
  const ganadores = elegirGanadores(estado.participantes, estado.cantidad, generarEntero);
  dibujarResultado(documento, el.resultado, ganadores);
  el.resultado.hidden = false;
  el.resultado.classList.remove('animar');
  void el.resultado.offsetWidth; // fuerza reflow para reiniciar la animación
  el.resultado.classList.add('animar');
}

function alTerminarCuenta(ctx) {
  ocultarCuenta(ctx.el);
  ctx.estado.contando = false;
  bloquearControles(ctx.el, false);
  mostrarResultado(ctx);
  dibujar(ctx);
}

function alSortear(ctx) {
  const { el, estado } = ctx;
  if (estado.contando || !puedeSortear(estado.participantes, estado.cantidad)) return;
  ocultarResultado(el);
  estado.contando = true;
  bloquearControles(el, true);
  dibujar(ctx);
  iniciarCuentaRegresiva({
    programar: ctx.programar,
    alCambiar: (numero) => mostrarNumeroCuenta(el, numero),
    alTerminar: () => alTerminarCuenta(ctx),
  });
}

export function iniciarAplicacion({ documento, generarEntero, programar }) {
  const estado = { participantes: [], cantidad: CANTIDAD_POR_DEFECTO, contando: false };
  const ctx = { documento, generarEntero, programar, el: buscarElementos(documento), estado };
  ctx.el.selectorCantidad.addEventListener('change', (evento) => alCambiarCantidad(ctx, evento));
  ctx.el.formulario.addEventListener('submit', (evento) => alAgregar(ctx, evento));
  ctx.el.botonSortear.addEventListener('click', () => alSortear(ctx));
  dibujar(ctx);
}
