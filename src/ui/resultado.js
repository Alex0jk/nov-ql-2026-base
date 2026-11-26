const LUGARES = [
  { etiqueta: '1.er lugar', medalla: '🥇' },
  { etiqueta: '2.º lugar', medalla: '🥈' },
  { etiqueta: '3.er lugar', medalla: '🥉' },
];

function crearElemento(documento, etiqueta, clase, texto) {
  const elemento = documento.createElement(etiqueta);
  elemento.className = clase;
  elemento.textContent = texto;
  return elemento;
}

function crearLugar(documento, nombre, indice) {
  const { etiqueta, medalla } = LUGARES[indice];
  const lugar = crearElemento(documento, 'li', `lugar lugar-${indice + 1}`, '');
  const rotulo = crearElemento(documento, 'span', 'etiqueta', `${medalla} ${etiqueta}`);
  const escalon = crearElemento(documento, 'span', 'escalon', String(indice + 1));
  lugar.append(crearElemento(documento, 'span', 'nombre', nombre), rotulo, escalon);
  return lugar;
}

function crearPodio(documento, ganadores) {
  const podio = documento.createElement('ol');
  podio.className = 'podio';
  podio.append(...ganadores.map((nombre, indice) => crearLugar(documento, nombre, indice)));
  return podio;
}

/** Dibuja en `contenedor` el ganador único o el podio, según cuántos ganadores haya. */
export function dibujarResultado(documento, contenedor, ganadores) {
  const esPodio = ganadores.length > 1;
  const titulo = esPodio ? '¡Tenemos un podio!' : '¡Tenemos un ganador!';
  const cuerpo = esPodio
    ? crearPodio(documento, ganadores)
    : crearElemento(documento, 'p', 'ganador', ganadores[0]);
  contenedor.classList.toggle('es-podio', esPodio);
  contenedor.replaceChildren(crearElemento(documento, 'p', 'titulo', titulo), cuerpo);
}
