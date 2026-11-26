# Spec Delta

## Purpose
Define cuándo y bajo qué condiciones la aplicación se publica automáticamente en GitHub Pages, para que cada cambio aprobado llegue a producción sin pasos manuales y sin publicar versiones rotas.

## ADDED Requirements

### Requirement: Verification on every change
The system MUST run the linter and the automated tests on every `push` and on every pull request targeting `main`, exactly once per event, and the run MUST fail if either the linter or any test fails. Pull requests and pushes to branches other than `main` are verified by `ci.yml`; pushes to `main` are verified by the deployment workflow, which calls `ci.yml`.

#### Scenario: Pull request is verified
- **WHEN** se abre o actualiza un pull request hacia `main`
- **THEN** se ejecutan el linter y las pruebas y el resultado se muestra en el pull request

#### Scenario: Push to main is verified once
- **WHEN** se hace `push` a `main`
- **THEN** el linter y las pruebas se ejecutan una sola vez, dentro del workflow de despliegue, antes de cualquier paso de publicación

#### Scenario: Verification fails
- **WHEN** el linter o una prueba falla
- **THEN** la ejecución termina en fallo (rojo) y no continúa ningún paso de despliegue

### Requirement: Deploy only from main
The system MUST deploy the application to GitHub Pages automatically on every `push` to `main`, and MUST NOT deploy on pull requests or on pushes to any other branch.

#### Scenario: Merge to main deploys
- **WHEN** se hace `push` a `main` (por ejemplo, al fusionar un pull request)
- **THEN** tras pasar la verificación se publica la nueva versión en GitHub Pages

#### Scenario: Pull request does not deploy
- **WHEN** se ejecuta el workflow por un pull request
- **THEN** solo se ejecutan las verificaciones y no se publica nada

#### Scenario: Other branch does not deploy
- **WHEN** se hace `push` a una rama distinta de `main`
- **THEN** solo se ejecutan las verificaciones y no se publica nada

### Requirement: Deploy gated by verification
The system MUST publish only a version whose linter and tests passed in the same run; if verification fails, the previously published version SHALL remain unchanged.

#### Scenario: Tests fail on main
- **WHEN** las pruebas fallan en un `push` a `main`
- **THEN** no se despliega y la versión publicada anterior sigue disponible

#### Scenario: Deployment step fails
- **WHEN** la publicación en GitHub Pages falla
- **THEN** la ejecución termina en fallo y la versión publicada anterior sigue disponible

### Requirement: Published app behaves like local
The published application MUST work from the GitHub Pages subdirectory URL (`https://<usuario>.github.io/<repositorio>/`) with the same behavior as the local version, without requiring a build step.

#### Scenario: Assets load under subdirectory
- **WHEN** se abre la URL publicada
- **THEN** el HTML, los estilos y los módulos JavaScript cargan sin errores 404 y la app permite agregar participantes y sortear igual que en local

### Requirement: No secrets and minimal permissions
The deployment workflow MUST NOT contain secrets or tokens in the repository and MUST request only the permissions needed to publish to Pages.

#### Scenario: Workflow authenticates without stored secrets
- **WHEN** el workflow despliega
- **THEN** usa únicamente el token temporal de GitHub Actions con permisos mínimos

### Requirement: README links to published app
The `README.md` MUST include the link to the published application.

#### Scenario: README has the link
- **WHEN** se lee el `README.md`
- **THEN** contiene el enlace a la aplicación publicada en GitHub Pages
