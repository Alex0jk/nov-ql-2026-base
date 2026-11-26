# Spec Delta

## Purpose

Define cuántos ganadores se pueden elegir en un sorteo, cuándo el sorteo es posible, cómo se eligen los ganadores de forma justa y cómo se presenta el resultado, ya sea un único ganador o un podio.

## ADDED Requirements

### Requirement: Cantidad de ganadores elegible
La interfaz SHALL permitir elegir 1, 2 o 3 ganadores, con 1 seleccionado por defecto.

#### Scenario: Valor por defecto
- **WHEN** el usuario abre la aplicación
- **THEN** las opciones 1, 2 y 3 están disponibles y la opción 1 está seleccionada

#### Scenario: Cambiar la cantidad
- **WHEN** el usuario selecciona la opción 3
- **THEN** la opción 3 queda seleccionada y las opciones 1 y 2 dejan de estarlo

### Requirement: Participantes suficientes para sortear
El sorteo SHALL poder realizarse solo si la cantidad de ganadores es menor que el número de participantes. En caso contrario, la aplicación SHALL impedir sortear y SHALL mostrar el mensaje "Se necesitan al menos {N + 1} participantes para sortear {N} ganador(es).", donde N es la cantidad elegida.

#### Scenario: Participantes justos
- **WHEN** hay 4 participantes y se eligen 3 ganadores
- **THEN** el botón "Sortear ganador" está habilitado y no se muestra el mensaje de insuficientes

#### Scenario: Un participante menos de lo necesario
- **WHEN** hay 3 participantes y se eligen 3 ganadores
- **THEN** el botón "Sortear ganador" está deshabilitado y se muestra "Se necesitan al menos 4 participantes para sortear 3 ganador(es)."

#### Scenario: Un solo ganador con un participante
- **WHEN** hay 1 participante y se elige 1 ganador
- **THEN** el botón está deshabilitado y se muestra "Se necesitan al menos 2 participantes para sortear 1 ganador(es)."

#### Scenario: Lista vacía
- **WHEN** no hay participantes y se elige 1 ganador
- **THEN** el botón está deshabilitado y se muestra "Se necesitan al menos 2 participantes para sortear 1 ganador(es)."

#### Scenario: La cantidad deja de ser válida al quitar participantes
- **WHEN** hay 4 participantes con 3 ganadores elegidos y el usuario quita un participante
- **THEN** la opción 3 sigue seleccionada, el botón se deshabilita y se muestra el mensaje de insuficientes

### Requirement: Cantidad exacta de ganadores distintos
El sorteo SHALL elegir exactamente la cantidad de ganadores indicada, todos pertenecientes a la lista de participantes y todos distintos entre sí.

#### Scenario: Tres ganadores
- **WHEN** hay 5 participantes, se eligen 3 ganadores y se sortea
- **THEN** el resultado contiene 3 participantes de la lista, sin repetirse

#### Scenario: Casi todos ganan
- **WHEN** hay 3 participantes, se eligen 2 ganadores y se sortea
- **THEN** el resultado contiene 2 participantes distintos y el tercero no aparece

### Requirement: Probabilidad igual para cualquier lugar
Todos los participantes SHALL tener la misma probabilidad de obtener cualquier lugar del resultado, incluido el 1.er lugar.

#### Scenario: Cada orden posible es igualmente probable
- **WHEN** se sortean 3 ganadores entre 5 participantes
- **THEN** cada una de las 60 ordenaciones posibles de 3 participantes distintos tiene la misma probabilidad de salir

### Requirement: Resultado con un ganador
Con 1 ganador elegido, el resultado SHALL mostrar el texto "¡Tenemos un ganador!" y el nombre del ganador, sin forma de podio.

#### Scenario: Sorteo de un ganador
- **WHEN** hay 5 participantes, se elige 1 ganador y se sortea
- **THEN** se muestra "¡Tenemos un ganador!" con el nombre del ganador y no se muestra el podio

### Requirement: Resultado en forma de podio
Con 2 o 3 ganadores elegidos, el resultado SHALL mostrar el texto "¡Tenemos un podio!" y los ganadores en forma de podio: el 1.er lugar al centro y más alto, el 2.º lugar a la izquierda y el 3.er lugar a la derecha. El podio SHALL usar el color base de la aplicación y cada lugar SHALL indicar su posición con texto ("1.er lugar", "2.º lugar", "3.er lugar").

#### Scenario: Podio de tres ganadores
- **WHEN** hay 5 participantes, se eligen 3 ganadores y se sortea
- **THEN** se muestra "¡Tenemos un podio!" con el 1.er lugar al centro y más alto que los demás, el 2.º lugar a la izquierda y el 3.er lugar a la derecha

#### Scenario: Podio de dos ganadores
- **WHEN** hay 3 participantes, se eligen 2 ganadores y se sortea
- **THEN** se muestra "¡Tenemos un podio!" con el 1.er lugar al centro y el 2.º lugar a la izquierda, sin 3.er lugar

#### Scenario: Color del podio
- **WHEN** se muestra un podio
- **THEN** sus escalones usan tonos del color base azul de la aplicación

### Requirement: Resultado vigente
El resultado SHALL dejar de mostrarse cuando cambie la lista de participantes o la cantidad de ganadores elegida.

#### Scenario: Agregar un participante
- **WHEN** hay un resultado visible y el usuario agrega un participante
- **THEN** el resultado deja de mostrarse

#### Scenario: Quitar un participante
- **WHEN** hay un resultado visible y el usuario quita un participante
- **THEN** el resultado deja de mostrarse

#### Scenario: Cambiar la cantidad de ganadores
- **WHEN** hay un resultado visible y el usuario cambia la cantidad de ganadores
- **THEN** el resultado deja de mostrarse

#### Scenario: Sortear de nuevo
- **WHEN** hay un resultado visible y el usuario presiona "Sortear ganador" otra vez
- **THEN** se muestra un resultado nuevo, obtenido en un sorteo independiente del anterior

### Requirement: Podio legible en pantallas pequeñas
El podio SHALL mostrarse completo, sin desplazamiento horizontal, en pantallas desde 320px de ancho, y los nombres largos SHALL partirse en varias líneas sin salirse de su lugar.

#### Scenario: Podio de tres con nombres largos en móvil
- **WHEN** el resultado es un podio de tres con nombres de 50 caracteres sin espacios en una pantalla de 320px
- **THEN** los tres nombres se ven completos dentro de la tarjeta y la página no se desplaza horizontalmente
