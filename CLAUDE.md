# Herokuapp — Playwright E2E tests

Suite de tests end-to-end con Playwright + TypeScript sobre the-internet.herokuapp.com. Cubre las secciones que no están ya cubiertas en el repo hermano de saucedemo.com.

## Comandos

- `npm run test` — corre toda la suite (los navegadores configurados en `playwright.config.ts`).
- `npm run report` — abre el último reporte HTML.
- `npx playwright test <fichero>.spec.ts -g "<nombre del test>"` — correr un test concreto.

## Estructura y convenciones

- Un fichero `tests/<seccion>.spec.ts` por cada sección de the-internet.herokuapp.com, con su Page Object correspondiente en `tests/pages/<seccion>Page.ts`.
- Los Page Objects se inyectan como fixtures desde `tests/fixtures/herokuapp-test.ts` (extiende `test` de Playwright). Importa siempre `test`/`expect` desde ese fichero, no directamente de `@playwright/test`.
- Cada spec suele empezar navegando a su sección con un helper `goToSection(...)` local al fichero (clic en el link + `expect(page).toHaveURL(...)`).
- Los locators van por rol o clase siempre que se pueda; evita `nth()` salvo que no haya alternativa.

## Tablas ordenables (sortableDataTables.spec.ts)

- El helper `sortAndCheck` compara el contenido de la tabla antes/después de cada click, ordenado con `localeCompare` (texto) o numéricamente tras limpiar `$`/`,` (columnas de importe).
- Al comparar el resultado de un sort: compara la **fila completa** (`tbody tr`) solo cuando la columna que ordenas es la primera del texto concatenado de la fila (p. ej. Last Name) — eso además detecta si las filas se descolocan entre columnas. Para cualquier otra columna, compara la celda específica (`td:nth-child(n)` o `td.clase`). Nunca compares una columna con el mismo texto en todas las filas (como Action, que siempre es "edit delete"): esa comparación no detecta nada, pasa siempre aunque el test esté roto.
- En los tests de "sort by action": comprueba que el orden cambia de verdad tras el primer click (`not.toHaveText`) antes de comprobar que vuelve al orden por defecto. Si no, el test pasa aunque el reset no funcione.

## Hooks activos (`.claude/hooks/`)

- `typecheck.js` (PostToolUse) — corre `tsc --noEmit` tras cada edición de un `.ts`.
- `protect-config.js` (PreToolUse) — bloquea ediciones directas a `playwright.config.ts`, `package.json` y `.claude/settings.json`; pide confirmación explícita en el chat antes de reintentarlo.
- `test-guard.js` + `check-tests-run.js` (PostToolUse + Stop) — si se toca un `*.spec.ts`, obliga a correr `npx playwright test` / `npm test` antes de dar el turno por terminado.
- `test-duration-start.js` + `test-duration-check.js` (PreToolUse + PostToolUse sobre Bash) — avisa (sin bloquear) si la suite tarda más de 90s.

## Skills

- `revisar-test` — revisa un fichero de test buscando locators frágiles, asserts sin `await`, timeouts fijos, y falta de independencia entre tests. No reescribe el código salvo que se pida explícitamente.

## CI

GitHub Actions (`.github/workflows/playwright.yml`) corre la suite en cada push.
