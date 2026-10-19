// TEST-CASES.md §5 Import (IMP-01 … IMP-08).
//
// No test uses the internet: URL sources and remote servers are faked with page.route
// (support/import.js), and schema.cassproject.org documents come from public/.
import { test, expect, unique, problems } from '../support/fixtures.js';
import { CASS_URL } from '../support/env.js';
import {
    serveSchemas, serveJson, proxyCass, remoteIdOf, ctdlAsnGraph, chooseTab, uploadFile, writeFixture, fromTemplate, search, textOf, newUuid,
} from '../support/import.js';

// The preview shows a placeholder until every node is fetched from CaSS; with other suites using the same
// server that took over 60s at times (and imports or error lists can take as long).
const LOADED = { timeout: 90_000 };

const ONET_ABILITIES = 'https://www.onetcenter.org/ctdlasn/graph/ce-07c257d6-9119-11e8-b852-782bcb5df6ac';

/** Routes every import test needs. */
async function offline(page) {
    await serveSchemas(page);
    // Nothing under example.org exists; tests serve the URLs they need.
    await page.route(/^https?:\/\/example\.org\//, (route) => route.fulfill({ status: 404, body: 'not found' }));
}

/** Logs in (or not) and opens the import page with the given tab. */
async function openImport(app, page, account, tab) {
    if (account) await app.login(account, '/import');
    else await app.becomeAnonymous('/import');
    await offline(page);
    if (tab) await chooseTab(page, tab);
}

const button = (scope, label) => scope.locator('.button', { hasText: new RegExp(`^\\s*${label}\\s*$`, 'i') });
const status = (page) => page.locator('#import-bottom-section');
const preview = (page) => page.locator('.import-preview');
const light = (page) => page.locator('.import-light');
const urlInput = (page) => page.getByPlaceholder('paste your url here...');
const modal = (page) => page.locator('#cass-modal.is-active');
const vueWarnings = (log) => problems(log).filter((text) => /\[Vue warn\]/.test(text));
/** The import workflow buttons (cancel, done editing, export, import again, view in editor, done) of a preview or light view. */
const actions = (scope) => scope.locator('.buttons.is-small.is-right').first();
/** Ids without the version (timestamp) CaSS appends. */
const shortId = (id) => id.replace(/\/\d+$/, '');

/** A node of the hierarchy (li ids are competency ids); child of parentId when given, else top level. */
const node = (scope, id, parentId) => scope.locator(parentId ? `li[id="${parentId}"] li[id="${id}"]` : `ul.lode__hierarchy-ul > li[id="${id}"]`);

/** Clicks a workflow button of the preview once the preview has loaded (it is hidden until then). */
async function previewAction(page, label) {
    await expect(button(actions(preview(page)), label)).toBeVisible(LOADED);
    await button(actions(preview(page)), label).click();
}

async function importUrl(page, url) {
    await urlInput(page).fill(url);
    await button(page.locator('#import-from-url'), 'Import framework').click();
}

/** Checks that the preview (or light view) in scope shows source's framework and hierarchy. */
async function expectHierarchy(scope, source, name) {
    await expect(scope.getByText(name).first()).toBeVisible(LOADED);
    const { ids, n } = source;
    await expect(node(scope, ids[n.top1])).toBeVisible();
    await expect(node(scope, ids[n.top2])).toBeVisible();
    await expect(node(scope, ids[n.child1], ids[n.top1])).toBeVisible();
    await expect(node(scope, ids[n.child2], ids[n.top1])).toBeVisible();
    for (const text of source.names) await expect(scope.getByText(text, { exact: true }).first()).toBeVisible();
}

/** Relations of a stored framework as "source -> target (type)" strings. */
async function relationsOf(app, framework) {
    const out = [];
    for (const id of framework.relation || []) {
        const r = await app.fetchObject(id);
        out.push(`${r.source} -> ${r.target} (${r.relationType})`);
    }
    return out.sort();
}

/** Checks what CaSS stored for a CTDL-ASN graph built by ctdlAsnGraph. */
async function expectStoredGraph(app, source, name, ownerPem) {
    const framework = await app.fetchObject(source.frameworkId);
    expect(framework, 'imported framework').not.toBeNull();
    expect(textOf(framework.name)).toBe(name);
    expect([...framework.competency].sort()).toEqual(Object.values(source.ids).sort());
    if (ownerPem) expect(framework.owner).toContain(ownerPem);
    const { ids, n } = source;
    expect(await relationsOf(app, framework)).toEqual([
        `${ids[n.child1]} -> ${ids[n.top1]} (narrows)`,
        `${ids[n.child2]} -> ${ids[n.top1]} (narrows)`,
    ].sort());
    const child = await app.fetchObject(ids[n.child1]);
    expect(textOf(child.name)).toBe(n.child1);
    return framework;
}

/** Waits for an object to be searchable, so the editor's duplicate checks can find it. */
const waitIndexed = (app, id) => app.waitIndexed(`@id:"${id}"`);

test.describe('IMP-01 import from URL (CTDL-ASN) @P0', () => {
    test('IMP-01 a sample link imports, previews and completes @P0', async ({ app, page, account, console: log }) => {
        const name = unique('URL import');
        const source = ctdlAsnGraph(name);
        await openImport(app, page, account, 'URL Source');
        // The sample O*NET link, answered with our own graph.
        await serveJson(page, ONET_ABILITIES, source.graph);
        await page.getByText('Abilities Competency Framework', { exact: true }).click();
        await expect(urlInput(page)).toHaveValue(ONET_ABILITIES);
        await button(page.locator('#import-from-url'), 'Import framework').click();

        // Preview: framework header and the full hierarchy.
        await expect(status(page).getByText('Processed, ready to edit')).toBeVisible({ timeout: 60_000 });
        await expectHierarchy(preview(page), source, name);
        await expect(button(actions(preview(page)), 'done editing')).toBeVisible();

        await previewAction(page, 'done editing');
        await expect(status(page).getByText('Complete', { exact: true })).toBeVisible();
        await expect(preview(page)).toHaveCount(0);
        await expectHierarchy(light(page), source, name);
        for (const label of ['Cancel', 'Export', 'import again', 'view in editor', 'Done']) {
            await expect(button(actions(light(page)), label), label).toBeVisible();
        }
        expect(vueWarnings(log), 'Vue warnings during the import').toEqual([]);

        await expectStoredGraph(app, source, name, await app.publicKey());
    });
});

test.describe('IMP-02 duplicate import handling @P0', () => {
    /** Imports a graph from a URL, then imports it again after the source renamed the framework. */
    async function importTwice(app, page, account, { loggedOutSecondTime = false } = {}) {
        // Two full imports against the shared server.
        test.slow();
        const name = unique('Duplicate import');
        const url = `https://example.org/ctdlasn/graph/${newUuid()}`;
        const source = ctdlAsnGraph(name);
        let served = source.graph;
        await openImport(app, page, account, 'URL Source');
        await serveJson(page, url, () => served);
        await importUrl(page, url);
        await expect(status(page).getByText('Processed, ready to edit')).toBeVisible({ timeout: 60_000 });
        await expectHierarchy(preview(page), source, name);
        await waitIndexed(app, source.frameworkId);

        const renamed = `${name} v2`;
        served = JSON.parse(JSON.stringify(source.graph));
        served['@graph'][0]['ceasn:name'] = { 'en-us': renamed };
        if (loggedOutSecondTime) {
            await app.becomeAnonymous('/import');
        } else {
            // Leave the import page (side navigation) and come back.
            await page.locator('a[href^="#/frameworks"]').first().click();
            await expect(page).toHaveURL(/#\/frameworks/, LOADED);
            await expect(page.locator('#import')).toHaveCount(0);
            await app.go('/import');
            await expect(page).toHaveURL(/#\/import/, LOADED);
        }
        await chooseTab(page, 'URL Source');
        await importUrl(page, url);
        await expect(modal(page)).toBeVisible();
        await expect(modal(page).locator('.modal-card-title')).toHaveText(/Duplicate framework/);
        await expect(modal(page)).toContainText('has already been imported');
        await expect(modal(page).getByRole('button', { name: 'Confirm' })).toBeVisible();
        await expect(modal(page).getByRole('button', { name: 'Cancel' })).toBeVisible();
        return { name, renamed, source, url };
    }

    test('IMP-02 confirm overwrites the framework @P0', async ({ app, page, account }) => {
        const { renamed, source } = await importTwice(app, page, account);
        await modal(page).getByRole('button', { name: 'Confirm' }).click();
        await expect(modal(page)).toHaveCount(0);
        await expect(status(page).getByText('Processed, ready to edit')).toBeVisible({ timeout: 60_000 });
        await expect(preview(page).getByText(renamed).first()).toBeVisible(LOADED);
        await expect.poll(async () => textOf((await app.fetchObject(source.frameworkId)).name)).toBe(renamed);
        const framework = await app.fetchObject(source.frameworkId);
        expect(framework.competency).toHaveLength(4);
        expect(framework.relation).toHaveLength(2);
    });

    test('IMP-02 cancel aborts cleanly @P0', async ({ app, page, account, console: log }) => {
        const { name, source } = await importTwice(app, page, account);
        await modal(page).getByRole('button', { name: 'Cancel' }).click();
        await expect(modal(page)).toHaveCount(0);
        await expect(urlInput(page)).toBeVisible();
        await expect(status(page).getByText('Ready', { exact: true })).toBeVisible();
        await expect(preview(page)).toHaveCount(0);
        await expect(page.locator('#import-from-url .has-text-danger')).toHaveCount(0);
        expect(vueWarnings(log)).toEqual([]);
        expect(textOf((await app.fetchObject(source.frameworkId)).name)).toBe(name);
    });

    test('IMP-02 logged-out users are warned, and confirm still overwrites @P0', async ({ app, page, account }) => {
        const { renamed, source } = await importTwice(app, page, account, { loggedOutSecondTime: true });
        await expect(modal(page)).toContainText("will not be able to edit it since you're not logged in");
        await modal(page).getByRole('button', { name: 'Confirm' }).click();
        await expect(modal(page)).toHaveCount(0);
        await expect(status(page).getByText('Processed, ready to edit')).toBeVisible({ timeout: 60_000 });
        await expect(preview(page).getByText(renamed).first()).toBeVisible(LOADED);
        await expect.poll(async () => textOf((await app.fetchObject(source.frameworkId)).name)).toBe(renamed);
    });
});

test('IMP-03 "view in editor" opens the imported framework @P1', async ({ app, page, account }) => {
    const name = unique('View imported');
    const url = `https://example.org/ctdlasn/graph/${newUuid()}`;
    const source = ctdlAsnGraph(name);
    await openImport(app, page, account, 'URL Source');
    await serveJson(page, url, source.graph);
    await importUrl(page, url);
    await expect(status(page).getByText('Processed, ready to edit')).toBeVisible({ timeout: 60_000 });
    await previewAction(page, 'done editing');
    await button(actions(light(page)), 'view in editor').click();

    await expect(page).toHaveURL(/#\/framework\//, LOADED);
    expect(decodeURIComponent(page.url())).toContain(`#/framework/${source.frameworkId}`);
    await expectHierarchy(page.locator('#app'), source, name);
});

test.describe('IMP-04 import CSV @P1', () => {
    test('IMP-04 CSV with column mapping @P1', async ({ app, page, account }, testInfo) => {
        const name = unique('CSV import');
        const prefix = unique('CSV');
        const code = `e2e-${newUuid()}`;
        const file = writeFixture(testInfo, 'skills.csv', fromTemplate('competencies.csv', { prefix, code }));
        await openImport(app, page, account, 'File Import');
        await uploadFile(page, file);

        await expect(page.locator('#import-status')).toContainText('3 Competencies Detected.');
        const mapping = page.locator('.csv-input');
        const field = (label) => mapping.locator('.field', { hasText: label });
        await expect(field('Name the framework').locator('input')).toHaveValue('skills');
        await field('Name the framework').locator('input').fill(name);
        await field('Select the Name column').locator('select').selectOption({ label: 'Skill' });
        await field('Select the Description column').locator('select').selectOption({ label: 'Summary' });
        await field('Select the ID column').locator('select').selectOption({ label: 'Code' });
        await button(page.locator('#import-from-file'), 'Import').click();

        await expect(status(page).getByText('Import success, 3 competencies ready to edit.')).toBeVisible({ timeout: 60_000 });
        for (const skill of ['Listening', 'Speaking', 'Writing']) {
            await expect(preview(page).getByText(`${prefix} ${skill}`, { exact: true })).toBeVisible(LOADED);
        }
        await previewAction(page, 'done editing');
        await expect(status(page).getByText('Your import is complete!')).toBeVisible();

        // Saved once, with the mapped columns.
        await expect.poll(async () => (await search(page, `@type:Framework AND name:"${name}"`)).length, { timeout: 20_000 }).toBeGreaterThan(0);
        const frameworks = await search(page, `@type:Framework AND name:"${name}"`);
        expect(frameworks, 'frameworks saved by one CSV import').toHaveLength(1);
        const framework = frameworks[0];
        expect(framework.owner).toContain(await app.publicKey());
        expect(framework.competency).toHaveLength(3);
        const competencies = await Promise.all(framework.competency.map((id) => app.fetchObject(id)));
        const listening = competencies.find((c) => textOf(c.name) === `${prefix} Listening`);
        expect(listening, 'competency from the Skill column').toBeTruthy();
        expect(textOf(listening.description)).toBe('Hears what others say');
        expect(listening['@id']).toContain(`${code}-listening`);
    });

    test('IMP-04 a malformed CSV produces a readable error @P1', async ({ app, page, account }, testInfo) => {
        // Without a trailing newline: that would add errors for an empty last row (known bug, see the IMP-05 trailing-newline test).
        const file = writeFixture(testInfo, 'broken.csv', fromTemplate('ctdlasn-malformed.csv', { fw: newUuid(), c1: newUuid(), name: unique('Broken CSV') }).trimEnd());
        await openImport(app, page, account, 'File Import');
        await uploadFile(page, file);
        await expect(page.locator('#import-status')).toContainText('Import 1 frameworks and 1 competencies.');
        await button(page.locator('#import-from-file'), 'Import').click();

        const errors = page.locator('.import-errors-container');
        await expect(errors).toContainText('1 error(s) found', LOADED);
        await expect(errors).toContainText('Row 3: is missing an @id');
        // The errors are listed on the import page, not in a modal.
        await expect(modal(page)).toHaveCount(0);
        await button(errors, 'start over').click();
        await expect(page.locator('#drag-and-drop')).toBeVisible();
    });
});

test.describe('IMP-05 import CTDL-ASN / ASN / CASE files @P1', () => {
    test('IMP-05 CTDL-ASN CSV @P1', async ({ app, page, account }, testInfo) => {
        const name = unique('CTDL-ASN CSV');
        const prefix = unique('Row');
        const ids = { fw: newUuid(), c1: newUuid(), c2: newUuid(), c3: newUuid() };
        const url = (key) => `https://example.org/ce-${ids[key]}`;
        // Written without a trailing newline: see the known-bug test 'IMP-05 a CTDL-ASN CSV ending with a newline imports'.
        const file = writeFixture(testInfo, 'ctdlasn.csv', fromTemplate('ctdlasn.csv', { ...ids, name, prefix }).trimEnd());
        await openImport(app, page, account, 'File Import');
        await uploadFile(page, file);
        // The detected format name is not shown: see the known-bug test 'IMP-05 the detected format is shown'.
        await expect(page.locator('#import-status')).toContainText('Import 1 frameworks and 3 competencies.');
        await button(page.locator('#import-from-file'), 'Import').click();

        await expect(status(page).getByText('Import success, 3 competencies ready to edit.')).toBeVisible({ timeout: 60_000 });
        await expect(preview(page).getByText(name).first()).toBeVisible(LOADED);
        await expect(node(preview(page), url('c2'), url('c1'))).toBeVisible();
        await expect(node(preview(page), url('c3'))).toBeVisible();

        const framework = await app.fetchObject(url('fw'));
        expect(textOf(framework.name)).toBe(name);
        expect([...framework.competency].sort()).toEqual([url('c1'), url('c2'), url('c3')].sort());
        expect(await relationsOf(app, framework)).toEqual([`${url('c2')} -> ${url('c1')} (narrows)`]);
        expect(textOf((await app.fetchObject(url('c2'))).name)).toBe(`${prefix} Child`);
    });

    test('IMP-05 a CTDL-ASN CSV ending with a newline imports (known bug: the empty last line is reported as a row without @id/@type) @P1', async ({ app, page, account }, testInfo) => {
        test.fail(true, 'cassproject CTDLASNCSVImport parses without skipEmptyLines, so the empty line after the last row fails the import; see e2e/FINDINGS.md');
        const name = unique('CTDL-ASN CSV newline');
        const ids = { fw: newUuid(), c1: newUuid(), c2: newUuid(), c3: newUuid() };
        // As spreadsheet tools write them: the last row ends with a newline.
        const file = writeFixture(testInfo, 'ctdlasn.csv', `${fromTemplate('ctdlasn.csv', { ...ids, name, prefix: unique('Row') }).trimEnd()}\n`);
        await openImport(app, page, account, 'File Import');
        await uploadFile(page, file);
        await expect(page.locator('#import-status')).toContainText('Import 1 frameworks and 3 competencies.');
        await button(page.locator('#import-from-file'), 'Import').click();

        // Wait for the outcome (success or the error list), then check it was a success.
        const success = status(page).getByText('Import success, 3 competencies ready to edit.');
        const errors = page.locator('.import-errors-container');
        await expect(success.or(errors).first()).toBeVisible(LOADED);
        await expect(errors).toHaveCount(0);
        await expect(success).toBeVisible();
    });

    test('IMP-05 CTDL-ASN JSON-LD @P1', async ({ app, page, account }, testInfo) => {
        const name = unique('CTDL-ASN JSON-LD');
        const source = ctdlAsnGraph(name);
        const file = writeFixture(testInfo, 'framework.json', source.graph);
        await openImport(app, page, account, 'File Import');
        await uploadFile(page, file);
        // The detected format name is not shown: see the known-bug test 'IMP-05 the detected format is shown'.
        await expect(page.locator('#import-status')).toContainText('1 Framework and 4 Competencies Detected.');
        await button(page.locator('#import-from-file'), 'Import').click();

        await expect(status(page).getByText('Import success, 4 competencies ready to edit.')).toBeVisible({ timeout: 60_000 });
        await expectHierarchy(preview(page), source, name);
        await expectStoredGraph(app, source, name, await app.publicKey());
    });

    test('IMP-05 the detected format is shown (known bug: only the counts are shown) @P1', async ({ app, page, account }, testInfo) => {
        test.fail(true, 'File Import reports only counts ("1 Framework and 4 Competencies Detected."), not the detected format; see e2e/FINDINGS.md');
        const file = writeFixture(testInfo, 'framework.json', ctdlAsnGraph(unique('Detected format')).graph);
        await openImport(app, page, account, 'File Import');
        await uploadFile(page, file);
        await expect(page.locator('#import-status')).toContainText('1 Framework and 4 Competencies Detected.');
        await expect(page.locator('#import-status')).toContainText(/CTDL-ASN/i, { timeout: 5_000 });
    });

    test('IMP-05 ASN JSON @P1', async ({ app, page, account }, testInfo) => {
        const name = unique('ASN import');
        const prefix = unique('ASN');
        const id = newUuid();
        const asn = (key) => `https://example.org/asn/${id}/${key}`;
        const file = writeFixture(testInfo, 'asn.json', fromTemplate('asn.json', { id, name, prefix }));
        await openImport(app, page, account, 'File Import');
        await uploadFile(page, file);
        await expect(page.locator('#import-status')).toContainText('1 Framework and 4 Competencies Detected.');
        await button(page.locator('#import-from-file'), 'Import').click();

        await expect(status(page).getByText('Import success, 4 competencies ready to edit.')).toBeVisible({ timeout: 60_000 });
        await expect(preview(page).getByText(name).first()).toBeVisible(LOADED);
        await expect(node(preview(page), asn('ChildOne'), asn('Parent'))).toBeVisible();
        await expect(node(preview(page), asn('ChildTwo'), asn('Parent'))).toBeVisible();
        await expect(node(preview(page), asn('Sibling'))).toBeVisible();

        const framework = await app.fetchObject(asn('Doc'));
        expect(textOf(framework.name)).toBe(name);
        expect([...framework.competency].sort()).toEqual(['Parent', 'ChildOne', 'ChildTwo', 'Sibling'].map(asn).sort());
        expect(await relationsOf(app, framework)).toEqual([
            `${asn('ChildOne')} -> ${asn('Parent')} (narrows)`,
            `${asn('ChildTwo')} -> ${asn('Parent')} (narrows)`,
        ].sort());
        expect(framework.owner).toContain(await app.publicKey());
    });

    test('IMP-05 a CASE JSON file is rejected with a clear message @P1', async ({ app, page, account }, testInfo) => {
        const values = { doc: newUuid(), item1: newUuid(), item2: newUuid(), assoc: newUuid(), name: unique('CASE file'), prefix: 'CASE' };
        const file = writeFixture(testInfo, 'case.json', fromTemplate('case-package.json', values));
        await openImport(app, page, account, 'File Import');
        await uploadFile(page, file);
        // CASE frameworks import from a CASE server only (IMP-07); a CASE file is rejected on the import page.
        const errors = page.locator('.import-errors-container');
        await expect(errors).toContainText('1 error(s) found');
        await expect(errors).toContainText('Could not find StandardDocument.');
        await expect(preview(page)).toHaveCount(0);
        expect(await search(page, `@type:Framework AND name:"${values.name}"`), 'frameworks saved from the CASE file').toEqual([]);
    });
});

test('IMP-06 paste text builds a framework @P2', async ({ app, page, account }) => {
    const name = unique('Text import');
    const prefix = unique('Text');
    const text = [`${prefix} Parent`, ` ${prefix} Child one`, ` ${prefix} Child two`, `${prefix} Sibling`].join('\n');
    await openImport(app, page, account, 'Paste Text');
    const importButton = page.locator('#import-from-text').getByRole('button', { name: /^\s*import\s*$/ });
    await expect(importButton).toBeDisabled();
    await page.getByPlaceholder('Framework Name').fill(name);
    await page.getByPlaceholder('Start typing or paste your text here...').fill(text);

    // Live preview.
    await expect(status(page)).toContainText('4 competencies and 2 relations.', LOADED);
    // The export / import again / view in editor buttons are missing here: see the known-bug test 'IMP-06 the text preview offers ...'.
    for (const line of text.split('\n')) await expect(light(page).getByText(line.trim()).first()).toBeVisible(LOADED);
    await expect(light(page).getByText(name).first()).toBeVisible();

    await expect(importButton).toBeEnabled();
    await importButton.click();
    await expect(page).toHaveURL(/#\/framework\//, { timeout: 60_000 });
    const id = decodeURIComponent(page.url().split('#/framework/')[1].split('?')[0]);
    await expect(page.getByText(`${prefix} Child two`).first()).toBeVisible(LOADED);

    const framework = await app.fetchObject(id);
    expect(textOf(framework.name)).toBe(name);
    expect(framework.competency).toHaveLength(4);
    expect(framework.owner).toContain(await app.publicKey());
    const competencies = await Promise.all(framework.competency.map((c) => app.fetchObject(c)));
    const byName = Object.fromEntries(competencies.map((c) => [textOf(c.name).trim(), shortId(c['@id'])]));
    expect(await relationsOf(app, framework)).toEqual([
        `${byName[`${prefix} Child one`]} -> ${byName[`${prefix} Parent`]} (narrows)`,
        `${byName[`${prefix} Child two`]} -> ${byName[`${prefix} Parent`]} (narrows)`,
    ].sort());
});

test('IMP-06 the text preview offers export, import again and view in editor (known bug: the buttons never appear) @P2', async ({ app, page, account }) => {
    test.fail(true, 'Paste Text reports "<n> competencies and <m> relations." but Hierarchy.vue shows these buttons only for the status "Competency detected"; see e2e/FINDINGS.md');
    const prefix = unique('Text buttons');
    await openImport(app, page, account, 'Paste Text');
    await page.getByPlaceholder('Framework Name').fill(unique('Text buttons framework'));
    await page.getByPlaceholder('Start typing or paste your text here...').fill([`${prefix} Parent`, ` ${prefix} Child`].join('\n'));
    await expect(status(page)).toContainText('2 competencies and 1 relations.', LOADED);
    await expect(light(page).getByText(`${prefix} Child`).first()).toBeVisible(LOADED);
    for (const label of ['Export', 'import again', 'view in editor']) {
        await expect(button(light(page), label), label).toBeVisible({ timeout: 5_000 });
    }
});

test.describe('IMP-07 remote server import @P2', () => {
    const REMOTE = 'http://remote-cass.test/api/';

    /** Seeds a framework owned by someone else, lists it on the fake remote server and imports it alone. */
    async function importOneRemote(app, page, account) {
        await app.login(account, '/import');
        // A framework on the "remote" server, owned by someone else.
        const name = unique('Remote framework');
        const seeded = await app.seedFramework({ name, competencies: ['Remote A', { name: 'Remote B', children: ['Remote B.1'] }], foreign: true });
        await waitIndexed(app, seeded.id);
        await offline(page);
        await proxyCass(page, REMOTE, CASS_URL);
        const remoteId = (id) => remoteIdOf(id, REMOTE, CASS_URL);

        await chooseTab(page, 'Remote Server');
        await page.locator('.remote-server input[type=url]').fill(REMOTE);
        await page.getByRole('button', { name: /connect to CaSS endpoint/i }).click();
        await expect(page.getByText('Found Frameworks')).toBeVisible({ timeout: 60_000 });
        await expect(status(page)).toContainText(/\d+ frameworks detected\./);
        const list = page.locator('.cass__import--frameworks select[multiple]');
        // Options are versioned ids.
        const option = list.locator(`option[value^="${remoteId(seeded.id)}"]`);
        await expect(option).toHaveCount(1);
        await expect(option).toHaveText(name);
        await list.selectOption(await option.getAttribute('value'));
        await button(page.locator('.cass__import--cass'), 'Import').click();
        await expect.poll(() => app.fetchObject(remoteId(seeded.id)), { timeout: 60_000 }).not.toBeNull();
        return { name, seeded, remoteId };
    }

    test('IMP-07 frameworks copy from another CaSS server @P2', async ({ app, page, account }) => {
        // The preview / completion screen is missing: see the known-bug test 'IMP-07 importing one framework shows its preview'.
        const { name, seeded, remoteId } = await importOneRemote(app, page, account);

        // A copy under the remote ids, now owned by the user; the original is untouched.
        const copy = await app.fetchObject(remoteId(seeded.id));
        expect(textOf(copy.name)).toBe(name);
        expect(copy.owner).toEqual([await app.publicKey()]);
        expect([...copy.competency].sort()).toEqual(Object.values(seeded.competencies).map(remoteId).sort());
        expect(await relationsOf(app, copy)).toEqual([`${remoteId(seeded.competencies['Remote B.1'])} -> ${remoteId(seeded.competencies['Remote B'])} (narrows)`]);
        const competency = await app.fetchObject(remoteId(seeded.competencies['Remote B.1']));
        expect(textOf(competency.name)).toBe('Remote B.1');
        expect((await app.fetchObject(seeded.id)).owner).toEqual([seeded.ownerPem]);
    });

    test('IMP-07 importing one framework shows its preview (known bug: the import ends on the frameworks list) @P2', async ({ app, page, account }) => {
        test.fail(true, 'ImportServer.vue watchers clear the selection while importing, so a single selected framework never reaches importSuccess and no preview is shown; see e2e/FINDINGS.md');
        const { name, seeded, remoteId } = await importOneRemote(app, page, account);
        // The copy is saved; the preview of it should follow.
        await expect(preview(page).getByText(name).first()).toBeVisible({ timeout: 30_000 });
        await expect(node(preview(page), remoteId(seeded.competencies['Remote B.1']), remoteId(seeded.competencies['Remote B']))).toBeVisible();
    });

    test('IMP-07 a CASE server lists its frameworks @P2', async ({ app, page, account }) => {
        const endpoint = 'http://case.example.test/';
        const doc = { identifier: newUuid(), title: unique('CASE framework') };
        doc.uri = `${endpoint}uri/${doc.identifier}`;
        await openImport(app, page, account, 'Remote Server');
        await serveJson(page, `${endpoint}ims/case/v1p0/CFDocuments**`, (url) => ({
            CFDocuments: url.searchParams.get('offset') === '0' ? [{ ...doc, CFPackageURI: { identifier: doc.identifier } }] : [],
        }));
        let harvest = null;
        await page.route('**/ims/case/harvest**', (route) => {
            harvest = new URL(route.request().url());
            // The CaSS server harvests the CASE server itself (and fetches schema.cassproject.org): not possible offline.
            return route.fulfill({ status: 503, body: 'not available in tests' });
        });

        await page.locator('.remote-server input[type=url]').fill(endpoint);
        await page.getByRole('button', { name: /connect to CASE endpoint/i }).click();
        await expect(status(page)).toContainText('1 frameworks detected.', { timeout: 30_000 });
        await expect(page.getByText(doc.title)).toBeVisible();
        await page.getByText(doc.title).click(); // The label checks the box.
        await button(page.locator('#import-from-server'), 'Import').click();
        await expect.poll(() => harvest?.searchParams.get('dId')).toBe(doc.identifier);
        expect(harvest.searchParams.get('caseEndpoint')).toBe(endpoint);
    });
});

test.describe('IMP-08 cancel / import again @P2', () => {
    test('IMP-08 import again resets the URL import @P2', async ({ app, page, account }) => {
        test.slow(); // Two full imports against the shared server.
        const first = ctdlAsnGraph(unique('First import'), 'First');
        const second = ctdlAsnGraph(unique('Second import'), 'Second');
        const url1 = `https://example.org/ctdlasn/graph/${newUuid()}`;
        const url2 = `https://example.org/ctdlasn/graph/${newUuid()}`;
        await openImport(app, page, account, 'URL Source');
        await serveJson(page, url1, first.graph);
        await serveJson(page, url2, second.graph);
        await importUrl(page, url1);
        await expect(status(page).getByText('Processed, ready to edit')).toBeVisible({ timeout: 60_000 });
        await previewAction(page, 'done editing');
        await button(actions(light(page)), 'import again').click();

        await expect(urlInput(page)).toBeVisible();
        await expect(status(page).getByText('Ready', { exact: true })).toBeVisible();
        await expect(light(page)).toHaveCount(0);
        await expect(preview(page)).toHaveCount(0);

        await importUrl(page, url2);
        await expect(status(page).getByText('Processed, ready to edit')).toBeVisible({ timeout: 60_000 });
        await expectHierarchy(preview(page), second, textOf(second.graph['@graph'][0]['ceasn:name']));
        await expect(page.locator('#import').getByText(/^First /)).toHaveCount(0);
        // The first import was kept.
        expect(await app.fetchObject(first.frameworkId)).not.toBeNull();
    });

    test('IMP-08 cancel in the preview discards the import @P2', async ({ app, page, account }) => {
        test.slow(); // Two full imports against the shared server.
        const first = ctdlAsnGraph(unique('Cancelled import'), 'Cancelled');
        const second = ctdlAsnGraph(unique('Next import'), 'Next');
        const url1 = `https://example.org/ctdlasn/graph/${newUuid()}`;
        const url2 = `https://example.org/ctdlasn/graph/${newUuid()}`;
        await openImport(app, page, account, 'URL Source');
        await serveJson(page, url1, first.graph);
        await serveJson(page, url2, second.graph);
        await importUrl(page, url1);
        await expect(status(page).getByText('Processed, ready to edit')).toBeVisible({ timeout: 60_000 });
        await previewAction(page, 'Cancel');

        await expect(urlInput(page)).toBeVisible();
        await expect(preview(page)).toHaveCount(0);
        await expect.poll(() => app.fetchObject(first.frameworkId), { timeout: 20_000 }).toBeNull();

        await importUrl(page, url2);
        await expect(status(page).getByText('Processed, ready to edit')).toBeVisible({ timeout: 60_000 });
        await expectHierarchy(preview(page), second, textOf(second.graph['@graph'][0]['ceasn:name']));
        await expect(page.locator('#import').getByText(/^Cancelled /)).toHaveCount(0);
    });

    test('IMP-08 cancel before importing a file resets the column mapping @P2', async ({ app, page, account }, testInfo) => {
        const first = writeFixture(testInfo, 'first.csv', fromTemplate('competencies.csv', { prefix: 'First', code: `e2e-${newUuid()}` }));
        const second = writeFixture(testInfo, 'second.csv', fromTemplate('other-columns.csv', { prefix: 'Second' }));
        await openImport(app, page, account, 'File Import');
        await uploadFile(page, first);
        await expect(page.locator('#import-status')).toContainText('3 Competencies Detected.');
        await button(page.locator('#import-from-file'), 'Cancel').click();
        await expect(page.locator('#drag-and-drop')).toBeVisible();
        await expect(page.locator('.csv-input')).toHaveCount(0);

        await uploadFile(page, second);
        await expect(page.locator('#import-status')).toContainText('1 Competencies Detected.');
        // Only the second file's columns are offered: nothing is left of the cancelled file's.
        for (const label of ['Select the Name column', 'Select the Description column', 'Select the ID column']) {
            const options = page.locator('.csv-input .field', { hasText: label }).locator('select option');
            await expect(options, label).toHaveText([/^\s*N\/A\s*$/, /^\s*Ability\s*$/, /^\s*Notes\s*$/]);
        }
        await expect(page.locator('.csv-input input').first()).toHaveValue('second');
    });
});
