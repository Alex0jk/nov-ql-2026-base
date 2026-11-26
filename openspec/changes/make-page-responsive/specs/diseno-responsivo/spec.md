# Spec Delta

## Purpose

Define cómo se presenta y se usa la interfaz del selector de ganadores en pantallas de distinto tamaño, desde móviles de 320px hasta escritorio, sin perder legibilidad ni funcionalidad.

## ADDED Requirements

### Requirement: Sin desplazamiento horizontal
La interfaz SHALL mostrarse completa, sin barra de desplazamiento horizontal, en cualquier ancho de pantalla desde 320px.

#### Scenario: Pantalla mínima soportada
- **WHEN** el usuario abre la aplicación en una pantalla de 320px de ancho
- **THEN** todo el contenido es visible sin desplazarse horizontalmente

#### Scenario: Lista con varios participantes
- **WHEN** el usuario agrega participantes hasta que la lista ocupa varias filas en una pantalla de 320px
- **THEN** los participantes se acomodan en varias líneas y la página sigue sin desplazamiento horizontal

### Requirement: Nombres largos sin desbordar
Los nombres de participantes y el nombre del ganador SHALL ajustarse en varias líneas cuando no caben en una, sin salirse de la tarjeta.

#### Scenario: Nombre largo en la lista
- **WHEN** el usuario agrega un participante con un nombre de 50 caracteres sin espacios en una pantalla de 320px
- **THEN** el nombre se muestra dentro de la tarjeta y el botón de quitar sigue visible

#### Scenario: Nombre largo como ganador
- **WHEN** el sorteo elige a un participante con un nombre de 50 caracteres sin espacios en una pantalla de 320px
- **THEN** el nombre del ganador se muestra completo dentro del bloque de resultado

### Requirement: Entrada apilada en pantallas estrechas
En pantallas de menos de 480px de ancho, el campo de nombre y el botón "Agregar" SHALL mostrarse uno debajo del otro, cada uno a todo el ancho de la tarjeta.

#### Scenario: Pantalla estrecha
- **WHEN** el usuario abre la aplicación en una pantalla de 375px de ancho
- **THEN** el campo de nombre aparece encima del botón "Agregar" y ambos ocupan el ancho completo de la tarjeta

#### Scenario: Pantalla ancha
- **WHEN** el usuario abre la aplicación en una pantalla de 480px de ancho o más
- **THEN** el campo de nombre y el botón "Agregar" aparecen en la misma fila

### Requirement: Área táctil mínima
En dispositivos con puntero táctil, todos los controles interactivos (campo de nombre, "Agregar", "Sortear ganador" y el botón de quitar de cada participante) SHALL tener un área de al menos 44px por 44px.

#### Scenario: Quitar participante con el dedo
- **WHEN** el usuario usa un dispositivo táctil y la lista tiene participantes
- **THEN** el botón de quitar de cada participante mide al menos 44px de alto y 44px de ancho

#### Scenario: Controles principales en dispositivo táctil
- **WHEN** el usuario usa un dispositivo táctil
- **THEN** el campo de nombre, "Agregar" y "Sortear ganador" miden al menos 44px de alto

### Requirement: Texto legible en cualquier tamaño
El título de la página y el nombre del ganador SHALL reducirse en pantallas pequeñas y conservar su tamaño completo en pantallas grandes, de modo que el texto se lea sin acercar la pantalla.

#### Scenario: Pantalla pequeña
- **WHEN** el usuario abre la aplicación en una pantalla de 320px de ancho
- **THEN** el título y el nombre del ganador se muestran más pequeños que en escritorio y el texto del cuerpo mide al menos 16px

#### Scenario: Escritorio
- **WHEN** el usuario abre la aplicación en una pantalla de 1280px de ancho
- **THEN** el título y el nombre del ganador se muestran en su tamaño completo

### Requirement: Tarjeta adaptada al tamaño de la pantalla
La tarjeta SHALL ocupar todo el ancho disponible menos el margen en pantallas pequeñas, y SHALL crecer hasta un ancho máximo de 640px en pantallas grandes, siempre centrada.

#### Scenario: Pantalla grande
- **WHEN** el usuario abre la aplicación en una pantalla de 1280px de ancho
- **THEN** la tarjeta está centrada y mide más que en un móvil, sin superar 640px

#### Scenario: Pantalla pequeña
- **WHEN** el usuario abre la aplicación en una pantalla de 320px de ancho
- **THEN** la tarjeta ocupa todo el ancho disponible menos un margen y su relleno interno es menor que en escritorio

### Requirement: Contenido visible en navegadores móviles
La página SHALL usar la altura realmente visible de la pantalla, de modo que ningún contenido quede oculto detrás de la barra de direcciones del navegador móvil.

#### Scenario: Barra de direcciones visible
- **WHEN** el usuario abre la aplicación en un navegador móvil con la barra de direcciones visible
- **THEN** la tarjeta se ve completa o se puede alcanzar desplazando la página verticalmente

### Requirement: Mismo comportamiento en todos los tamaños
Agregar, quitar y sortear participantes SHALL funcionar y mostrar los mismos textos y el mismo color base en todos los tamaños de pantalla.

#### Scenario: Flujo completo en móvil
- **WHEN** el usuario agrega 3 participantes y presiona "Sortear ganador" en una pantalla de 375px
- **THEN** la aplicación muestra "¡Tenemos un ganador!" con el nombre del ganador, igual que en escritorio
