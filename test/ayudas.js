/** Temporizador falso: acumula acciones y las dispara al avanzar el tiempo, sin esperas reales. */
export function crearTemporizadorFalso() {
  let ahora = 0;
  let pendientes = [];
  return {
    programar(accion, milisegundos) {
      const tarea = { accion, momento: ahora + milisegundos };
      pendientes.push(tarea);
      return () => {
        pendientes = pendientes.filter((t) => t !== tarea);
      };
    },
    avanzar(milisegundos) {
      const limite = ahora + milisegundos;
      for (;;) {
        const proxima = pendientes.filter((t) => t.momento <= limite).sort((a, b) => a.momento - b.momento)[0];
        if (!proxima) break;
        pendientes = pendientes.filter((t) => t !== proxima);
        ahora = proxima.momento;
        proxima.accion();
      }
      ahora = limite;
    },
    cantidadPendientes: () => pendientes.length,
  };
}
