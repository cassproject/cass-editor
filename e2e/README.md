# CaSS editor end-to-end tests

Playwright tests that drive the editor in a real browser against a real CaSS server and
Elasticsearch. They automate the manual cases in [TEST-CASES.md](../TEST-CASES.md); each test
name starts with its case id (for example `FW-03`) and ends with its priority tag (`@P0`,
`@P1`, `@P2`).

## Running

```bash
docker compose -f e2e/docker-compose.yml up -d --wait   # Elasticsearch + CaSS on localhost:18080
npx playwright install chromium                          # once
npm run test:e2e                                         # starts the editor (vite) itself
```

- `npm run test:e2e -- e2e/tests/auth.spec.js` runs one file; `-- --grep @P0` runs the must-pass cases.
- `npm run test:e2e:ui` opens Playwright's UI mode; `npm run test:e2e:report` opens the last HTML report
  (traces, screenshots and videos of failures are in `e2e/results/`).
- `docker compose -f e2e/docker-compose.yml down -v` removes the backend and its data.

Settings (environment variables):

| Variable | Default | Meaning |
|---|---|---|
| `E2E_CASS_URL` | `http://localhost:18080/api/` | CaSS API the editor is pointed at (`?server=`) |
| `E2E_CASS_PORT` / `E2E_ES_PORT` | `18080` / `19200` | Host ports used by `e2e/docker-compose.yml` |
| `CASS_IMAGE` | `cassproject/cass:node-1.7-alpine` | CaSS image for the compose file |
| `E2E_EDITOR_PORT` | `5179` | Port of the editor dev server Playwright starts (or reuses, outside CI) |

## Writing tests

```js
import { test, expect, unique } from '../support/fixtures.js';

test('FW-03 add a top-level competency @P0', async ({ app, page, account }) => {
    await app.login(account);                                   // fast login (restores saved identities)
    const fw = await app.seedFramework({ competencies: ['Existing'] });
    await app.open('/framework', { frameworkId: fw.id });
    // ...drive the UI with page...
    expect(await app.fetchObject(fw.id)).toMatchObject({ /* what CaSS stored */ });
});
```

Fixtures (`support/fixtures.js`):

- `app` — helpers from `support/app.js`:
  - `open(route, params)` loads `#<route>` with `?server=<CaSS>&<params>` and waits for the editor to connect;
    `go(route)` changes the route without reloading.
  - `login(account, route?, params?)` logs in by restoring the account's saved identities (the editor keeps
    them in `localStorage`); `loginViaForm(account)` uses the login page; `logout()`; `becomeAnonymous(route)`.
  - `createAccount(account)` creates a user through the legacy login page.
  - `seedFramework({ name, description, competencies, foreign })` creates a framework (competencies may nest
    via `children`, which become "narrows" relations) owned by the logged-in user, or by a throwaway key with
    `foreign: true`; returns `{ id, name, competencies: { name: id }, ownerPem }`.
  - `fetchObject(id)` reads what CaSS stored; `waitIndexed(query)` waits until search finds something.
  - `publicKey()` is the logged-in user's public key (PEM).
- `account`, `otherAccount` — users created once per worker; log in with `app.login(account)`.
- `console` — the page's console messages; `problems(console)` lists errors and Vue warnings minus known noise.
  Uncaught page errors fail every test automatically (opt out with
  `test.info().annotations.push({ type: 'allow-page-errors' })`).
- `unique(prefix)` — a name no other test uses. Tests run in parallel against one shared CaSS, so never rely
  on a list being empty or on fixed names.

Conventions:

- Prefer user-facing locators (`getByText`, `getByRole`, labels) scoped to a container; fall back to stable
  class names. The editor uses lower-case button labels styled by CSS, so match text case-insensitively.
- Assert outcomes twice where it matters: in the UI and, through `app.fetchObject`, in what CaSS stored.
- Seed what a test needs through `app.seed*` instead of clicking through unrelated screens.
- Do not depend on the internet: fake external URLs with `page.route(...)` and files in `e2e/fixtures/`.
- One spec file per TEST-CASES.md section (`e2e/tests/<section>.spec.js`); helpers used by one section
  live in that spec or in `support/<section>.js`.
