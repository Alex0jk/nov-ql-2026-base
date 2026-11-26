# Spec Delta

## Purpose

Define la cuenta regresiva que precede al resultado del sorteo: cuándo se muestra, cuánto dura, qué se bloquea mientras tanto y qué ocurre cuando el sorteo no es válido. El resultado en sí (un ganador o un podio) lo define `sorteo-de-ganadores`.

## ADDED Requirements

### Requirement: Cuenta regresiva antes del resultado
Al presionar "Sortear ganador" con un sorteo válido, la aplicación SHALL mostrar una cuenta regresiva con los números 3, 2 y 1, con un segundo entre cada número. Después del 1, la aplicación SHALL mostrar el resultado definido en `sorteo-de-ganadores` (un ganador o un podio). La cuenta SHALL mostrarse de forma grande y visible, usando el color base de la aplicación.

#### Scenario: Secuencia 3, 2, 1
- **WHEN** hay 5 participantes, se elige 1 ganador y se presiona "Sortear ganador"
- **THEN** se muestra 3, un segundo después 2 y otro segundo después 1

#### Scenario: El resultado aparece al terminar
- **WHEN** se muestra el 1 y pasa un segundo más
- **THEN** la cuenta deja de mostrarse y aparece el resultado ("¡Tenemos un ganador!" con el nombre)

#### Scenario: Los ganadores no aparecen antes
- **WHEN** la cuenta está en 3, 2 o 1
- **THEN** no se muestra ningún ganador ni podio

#### Scenario: Cuenta antes de un podio
- **WHEN** hay 5 participantes, se eligen 3 ganadores y termina la cuenta
- **THEN** se muestra el podio definido en `sorteo-de-ganadores`

#### Scenario: Color de la cuenta
- **WHEN** se muestra un número de la cuenta
- **THEN** su color es el color base azul de la aplicación, definido mediante variables CSS

### Requirement: Estado durante la cuenta regresiva
Mientras dure la cuenta regresiva, el botón "Sortear ganador" SHALL estar deshabilitado, la lista de participantes y la cantidad de ganadores SHALL NOT poder modificarse, y el resultado anterior (si existía) SHALL dejar de mostrarse. Al terminar la cuenta, los controles SHALL volver a su estado normal según las reglas de `sorteo-de-ganadores`.

#### Scenario: Botón deshabilitado
- **WHEN** la cuenta regresiva está en curso
- **THEN** el botón "Sortear ganador" está deshabilitado y no se puede iniciar otro sorteo

#### Scenario: No se modifican los participantes
- **WHEN** la cuenta regresiva está en curso
- **THEN** no se puede agregar ni quitar participantes

#### Scenario: No se cambia la cantidad de ganadores
- **WHEN** la cuenta regresiva está en curso
- **THEN** las opciones de cantidad de ganadores están deshabilitadas

#### Scenario: Se oculta el resultado anterior
- **WHEN** hay un resultado visible y se presiona "Sortear ganador"
- **THEN** el resultado anterior deja de mostrarse al iniciar la cuenta

#### Scenario: Controles disponibles al terminar
- **WHEN** termina la cuenta y se muestra el resultado
- **THEN** el botón (si el sorteo sigue siendo válido), la lista y la cantidad vuelven a estar habilitados

### Requirement: Sorteo inválido sin cuenta regresiva
Si el sorteo no se puede realizar, la aplicación SHALL NOT mostrar la cuenta regresiva y SHALL mostrar directamente el mensaje de error definido en `sorteo-de-ganadores`.

#### Scenario: Participantes insuficientes
- **WHEN** hay 1 participante, se elige 1 ganador y el usuario intenta sortear
- **THEN** no se muestra ningún número de la cuenta y se muestra "Se necesitan al menos 2 participantes para sortear 1 ganador(es)."

#### Scenario: Lista vacía
- **WHEN** no hay participantes
- **THEN** no se inicia ninguna cuenta regresiva y el botón sigue deshabilitado con el mensaje de insuficientes

### Requirement: Tiempo inyectable y pruebas sin espera real
La cuenta regresiva SHALL obtener el paso del tiempo mediante un temporizador recibido desde fuera, y SHALL NOT llamar directamente a `setTimeout`, `setInterval` ni al reloj del sistema desde la lógica. Las pruebas automáticas SHALL verificar la secuencia usando un temporizador inyectado falso o fake timers, sin esperar segundos reales.

#### Scenario: Prueba con temporizador falso
- **WHEN** una prueba inicia la cuenta con un temporizador falso y lo avanza 1000 ms por vez
- **THEN** observa 3, 2, 1 y el resultado en ese orden, sin esperas reales

#### Scenario: Sin temporizadores pendientes al terminar
- **WHEN** la cuenta termina
- **THEN** no queda ningún temporizador pendiente

### Requirement: Cuenta legible y accesible
La cuenta SHALL anunciarse mediante una región `aria-live` y SHALL mostrarse completa, sin desplazamiento horizontal, en pantallas desde 320px de ancho.

#### Scenario: Cuenta en móvil
- **WHEN** se muestra la cuenta en una pantalla de 320px
- **THEN** el número se ve completo y la página no se desplaza horizontalmente
