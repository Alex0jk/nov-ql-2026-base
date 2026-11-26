# Spec Delta

## Purpose

Define que la interfaz usa el color base azul decidido por el equipo y que ese color se centraliza para poder verificarse y cambiarse en un solo lugar.

## ADDED Requirements

### Requirement: Color base azul aplicado
La interfaz SHALL usar tonos del color base azul en sus elementos principales: el título, el botón principal "Sortear ganador" y el fondo de la página.

#### Scenario: Elementos principales en azul
- **WHEN** se carga la página
- **THEN** el título, el botón "Sortear ganador" y el fondo usan tonos de la paleta azul definida

#### Scenario: Cambiar el tono base
- **WHEN** el equipo cambia el valor de una variable de color azul
- **THEN** todos los elementos que la usan cambian sin editar otras reglas de estilo

### Requirement: Colores solo como variables
Los valores de color MUST definirse únicamente como variables CSS en `:root`; ninguna otra regla de estilo SHALL contener valores de color literales, y el HTML MUST NOT contener estilos en línea.

#### Scenario: Sin colores sueltos
- **WHEN** se revisan las reglas de `styles.css` fuera de `:root`
- **THEN** ninguna contiene valores de color literales (hexadecimal, `rgb()`, `hsl()` ni nombres de color)

#### Scenario: Sin estilos en línea
- **WHEN** se revisa `index.html`
- **THEN** ningún elemento tiene atributo `style` ni manejadores de eventos en línea
