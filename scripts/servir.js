import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const PUERTO = Number(process.env.PORT) || 8001;
const RAIZ = resolve(fileURLToPath(new URL('../src', import.meta.url)));
const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
};

async function responder(peticion, respuesta) {
  const { pathname } = new URL(peticion.url, 'http://localhost');
  const solicitada = pathname === '/' ? '/index.html' : decodeURIComponent(pathname);
  const archivo = join(RAIZ, normalize(solicitada));
  if (!archivo.startsWith(RAIZ)) {
    respuesta.writeHead(403).end('Prohibido');
    return;
  }
  try {
    const contenido = await readFile(archivo);
    respuesta.writeHead(200, { 'Content-Type': TIPOS[extname(archivo)] ?? 'application/octet-stream' });
    respuesta.end(contenido);
  } catch {
    respuesta.writeHead(404).end('No encontrado');
  }
}

const servidor = createServer(responder);

servidor.on('error', (error) => {
  const causa = error.code === 'EADDRINUSE'
    ? `El puerto ${PUERTO} ya está en uso. Usa otro: PORT=8002 npm run dev`
    : error.message;
  console.error(causa);
  process.exit(1);
});

servidor.listen(PUERTO, () => {
  console.log(`Aplicación en http://localhost:${PUERTO}`);
});
