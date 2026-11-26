export const CANTIDADES_GANADORES = [1, 2, 3];
export const CANTIDAD_POR_DEFECTO = 1;

function normalizar(nombre) {
  return nombre.trim().toLowerCase();
}

export function agregarParticipante(participantes, nombre) {
  const limpio = nombre.trim();
  if (!limpio) return { exito: false, error: 'vacio' };
  const repetido = participantes.some((p) => normalizar(p) === normalizar(limpio));
  if (repetido) return { exito: false, error: 'duplicado' };
  return { exito: true, participantes: [...participantes, limpio] };
}

export function quitarParticipante(participantes, indice) {
  return participantes.filter((_, i) => i !== indice);
}

export function participantesNecesarios(cantidad) {
  return cantidad + 1;
}

export function puedeSortear(participantes, cantidad) {
  return participantes.length >= participantesNecesarios(cantidad);
}
