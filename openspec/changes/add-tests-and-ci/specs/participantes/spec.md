# Spec Delta

## Purpose

Define cómo el usuario agrega participantes a la lista del sorteo y qué entradas se rechazan.

## ADDED Requirements

### Requirement: Agregar participantes
La aplicación SHALL permitir agregar participantes por nombre y mostrarlos en la lista, con un contador que refleje cuántos hay. El nombre SHALL guardarse sin espacios al inicio ni al final.

#### Scenario: Agregar un participante
- **WHEN** el usuario escribe "Ana" y presiona "Agregar"
- **THEN** "Ana" aparece en la lista, el contador muestra 1 y el campo de nombre queda vacío

#### Scenario: Espacios alrededor del nombre
- **WHEN** el usuario agrega "  Luis  "
- **THEN** la lista muestra "Luis"

#### Scenario: Varios participantes
- **WHEN** el usuario agrega "Ana", "Luis" y "Marta"
- **THEN** la lista muestra los tres nombres en el orden agregado y el contador muestra 3

### Requirement: Nombres inválidos
La aplicación MUST NOT agregar nombres vacíos, formados solo por espacios, ni repetidos sin distinguir mayúsculas de minúsculas, y SHALL mostrar un mensaje de error.

#### Scenario: Nombre vacío
- **WHEN** el usuario presiona "Agregar" con el campo vacío o solo con espacios
- **THEN** no se agrega nada, el contador no cambia y se muestra un mensaje de error

#### Scenario: Nombre duplicado
- **WHEN** la lista contiene "Ana" y el usuario agrega "ANA"
- **THEN** no se agrega, la lista sigue con un solo "Ana" y se muestra un mensaje de error

#### Scenario: Se corrige tras un error
- **WHEN** se mostró un error y el usuario agrega un nombre válido
- **THEN** el mensaje de error deja de mostrarse

### Requirement: Nombres como texto
Todo nombre escrito por el usuario SHALL mostrarse como texto, nunca interpretado como HTML.

#### Scenario: Nombre con etiquetas HTML
- **WHEN** el usuario agrega `<b>Ana</b>`
- **THEN** la lista muestra literalmente `<b>Ana</b>` y no se crea ningún elemento nuevo en la página
