// TEST-CASES.md §15 URL parameters & embedding (URL-01 … URL-06).
import { test, expect, unique } from '../support/fixtures.js';
import { CASS_URL } from '../support/env.js';
import { seedConceptScheme } from '../support/taxonomies.js';

// Query values keep a literal '+' (src/main.js does not decode it to a space) on purpose: embedding
// hosts may pass unencoded base64. Not tested here.

// First render of a framework (hierarchy) can take long on a busy machine.
const LOAD = { timeout: 60_000 };
const EDITOR_ORIGIN = `http://localhost:${process.env.E2E_EDITOR_PORT || '5179'}`;
const addButton = (page) => page.locator('.lode__hierarchy .hierarchy-buttons').getByText(/^\s*add\s*$/i);
const editButtons = (page) => page.locator('.edit-button');
const checkboxes = (page) => page.locator('.lode__hierarchy input.is-checkradio');
const dragHandles = (page) => page.locator('.lode__hierarchy .handle-button');
/** The hierarchy row of a competency (its own row, not its children's). */
const nodeRow = (scope, id) => scope.locator(`li[id="${id}"] > .lode__hierarchy-item`);

/** Creates a framework that nobody owns (as a logged-out user would), through the page's repo. */
async function seedOwnerlessFramework(page, name, competencies) {
    return await page.evaluate(async ({ name, competencies }) => {
        const f = new EcFramework();
        f.generateId(repo.selectedServer);
        f.setName(name);
        const ids = {};
        const toSave = [];
        for (const n of competencies) {
            const c = new EcCompetency();
            c.generateId(repo.selectedServer);
            c.setName(n);
            f.addCompetency(c.shortId());
            ids[n] = c.shortId();
            toSave.push(c);
        }
        toSave.push(f);
        await repo.multiput(toSave);
        return { id: f.shortId(), name, competencies: ids };
    }, { name, competencies });
}

// ---------------------------------------------------------------------------------------------
// URL-01 server= override
// ---------------------------------------------------------------------------------------------

test.describe('URL-01 server= override', () => {
    // Requests still in flight when a test ends would otherwise fail its forwarding route.
    test.afterEach(async ({ page }) => {
        await page.unrouteAll({ behavior: 'ignoreErrors' });
    });

    // A second "CaSS server" on another origin. page.route forwards it to the real CaSS, so the
    // editor works against it while the test can see exactly which endpoint every request used.
    const OTHER_ORIGIN = 'http://cass-two.e2e:18080';
    const OTHER_SERVER = `${OTHER_ORIGIN}/api`; // deliberately without the trailing slash
    const realOrigin = new URL(CASS_URL).origin;

    async function routeOtherServer(page) {
        const requests = [];
        // Only requests made by the editor once it runs against server two (not by the page it replaces).
        page.on('request', (r) => {
            let frameUrl = '';
            try { frameUrl = r.frame().url(); } catch { /* worker request */ }
            if (frameUrl.includes(encodeURIComponent(OTHER_ORIGIN))) requests.push(r.url());
        });
        await page.route(`${OTHER_ORIGIN}/**`, async (route) => {
            const url = route.request().url().replace(OTHER_ORIGIN, realOrigin);
            const response = await route.fetch({ url });
            await route.fulfill({ response });
        });
        // The editor's change-notification socket: accept it without a backend (mocked, stays open).
        await page.routeWebSocket(/cass-two\.e2e/, () => {});
        return requests;
    }

    test('URL-01 data loads from the server given in server= (trailing slash added) @P0', async ({ app, page, account }) => {
        // Log in first (identities live in localStorage), then reload the editor against server two.
        await app.login(account);
        const requests = await routeOtherServer(page);
        await app.open('/frameworks', { server: OTHER_SERVER });
        await expect.poll(() => page.evaluate(() => EcIdentityManager.default.ids.length)).toBeGreaterThan(0);
        expect(await page.evaluate(() => repo.selectedServer)).toBe(`${OTHER_SERVER}/`);

        // Data created and read through the overridden endpoint.
        const fw = await app.seedFramework({ name: unique('Server override'), competencies: ['Through server two'] });
        expect(fw.id.startsWith(`${OTHER_SERVER}/`)).toBe(true);
        await app.waitIndexed(`@id:"${fw.id}"`);

        await app.open('/framework', { server: OTHER_SERVER, frameworkId: fw.id });
        await expect(page.getByText(fw.name).first()).toBeVisible(LOAD);
        await expect(page.getByText('Through server two').first()).toBeVisible(LOAD);

        // Search on the frameworks list goes to the given server too.
        await app.open('/frameworks', { server: OTHER_SERVER });
        await page.getByPlaceholder('Search for frameworks...').fill(fw.name);
        await expect(page.getByText(fw.name).first()).toBeVisible(LOAD);

        const api = requests.filter((u) => u.includes('/api/'));
        expect(api.some((u) => u.startsWith(`${OTHER_SERVER}/`) && u.includes('search'))).toBe(true);
        expect(api.filter((u) => u.startsWith(`${OTHER_SERVER}/`)).length).toBeGreaterThan(0);
        expect(api.filter((u) => u.startsWith(realOrigin)), 'requests that bypassed server=').toEqual([]);
    });
});

// ---------------------------------------------------------------------------------------------
// URL-02 view=true
// ---------------------------------------------------------------------------------------------

test.describe('URL-02 view=true read-only mode', () => {
    async function expectReadOnly(page, fw) {
        await expect(page.getByText('Child competency').first()).toBeVisible(LOAD);
        await expect(addButton(page)).toHaveCount(0);
        await expect(editButtons(page)).toHaveCount(0);
        await expect(checkboxes(page)).toHaveCount(0);
        await expect(dragHandles(page)).toHaveCount(0);
        // Hovering a row reveals no edit controls either.
        await nodeRow(page, fw.competencies['Top competency']).hover();
        await expect(editButtons(page)).toHaveCount(0);
    }

    test('URL-02 the owner gets no editing affordances with view=true @P1', async ({ app, page, account }) => {
        await app.login(account);
        const fw = await app.seedFramework({ name: unique('View only'), competencies: [{ name: 'Top competency', children: ['Child competency'] }] });

        // Without view=true the owner can edit (so the checks below are meaningful).
        await app.open('/framework', { frameworkId: fw.id });
        await expect(addButton(page)).toBeVisible(LOAD);
        await expect(checkboxes(page)).not.toHaveCount(0);
        await expect(editButtons(page)).not.toHaveCount(0);

        await app.open('/framework', { frameworkId: fw.id, view: 'true' });
        await expectReadOnly(page, fw);

        // The frameworks list does not mark it editable either.
        await app.waitIndexed(`@id:"${fw.id}"`);
        await app.open('/frameworks', { view: 'true' });
        await page.getByPlaceholder('Search for frameworks...').fill(fw.name);
        const item = page.locator('li.cass--list--item').filter({ hasText: fw.name }).first();
        await expect(item).toBeVisible(LOAD);
        await expect(item.getByText('Editable', { exact: true })).toHaveCount(0);
    });

    test('URL-02 a logged-out user gets no editing affordances on an everybody-editable framework @P1', async ({ app, page }) => {
        await app.becomeAnonymous('/frameworks');
        const fw = await seedOwnerlessFramework(page, unique('View only ownerless'), ['Top competency']);
        // Give it a child through a second competency so both levels render.
        await page.evaluate(async ({ fwId }) => {
            const f = await EcFramework.get(fwId);
            const c = new EcCompetency();
            c.generateId(repo.selectedServer);
            c.setName('Child competency');
            f.addCompetency(c.shortId());
            await repo.multiput([c, f]);
        }, { fwId: fw.id });

        await app.open('/framework', { frameworkId: fw.id });
        await expect(page.getByText('Child competency').first()).toBeVisible(LOAD);
        await expect(addButton(page)).toBeVisible();

        await app.open('/framework', { frameworkId: fw.id, view: 'true' });
        await expectReadOnly(page, fw);
    });
});

// ---------------------------------------------------------------------------------------------
// URL-03 select=true (embedding)
// ---------------------------------------------------------------------------------------------

test.describe('URL-03 select=true picker mode @P2', () => {
    const HOST = `${EDITOR_ORIGIN}/__e2e_host.html`;

    /**
     * Serves a page that embeds the editor in an iframe and records every postMessage it gets
     * (window.__messages), as an embedding application would.
     */
    async function openInHost(app, page, params) {
        const src = app.url('/framework', { origin: EDITOR_ORIGIN, ...params });
        await page.route(HOST, (route) => route.fulfill({
            contentType: 'text/html',
            body: `<!doctype html><html><head><title>host</title></head><body style="margin:0">
<script>window.__messages = []; window.addEventListener('message', (e) => window.__messages.push(e.data));</script>
<iframe id="editor" src="${src}" style="width:1500px;height:950px;border:0"></iframe></body></html>`,
        }));
        await page.goto(HOST);
        return page.frameLocator('#editor');
    }

    const selectedMessages = (page) => page.evaluate(() => window.__messages.filter((m) => m && m.message === 'selected'));

    test('checkboxes render and the select button posts the chosen competency ids', async ({ app, page, account }) => {
        await app.login(account);
        // Someone else's framework: the checkboxes come from select mode, not edit rights.
        const fw = await app.seedFramework({ name: unique('Picker'), foreign: true, competencies: [{ name: 'Pick me', children: ['Pick me too'] }, 'Leave me'] });
        const frame = await openInHost(app, page, { frameworkId: fw.id, select: 'true' });

        await expect(frame.getByText('Leave me').first()).toBeVisible(LOAD);
        await expect(frame.locator(`input[id="${fw.competencies['Leave me']}checkbox"]`)).toHaveCount(1);
        await expect(frame.locator('.lode__hierarchy .hierarchy-buttons').getByText(/^\s*add\s*$/i)).toHaveCount(0);

        await frame.locator(`label[for="${fw.competencies['Leave me']}checkbox"]`).click();
        await expect(frame.locator(`input[id="${fw.competencies['Leave me']}checkbox"]`)).toBeChecked();
        // select=true labels the select button with the parameter's value.
        await frame.locator('.hierarchy-buttons .button', { hasText: /^\s*true\s*$/ }).click();

        await expect.poll(async () => (await selectedMessages(page)).length).toBe(1);
        const [message] = await selectedMessages(page);
        expect(message.type).toBe('Competency');
        expect(message.selected).toEqual([fw.competencies['Leave me']]);
        expect(JSON.stringify(message.selectedFramework)).toContain(fw.id);
    });

    test('selectVerbose returns full competency objects', async ({ app, page, account }) => {
        await app.login(account);
        const fw = await app.seedFramework({ name: unique('Picker verbose'), foreign: true, competencies: ['Verbose pick', 'Other'] });
        const frame = await openInHost(app, page, { frameworkId: fw.id, select: 'Pick', selectVerbose: 'true' });

        await expect(frame.getByText('Verbose pick').first()).toBeVisible(LOAD);
        await frame.locator(`label[for="${fw.competencies['Verbose pick']}checkbox"]`).click();
        await frame.locator('.hierarchy-buttons .button', { hasText: /^\s*Pick\s*$/ }).click();

        await expect.poll(async () => (await selectedMessages(page)).length).toBe(1);
        const [message] = await selectedMessages(page);
        expect(message.selected).toHaveLength(1);
        // The full object, as stored (its @id carries the version timestamp).
        expect(message.selected[0]['@id'].startsWith(fw.competencies['Verbose pick'])).toBe(true);
        expect(JSON.stringify(message.selected[0]['name'])).toContain('Verbose pick');
        expect(message.selected[0]['@type']).toMatch(/Competency/);
    });

    test('singleSelect labels the select button and posts the selection', async ({ app, page, account }) => {
        await app.login(account);
        const fw = await app.seedFramework({ name: unique('Picker single'), foreign: true, competencies: ['Only one', 'Not this'] });
        const frame = await openInHost(app, page, { frameworkId: fw.id, select: 'select', singleSelect: 'Choose' });

        await expect(frame.getByText('Only one').first()).toBeVisible(LOAD);
        await frame.locator(`label[for="${fw.competencies['Only one']}checkbox"]`).click();
        await frame.locator('.hierarchy-buttons .button', { hasText: /^\s*Choose\s*$/ }).click();

        await expect.poll(async () => (await selectedMessages(page)).length).toBe(1);
        const [message] = await selectedMessages(page);
        expect(message.selected).toEqual([fw.competencies['Only one']]);
    });
});

// ---------------------------------------------------------------------------------------------
// URL-04 ceasnDataFields=true
// ---------------------------------------------------------------------------------------------

test.describe('URL-04 ceasnDataFields=true @P2', () => {
    test('framework view uses CTDL-ASN terminology', async ({ app, page, account }) => {
        await app.login(account);
        const fw = await app.seedFramework({ name: unique('CTDL terms'), competencies: ['Ctdl competency'] });

        await app.open('/framework', { frameworkId: fw.id });
        const toolbar = page.locator('#framework-editor-toolbar');
        await expect(page.getByText('Ctdl competency').first()).toBeVisible(LOAD);
        await expect(toolbar.getByText(/^\s*primary\s*$/i)).toBeVisible(LOAD);

        await app.open('/framework', { frameworkId: fw.id, ceasnDataFields: 'true' });
        const row = nodeRow(page, fw.competencies['Ctdl competency']);
        await expect(row.getByText('Ctdl competency').first()).toBeVisible(LOAD);
        // Property headers use CTDL-ASN names.
        await expect(row.getByText('Competency Text', { exact: true })).toBeVisible(LOAD);
        // Detail levels use CTDL wording.
        for (const label of ['low detail', 'moderate detail', 'high detail']) {
            await expect(toolbar.getByText(new RegExp(`^\\s*${label}\\s*$`, 'i'))).toBeVisible(LOAD);
        }
        await expect(toolbar.getByText(/^\s*primary\s*$/i)).toHaveCount(0);
        // CTDL-ASN (Credential Engine) mode: collections instead of taxonomies; no configurations or plugins.
        const nav = page.locator('#app-side-nav-bar');
        await expect(nav.getByText('Collections', { exact: true })).toBeVisible(LOAD);
        await expect(nav.getByText('Taxonomies', { exact: true })).toHaveCount(0);
        await expect(nav.getByText('Configurations', { exact: true })).toHaveCount(0);
        await expect(nav.getByText('Plugins', { exact: true })).toHaveCount(0);
    });

    test('concept import and navigation say "concept scheme"', async ({ app, page, account }) => {
        await app.login(account);
        await app.open('/import', { action: 'import', concepts: 'true' });
        await expect(page.getByRole('heading', { name: /Import a taxonomy/i })).toBeVisible();

        await app.open('/import', { action: 'import', concepts: 'true', ceasnDataFields: 'true' });
        await expect(page).toHaveURL(/#\/import/);
        await expect(page.getByRole('heading', { name: /Import a concept scheme/i })).toBeVisible();
        await expect(page.getByRole('heading', { name: /Import a taxonomy/i })).toHaveCount(0);
        await expect(page.getByText('Concept Schemes', { exact: true }).first()).toBeVisible(LOAD);
    });
});

// ---------------------------------------------------------------------------------------------
// URL-05 highlightCompetency / frameworkId deep links
// ---------------------------------------------------------------------------------------------

test.describe('URL-05 highlightCompetency / frameworkId deep links @P2', () => {
    const names = Array.from({ length: 40 }, (_, i) => `Deep item ${String(i).padStart(2, '0')}`);
    const target = names[names.length - 1];
    const thing = (page, id) => page.locator(`[id="scroll-${id.split('/').pop()}"]`);
    const HIGHLIGHTED = /\bhighlighted\b/;

    async function expectHighlighted(page, fw) {
        await expect(thing(page, fw.competencies[target])).toHaveClass(HIGHLIGHTED, LOAD);
        await expect(page.locator('.lode__thing.highlighted')).toHaveCount(1);
        // Intended (TEST-CASES.md URL-05): highlighted only; the view stays at the top of the framework.
        await expect(page.getByText(names[0]).first()).toBeInViewport();
        await expect(thing(page, fw.competencies[target])).not.toBeInViewport();
    }

    test('frameworkId + highlightCompetency query parameters open and highlight the competency', async ({ app, page, account }) => {
        await app.login(account);
        const fw = await app.seedFramework({ name: unique('Deep link'), competencies: names });
        await app.open('/frameworks', { frameworkId: fw.id, highlightCompetency: fw.competencies[target] });
        // frameworkId alone routes to the framework.
        await expect(page).toHaveURL(/#\/framework\//, LOAD);
        await expect(page.getByText(fw.name).first()).toBeVisible(LOAD);
        await expectHighlighted(page, fw);
    });

    test('URL-05 #/framework/<id>?highlightCompetency=<id> highlights the competency (known bug: a query inside the hash is ignored) @P2', async ({ app, page, account }) => {
        test.fail(true, 'App.initializeApp reads the query parameters before the router has resolved the hash, so highlightCompetency inside the hash is ignored; see e2e/FINDINGS.md');
        await app.login(account);
        const fw = await app.seedFramework({ name: unique('Deep link hash'), competencies: names });
        const hashRoute = `/framework/${encodeURIComponent(fw.id)}?highlightCompetency=${encodeURIComponent(fw.competencies[target])}`;
        await page.goto(app.url(hashRoute));
        await app.ready();
        await expect(page).toHaveURL(/#\/framework\/.+highlightCompetency=/);
        await expect(page.getByText(fw.name).first()).toBeVisible(LOAD);
        await expect(page.getByText(names[0]).first()).toBeVisible(LOAD);
        await expect(thing(page, fw.competencies[target])).toHaveClass(HIGHLIGHTED, { timeout: 10_000 });
    });

    test('a concept scheme deep link with highlightCompetency highlights the concept', async ({ app, page, account, console }) => {
        await app.login(account);
        const scheme = await seedConceptScheme(app, { name: unique('Highlight scheme'), concepts: ['Plain concept', 'Highlighted concept'] });
        const conceptId = scheme.concepts['Highlighted concept'];
        // The scheme view finds its concepts by search (skos:inScheme), which lags writes.
        for (const id of Object.values(scheme.concepts)) await app.waitIndexed(`@id:"${id}"`);
        await app.open('/frameworks', { concepts: 'true', frameworkId: scheme.id, highlightCompetency: conceptId });
        await expect(page).toHaveURL(/#\/conceptScheme\//, LOAD);
        await expect(page.getByText('Plain concept').first()).toBeVisible(LOAD);
        await expect(thing(page, conceptId)).toHaveClass(HIGHLIGHTED);
        await expect(page.locator('.lode__thing.highlighted')).toHaveCount(1);
        // The fixture fails the test on uncaught page errors (the old code read an undefined variable).
        expect(console.pageErrors).toEqual([]);
    });
});

// ---------------------------------------------------------------------------------------------
// URL-06 Unknown route
// ---------------------------------------------------------------------------------------------

test.describe('URL-06 unknown and error routes @P2', () => {
    test('URL-06 an unknown route renders the NotFound view (known bug: unknown routes redirect to 403) @P2', async ({ app, page }) => {
        test.fail(true, 'The router catch-all redirects unknown routes to /403 (Forbidden) and NotFound.vue is not routed; see e2e/FINDINGS.md');
        await app.open('/no-such-page');
        await expect(page.getByRole('heading', { name: 'Not found' })).toBeVisible({ timeout: 10_000 });
        await expect(page.getByRole('link', { name: /return home/i })).toBeVisible();

        // In-app navigation to an unknown route behaves the same way.
        await app.go('/frameworks');
        await expect(page).toHaveURL(/#\/frameworks/, LOAD);
        await app.go('/still/not/a/page');
        await expect(page.getByRole('heading', { name: 'Not found' })).toBeVisible({ timeout: 10_000 });
    });

    test('#/403 and #/500 render their views and link home', async ({ app, page }) => {
        await app.open('/403');
        await expect(page.getByRole('heading', { name: 'Forbidden' })).toBeVisible();
        await expect(page.getByText(/do not have permission/i)).toBeVisible(LOAD);

        await app.open('/500');
        await expect(page.getByRole('heading', { name: 'Internal Error' })).toBeVisible();
        await expect(page.getByText(/not responding properly/i)).toBeVisible(LOAD);
        await page.getByRole('link', { name: /return home/i }).click();
        await expect(page).toHaveURL(/#\/frameworks/, LOAD);
        await expect(page.getByPlaceholder('Search for frameworks...')).toBeVisible();
    });
});
