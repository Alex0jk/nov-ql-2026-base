/** Escribe el número de la cuenta regresiva y lo muestra. */
export function mostrarNumeroCuenta(el, numero) {
  el.cuenta.textContent = String(numero);
  el.cuenta.hidden = false;
}

export function ocultarCuenta(el) {
  el.cuenta.textContent = '';
  el.cuenta.hidden = true;
}

/** Deshabilita o habilita los controles de datos mientras dura la cuenta. */
export function bloquearControles(el, bloqueado) {
  el.selectorCantidad.disabled = bloqueado;
  el.entradaNombre.disabled = bloqueado;
  el.botonAgregar.disabled = bloqueado;
}
