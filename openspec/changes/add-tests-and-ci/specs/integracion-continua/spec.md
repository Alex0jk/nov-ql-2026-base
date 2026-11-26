# Spec Delta

## Purpose

Define la verificación automática de cada cambio (lint y pruebas) y la documentación para repetirla localmente.

## ADDED Requirements

### Requirement: Verificación en cada push
El repositorio SHALL ejecutar automáticamente el lint y las pruebas en cada `push`, una sola vez por push: en ramas distintas de `main` las ejecuta `ci.yml` y en `main` las ejecuta el workflow de despliegue llamando a `ci.yml`.

#### Scenario: Push con todo correcto
- **WHEN** se hace push de un commit cuyo lint y pruebas pasan
- **THEN** la verificación termina en verde (✓)

#### Scenario: Push a otra rama
- **WHEN** se hace push a una rama distinta de `main`
- **THEN** la verificación se ejecuta

#### Scenario: Push a main
- **WHEN** se hace push a `main`
- **THEN** la verificación se ejecuta una sola vez, como parte del workflow de despliegue que reutiliza `ci.yml`

### Requirement: Verificación en pull requests
El repositorio SHALL ejecutar el lint y las pruebas en cada pull request cuya rama destino es `main`.

#### Scenario: Abrir un pull request
- **WHEN** se abre un pull request hacia `main`
- **THEN** la verificación se ejecuta y su resultado aparece en el pull request

#### Scenario: Nuevos commits en el pull request
- **WHEN** se agregan commits a un pull request abierto
- **THEN** la verificación se vuelve a ejecutar

### Requirement: Fallo visible
La verificación SHALL fallar (✗ en rojo) si el lint o cualquier prueba falla, y el resultado MUST indicar cuál de los dos falló.

#### Scenario: Una prueba falla
- **WHEN** un cambio hace fallar una prueba
- **THEN** la verificación termina en rojo y el registro muestra el nombre de la prueba que falló

#### Scenario: El lint falla
- **WHEN** un cambio introduce un error de lint
- **THEN** la verificación termina en rojo y el registro muestra el error de lint

### Requirement: Pruebas deterministas
Las pruebas SHALL dar el mismo resultado en cada ejecución: no dependen del azar real, del reloj ni del orden de ejecución.

#### Scenario: Ejecuciones repetidas
- **WHEN** se ejecutan las pruebas varias veces seguidas sin cambiar el código
- **THEN** el resultado es idéntico en todas

### Requirement: Las pruebas detectan errores
Las pruebas SHALL fallar cuando se rompe a propósito un comportamiento especificado.

#### Scenario: Ganador fuera de la lista
- **WHEN** se altera la elección para que pueda devolver alguien que no está en la lista
- **THEN** al menos una prueba falla

#### Scenario: Se permite sortear sin participantes suficientes
- **WHEN** se altera la regla para habilitar el sorteo con la lista vacía
- **THEN** al menos una prueba falla

#### Scenario: Se cambia el color base
- **WHEN** se elimina la variable del color azul que usan el título y el botón principal
- **THEN** al menos una prueba falla

### Requirement: Ejecución local documentada
El `README.md` SHALL explicar cómo ejecutar las pruebas y el lint en local, con un solo comando para cada uno.

#### Scenario: Persona nueva en el proyecto
- **WHEN** alguien lee el `README.md`
- **THEN** encuentra los comandos exactos para pruebas, cobertura y lint, y una nota de que el CI ejecuta lint y pruebas en cada push y pull request hacia `main`
