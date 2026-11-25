const participantes = [];

const form = document.getElementById('form-participante');
const input = document.getElementById('nombre');
const error = document.getElementById('error');
const lista = document.getElementById('lista');
const vacio = document.getElementById('vacio');
const contador = document.getElementById('contador');
const botonSortear = document.getElementById('sortear');
const resultado = document.getElementById('resultado');
const ganadorEl = document.getElementById('ganador');

function mostrarError(mensaje) {
  error.textContent = mensaje;
  error.hidden = !mensaje;
}

function render() {
  lista.replaceChildren();
  participantes.forEach((nombre, i) => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = nombre;
    const quitar = document.createElement('button');
    quitar.type = 'button';
    quitar.textContent = '×';
    quitar.setAttribute('aria-label', `Quitar a ${nombre}`);
    quitar.addEventListener('click', () => {
      participantes.splice(i, 1);
      resultado.hidden = true;
      render();
    });
    li.append(span, quitar);
    lista.append(li);
  });
  contador.textContent = participantes.length;
  vacio.hidden = participantes.length > 0;
  botonSortear.disabled = participantes.length < 2;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nombre = input.value.trim();
  if (!nombre) return mostrarError('Escribe un nombre.');
  if (participantes.some((p) => p.toLowerCase() === nombre.toLowerCase())) {
    return mostrarError('Ese participante ya está en la lista.');
  }
  mostrarError('');
  participantes.push(nombre);
  input.value = '';
  input.focus();
  resultado.hidden = true;
  render();
});

botonSortear.addEventListener('click', () => {
  // crypto.getRandomValues evita el sesgo de módulo con rejection sampling
  const n = participantes.length;
  const limite = Math.floor(0x100000000 / n) * n;
  const buf = new Uint32Array(1);
  do { crypto.getRandomValues(buf); } while (buf[0] >= limite);
  ganadorEl.textContent = participantes[buf[0] % n];
  resultado.hidden = false;
  // reinicia la animación si se sortea de nuevo
  resultado.style.animation = 'none';
  void resultado.offsetWidth;
  resultado.style.animation = '';
});

render();
