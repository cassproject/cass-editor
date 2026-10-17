// TEST-CASES.md §3 Framework viewing & editing (FW-01 … FW-11).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test, expect, unique, problems } from '../support/fixtures.js';

// ---------------------------------------------------------------------------------------------
// Locators and helpers for the framework editor.
// ---------------------------------------------------------------------------------------------

const newButton = (page) => page.getByText(/^\s*new\s*$/i);
/** The hierarchy row of a competency (its own row, not its children's). */
const nodeRow = (page, id) => page.locator(`li[id="${id}"] > .lode__hierarchy-item`);
/** The children list of a competency. */
const childList = (page, id) => page.locator(`li[id="${id}"] > div > ul.lode__hierarchy-sub-ul`);
/** The edit modal (ThingEditing) that is open, for the framework or a competency. */
const editor = (page) => page.locator('.lode__thing-editing.is-active');
const frameworkHeader = (page) => page.locator('#framework_drag');
const hierarchyButtons = (page) => page.locator('.lode__hierarchy .hierarchy-buttons');
const itemCount = (page) => page.locator('.lode__framework__info-bar');
const toolbar = (page) => page.locator('#framework-editor-toolbar');
/** An open ModalTemplate dialog, by its title. */
const dialog = (page, title) => page.locator('.cass-editor___modal.is-active').filter({ has: page.locator('.modal-card-title', { hasText: title }) });
/** A property (label + values) in a thing or its edit modal, by its label. */
const propertyField = (scope, label) => scope.locator('.lode__Property').filter({
    has: scope.page().locator('label', { hasText: new RegExp(`^\\s*${label}\\*?\\s*$`) }),
});

/** Plain text of a CaSS (lang)string value, which may be a string, a {@value} or an array of them. */
const text = (v) => {
    if (v == null) return v;
    if (Array.isArray(v)) return v.map(text).join('|');
    if (typeof v === 'object') return v['@value'];
    return v;
};

async function frameworkLoaded(page, fw) {
    // A (re)load fetches the framework view's modules from the dev server and the framework from
    // CaSS: allow as long as a navigation.
    await expect(frameworkHeader(page).getByText(fw.name).first()).toBeVisible({ timeout: 90_000 });
    // The hierarchy shows placeholder rows until its nodes have loaded.
    await expect(page.locator('#framework .processing-list')).toHaveCount(0, { timeout: 90_000 });
}

/**
 * Opens a framework for editing by navigating inside the loaded, logged-in editor, as a user does
 * from the list: after a deep link the editor computes edit rights before the saved login loads,
 * so the owner may get no edit controls (known limitation, see e2e/FINDINGS.md).
 */
async function openFramework(app, page, fw) {
    await expect.poll(() => page.evaluate(() => EcIdentityManager.default.ids.length)).toBeGreaterThan(0);
    await page.evaluate((id) => window.app.$router.push({ name: 'framework', params: { frameworkId: id } }), fw.id);
    await frameworkLoaded(page, fw);
}

/** Reloads the framework from CaSS through a deep link, to check what was saved (view only). */
async function reloadFramework(app, page, fw) {
    await app.open('/framework', { frameworkId: fw.id });
    await frameworkLoaded(page, fw);
}

async function editCompetency(page, id) {
    const row = nodeRow(page, id);
    await expect(row).toBeVisible();
    await row.hover();
    await row.locator('.edit-button').first().click();
    await expect(editor(page)).toBeVisible();
    await expect(editor(page)).toContainText('Edit Competency');
}

async function editFramework(page) {
    const header = frameworkHeader(page);
    await header.hover();
    await header.locator('.edit-button').first().click();
    await expect(editor(page)).toBeVisible();
}

/** Creating a framework or competency saves it to CaSS before its edit modal opens. */
const CREATE_TIMEOUT = 60_000;

/** Types into the editor's name textarea (the first one) and blurs it, which saves. */
async function setName(page, name) {
    const box = editor(page).locator('textarea').first();
    await box.fill(name);
    await box.press('Tab');
}

async function done(page) {
    await editor(page).getByText('done', { exact: true }).click();
    await expect(editor(page)).toHaveCount(0);
}

/** In an edit modal (or the Edit Multiple modal): Add property → pick label → type value. */
async function addTextProperty(scope, label, value) {
    await scope.locator('.property-button').filter({ has: scope.page().getByText(label, { exact: true }) }).first().click();
    const box = scope.locator('.add-property-field textarea').first();
    await box.fill(value);
    await box.press('Tab');
}

async function check(page, id) {
    await page.locator(`label[for="${id}checkbox"]`).click();
    await expect(page.locator(`input[id="${id}checkbox"]`)).toBeChecked();
}

/** Adds a relation (source relationType target) to a framework the logged-in user owns. */
async function seedRelation(page, frameworkId, source, target, relationType) {
    await page.evaluate(async ({ frameworkId, source, target, relationType }) => {
        const f = await EcFramework.get(frameworkId);
        const r = new EcAlignment();
        r.generateId(repo.selectedServer);
        r.source = source;
        r.target = target;
        r.relationType = relationType;
        r.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
        f.addRelation(r.shortId());
        await repo.multiput([r, f]);
    }, { frameworkId, source, target, relationType });
}

/** Texts of the comments CaSS has on a framework (sorted). */
const storedComments = (page, frameworkId) => page.evaluate(async (id) => {
    const found = await EcComment.search(repo, `isBasedOn:"${id}"`, null, null, { size: 100 });
    return found.map((c) => c.text).sort();
}, frameworkId);

/** framework.competency as an array. */
const competenciesOf = async (app, id) => [].concat((await app.fetchObject(id))?.competency ?? []);

/**
 * The editor loads type schemas straight from https://schema.cassproject.org/ (Thing.vue loadSchema)
 * and JSON-LD contexts from the dev server's copy of that site (public/schema.cassproject.org, a
 * submodule; see stores/lode.js documentLoader). There is no internet here, and a request that hangs
 * leaves the framework unrendered, so both are answered from that copy on disk (which also keeps
 * them out of the shared, busy dev server's queue); any other external request fails fast.
 */
const SCHEMA_SITE = fileURLToPath(new URL('../../public/schema.cassproject.org/', import.meta.url));
const isExternal = (url) => /^https?:$/.test(url.protocol) && !['localhost', '127.0.0.1'].includes(url.hostname);
const isLocalSchema = (url) => !isExternal(url) && url.pathname.startsWith('/schema.cassproject.org/');
async function serveSchemasLocally(page) {
    await page.route((url) => isExternal(url) || isLocalSchema(url), async (route) => {
        const url = new URL(route.request().url());
        if (isExternal(url) && url.hostname !== 'schema.cassproject.org') return route.abort('internetdisconnected');
        const rel = decodeURIComponent(url.pathname).replace(/^\/schema\.cassproject\.org\//, '/').replace(/^\/+|\/+$/g, '');
        const candidates = [path.join(SCHEMA_SITE, rel, 'index.json-ld'), path.join(SCHEMA_SITE, rel)];
        const file = candidates.find((f) => f.startsWith(SCHEMA_SITE) && fs.existsSync(f) && fs.statSync(f).isFile());
        if (!file) return route.fulfill({ status: 404, body: '' });
        return route.fulfill({ status: 200, path: file, contentType: 'application/ld+json', headers: { 'Access-Control-Allow-Origin': '*' } });
    });
}

// ---------------------------------------------------------------------------------------------

test.beforeEach(async ({ page }) => {
    await serveSchemasLocally(page);
});

test.describe('Framework viewing & editing', () => {
    test('FW-01 create framework @P0', async ({ app, page, account }) => {
        await app.login(account);
        await newButton(page).first().click();
        await page.locator('.dropdown-item', { hasText: /^\s*Framework\s*$/ }).click();
        await expect(page).toHaveURL(/#\/framework/);
        await expect(editor(page)).toContainText('Create framework', { timeout: CREATE_TIMEOUT });
        await expect(editor(page).locator('textarea').first()).toHaveValue('New Framework');
        // Auto-saved: the chip in the header says when.
        await expect(editor(page).locator('.modal-card-head .tag')).toContainText(/last saved/i);

        const id = await page.evaluate(() => window.app.$pinia._s.get('editor').framework.shortId());
        await expect.poll(() => app.fetchObject(id)).not.toBeNull();
        const saved = await app.fetchObject(id);
        expect(text(saved.name)).toBe('New Framework');
        expect(saved.owner).toContain(await app.publicKey());

        // Leave a recognisable name on the shared server rather than another "New Framework".
        await setName(page, unique('FW-01 created'));
        await done(page);
    });

    test.describe('FW-02 rename framework / edit description @P0', () => {
        test('in the create editor', async ({ app, page, account }) => {
            await app.login(account);
            await newButton(page).first().click();
            await page.locator('.dropdown-item', { hasText: /^\s*Framework\s*$/ }).click();
            await expect(editor(page)).toContainText('Create framework', { timeout: CREATE_TIMEOUT });
            const id = await page.evaluate(() => window.app.$pinia._s.get('editor').framework.shortId());

            const name = unique('FW-02 renamed');
            const description = unique('FW-02 description');
            await setName(page, name);
            await editor(page).getByText('Add property', { exact: true }).click();
            await addTextProperty(editor(page), 'Description', description);
            await editor(page).getByText('save property', { exact: true }).click();
            await expect(propertyField(editor(page), 'Description').locator('textarea').first()).toHaveValue(description);
            await done(page);

            await expect(frameworkHeader(page).getByText(name).first()).toBeVisible();
            await expect(frameworkHeader(page).getByText(description).first()).toBeVisible();
            await expect.poll(async () => text((await app.fetchObject(id))?.name)).toBe(name);
            await expect.poll(async () => text((await app.fetchObject(id))?.description)).toBe(description);

            await page.reload();
            await app.ready();
            await expect(frameworkHeader(page).getByText(name).first()).toBeVisible({ timeout: 60_000 });
            await expect(frameworkHeader(page).getByText(description).first()).toBeVisible();
        });

        test('via the edit pencil on an existing framework', async ({ app, page, account }) => {
            await app.login(account);
            const fw = await app.seedFramework({ name: unique('FW-02 existing'), description: 'Old description', competencies: ['Only'] });
            await openFramework(app, page, fw);
            await editFramework(page);
            await expect(editor(page)).toContainText('Edit Framework');

            const name = unique('FW-02 renamed existing');
            const description = unique('FW-02 new description');
            await setName(page, name);
            const descriptionBox = propertyField(editor(page), 'Description').locator('textarea').first();
            await expect(descriptionBox).toHaveValue('Old description');
            await descriptionBox.fill(description);
            await descriptionBox.press('Tab');
            await done(page);

            await expect(frameworkHeader(page).getByText(name).first()).toBeVisible();
            await expect(frameworkHeader(page).getByText(description).first()).toBeVisible();
            await expect.poll(async () => text((await app.fetchObject(fw.id))?.name)).toBe(name);
            await expect.poll(async () => text((await app.fetchObject(fw.id))?.description)).toBe(description);

            await page.reload();
            await app.ready();
            await expect(frameworkHeader(page).getByText(name).first()).toBeVisible({ timeout: 60_000 });
            await expect(frameworkHeader(page).getByText(description).first()).toBeVisible();
        });
    });

    test('FW-03 add a top-level competency @P0', async ({ app, page, account }) => {
        await app.login(account);
        const fw = await app.seedFramework({ name: unique('FW-03'), competencies: ['Existing'] });
        await openFramework(app, page, fw);
        await expect(itemCount(page)).toContainText('1 item');

        await hierarchyButtons(page).getByText('Add', { exact: true }).click();
        await hierarchyButtons(page).getByText('create new', { exact: true }).click();
        await expect(editor(page)).toBeVisible({ timeout: CREATE_TIMEOUT });
        const name = unique('FW-03 new competency');
        await setName(page, name);
        await done(page);

        await expect(page.locator('.lode__hierarchy').getByText(name).first()).toBeVisible();
        await expect(itemCount(page)).toContainText('2 items');
        await expect.poll(async () => (await competenciesOf(app, fw.id)).length).toBe(2);
        const newId = (await competenciesOf(app, fw.id)).find((id) => id !== fw.competencies.Existing);
        await expect.poll(async () => text((await app.fetchObject(newId))?.name)).toBe(name);
        // Top level: no "narrows" relation from the new competency.
        const relations = await Promise.all([].concat((await app.fetchObject(fw.id)).relation ?? []).map((r) => app.fetchObject(r)));
        expect(relations.filter((r) => r && r.source === newId)).toEqual([]);

        await reloadFramework(app, page, fw);
        await expect(nodeRow(page, newId)).toContainText(name);
        await expect(itemCount(page)).toContainText('2 items');
    });

    test('FW-04 add a child competency @P1', async ({ app, page, account }) => {
        await app.login(account);
        const fw = await app.seedFramework({ name: unique('FW-04'), competencies: ['Parent', 'Sibling'] });
        const parent = fw.competencies.Parent;
        await openFramework(app, page, fw);

        await check(page, parent);
        await hierarchyButtons(page).getByText('Add Child', { exact: true }).click();
        await hierarchyButtons(page).getByText('create new', { exact: true }).click();
        await expect(editor(page)).toBeVisible({ timeout: CREATE_TIMEOUT });
        const name = unique('FW-04 child');
        await setName(page, name);
        await done(page);

        // Rendered under the parent.
        const child = childList(page, parent).locator(':scope > li');
        await expect(child).toHaveCount(1);
        await expect(child).toContainText(name);
        const childId = await child.getAttribute('id');
        await expect.poll(async () => (await competenciesOf(app, fw.id)).includes(childId)).toBe(true);
        await expect.poll(async () => {
            const f = await app.fetchObject(fw.id);
            const relations = await Promise.all([].concat(f.relation ?? []).map((r) => app.fetchObject(r)));
            return relations.some((r) => r && r.source === childId && r.target === parent && r.relationType === 'narrows');
        }).toBe(true);

        // Indented: the child's row starts to the right of its parent's.
        const parentBox = await nodeRow(page, parent).locator('.lode__thing').first().boundingBox();
        const childBox = await nodeRow(page, childId).locator('.lode__thing').first().boundingBox();
        expect(childBox.x).toBeGreaterThan(parentBox.x);

        // The caret collapses and expands the parent.
        const caret = nodeRow(page, parent).locator('.expand-column .icon');
        await expect(caret.locator('.fa-caret-down')).toBeVisible();
        await caret.click();
        await expect(caret.locator('.fa-caret-right')).toBeVisible();
        await expect(page.getByText(name)).toHaveCount(0);
        await caret.click();
        await expect(caret.locator('.fa-caret-down')).toBeVisible();
        await expect(nodeRow(page, childId)).toContainText(name);

        // Persists after reload.
        await reloadFramework(app, page, fw);
        await expect(childList(page, parent).locator(`li[id="${childId}"]`)).toContainText(name);
    });

    test.describe('FW-05 edit competency properties @P0', () => {
        // Each case opens the framework, edits through the modal (twice for update+delete), waits
        // for every save in CaSS and reloads: the longest flows in this file.
        test.beforeEach(() => { test.slow(); });

        test('rename and add a description', async ({ app, page, account, console }) => {
            await app.login(account);
            const fw = await app.seedFramework({ name: unique('FW-05'), competencies: ['Before rename'] });
            const id = fw.competencies['Before rename'];
            await openFramework(app, page, fw);

            await editCompetency(page, id);
            const name = unique('FW-05 renamed');
            const description = unique('FW-05 description');
            await setName(page, name);
            await editor(page).getByText('Add property', { exact: true }).click();
            await addTextProperty(editor(page), 'Description', description);
            await editor(page).getByText('save property', { exact: true }).click();
            await expect(editor(page).getByText('Add property', { exact: true })).toBeVisible();
            await done(page);

            await expect(nodeRow(page, id)).toContainText(name);
            await expect(nodeRow(page, id)).toContainText(description);
            await expect.poll(async () => text((await app.fetchObject(id))?.name)).toBe(name);
            await expect.poll(async () => text((await app.fetchObject(id))?.description)).toBe(description);

            await reloadFramework(app, page, fw);
            await expect(nodeRow(page, id)).toContainText(name);
            await expect(nodeRow(page, id)).toContainText(description);
            expect(problems(console)).toEqual([]);
        });

        test('update and delete a property value', async ({ app, page, account, console }) => {
            await app.login(account);
            const fw = await app.seedFramework({ name: unique('FW-05 update'), competencies: [{ name: 'Described', description: 'Original description' }] });
            const id = fw.competencies.Described;
            await openFramework(app, page, fw);
            await expect(nodeRow(page, id)).toContainText('Original description');

            // Update.
            await editCompetency(page, id);
            const descriptionBox = propertyField(editor(page), 'Description').locator('textarea').first();
            await expect(descriptionBox).toHaveValue('Original description');
            await descriptionBox.fill('Updated description');
            await descriptionBox.press('Tab');
            await done(page);
            await expect(nodeRow(page, id)).toContainText('Updated description');
            await expect.poll(async () => text((await app.fetchObject(id))?.description)).toBe('Updated description');

            // Delete with the ✕ next to the value.
            await editCompetency(page, id);
            const descriptionProperty = propertyField(editor(page), 'Description');
            await expect(descriptionProperty.locator('textarea').first()).toHaveValue('Updated description');
            await descriptionProperty.locator('.has-text-danger .fa-times').first().click();
            await dialog(page, 'Confirm Remove Property').getByRole('button', { name: 'Confirm Remove Property' }).click();
            await expect(descriptionProperty).toHaveCount(0);
            await done(page);
            await expect(nodeRow(page, id)).not.toContainText('Updated description');
            await expect.poll(async () => text((await app.fetchObject(id))?.description) ?? '').toBe('');
            expect(text((await app.fetchObject(id)).name)).toBe('Described');

            await reloadFramework(app, page, fw);
            await expect(nodeRow(page, id)).toContainText('Described');
            await expect(nodeRow(page, id)).not.toContainText('Updated description');
            expect(problems(console)).toEqual([]);
        });
    });

    test('FW-06 delete a competency @P1', async ({ app, page, account }) => {
        await app.login(account);
        const fw = await app.seedFramework({ name: unique('FW-06'), competencies: ['Keep me', 'Delete me'] });
        const doomed = fw.competencies['Delete me'];
        // The confirmation counts the frameworks using the competency through a search.
        await app.waitIndexed(`@id:"${fw.id}"`);
        await openFramework(app, page, fw);

        await editCompetency(page, doomed);
        await editor(page).locator('[title="Delete this competency"]').click();
        const confirm = dialog(page, 'Confirm Delete Competency');
        await expect(confirm).toBeVisible();
        // Waiting for the count also keeps this case clear of the race covered by the known-bug test below.
        await expect(confirm).toContainText(/remove the competency from\s*1\s*frameworks/);
        await confirm.getByRole('button', { name: 'Delete Competency' }).click();

        await expect(page.locator(`li[id="${doomed}"]`)).toHaveCount(0);
        await expect(nodeRow(page, fw.competencies['Keep me'])).toBeVisible();
        await expect.poll(async () => (await competenciesOf(app, fw.id)).includes(doomed)).toBe(false);
        expect(await competenciesOf(app, fw.id)).toContain(fw.competencies['Keep me']);
        await expect.poll(() => app.fetchObject(doomed)).toBeNull();
    });

    test('FW-06 confirming the delete before the usage counts load deletes cleanly @P1', async ({ app, page, account, console: log }) => {
        await app.login(account);
        const fw = await app.seedFramework({ name: unique('FW-06 race'), competencies: ['Keep me', 'Delete me'] });
        const doomed = fw.competencies['Delete me'];
        await openFramework(app, page, fw);

        // Hold back the "frameworks using this competency" search until the user has confirmed, as
        // a slow server does.
        let release;
        const released = new Promise((resolve) => { release = resolve; });
        let held = false;
        await page.route(/\/sky\/repo\/search/, async (route) => {
            if (!(route.request().postData() ?? '').includes('@type:Framework AND competency:')) return route.fallback();
            held = true;
            await released;
            await route.fallback();
        });
        await editCompetency(page, doomed);
        await editor(page).locator('[title="Delete this competency"]').click();
        const confirm = dialog(page, 'Confirm Delete Competency');
        await expect(confirm).toBeVisible();
        await expect.poll(() => held).toBe(true);
        await confirm.getByRole('button', { name: 'Delete Competency' }).click();
        await expect(page.locator(`li[id="${doomed}"]`)).toHaveCount(0);
        // The late search result must not break the editor: no uncaught error within a few seconds
        // of it arriving (the bug throws as soon as its callback runs).
        const pageError = page.waitForEvent('pageerror', { timeout: 5_000 }).then((e) => e.message, () => null);
        release();
        expect(await pageError).toBeNull();
        expect(log.pageErrors).toEqual([]);
        await expect(nodeRow(page, fw.competencies['Keep me'])).toBeVisible();
        await expect.poll(async () => (await competenciesOf(app, fw.id)).includes(doomed)).toBe(false);
    });

    test('FW-07 delete a framework @P1', async ({ app, page, account }) => {
        await app.login(account);
        const fw = await app.seedFramework({ name: unique('FW-07'), competencies: ['Inside'] });
        await openFramework(app, page, fw);

        await editFramework(page);
        await editor(page).locator('[title="Delete this framework"]').click();
        const confirm = dialog(page, 'Confirm Delete Framework');
        await expect(confirm).toBeVisible();
        await expect(confirm).toContainText(fw.name);
        await confirm.getByRole('button', { name: 'Delete Framework' }).click();

        await expect(page).toHaveURL(/#\/frameworks/);
        await expect.poll(() => app.fetchObject(fw.id)).toBeNull();
        await expect(page.getByText(fw.name)).toHaveCount(0);
    });

    test('FW-08 undo a rename @P2', async ({ app, page, account }) => {
        await app.login(account);
        const fw = await app.seedFramework({ name: unique('FW-08'), competencies: ['Original name'] });
        const id = fw.competencies['Original name'];
        await openFramework(app, page, fw);

        await editCompetency(page, id);
        const name = unique('FW-08 renamed');
        await setName(page, name);
        await done(page);
        await expect(nodeRow(page, id)).toContainText(name);
        await expect.poll(async () => text((await app.fetchObject(id))?.name)).toBe(name);

        await toolbar(page).locator('[title="Undo recent change"]').click();
        await expect(nodeRow(page, id)).toContainText('Original name');
        await expect(nodeRow(page, id)).not.toContainText(name);
        await expect.poll(async () => text((await app.fetchObject(id))?.name)).toBe('Original name');
    });

    test('FW-09 property display tiers @P2', async ({ app, page, account }) => {
        await app.login(account);
        const fw = await app.seedFramework({
            name: unique('FW-09'),
            competencies: [{ name: 'Tier parent', description: 'Primary description', children: ['Tier child'] }, 'Tier sibling'],
        });
        // A "requires" relation: shown with the tertiary tier (the default profile lists relations there).
        await seedRelation(page, fw.id, fw.competencies['Tier sibling'], fw.competencies['Tier parent'], 'requires');
        await openFramework(app, page, fw);
        const ids = Object.values(fw.competencies);
        const sibling = nodeRow(page, fw.competencies['Tier sibling']);
        const tier = (label) => toolbar(page).locator('.button').filter({ hasText: label });

        // Primary: names and descriptions only; no URLs, no relations.
        await expect(tier('Primary')).toHaveClass(/has-text-primary/);
        await expect(nodeRow(page, fw.competencies['Tier parent'])).toContainText('Primary description');
        for (const id of ids) await expect(nodeRow(page, id).getByText(id)).toHaveCount(0);
        await expect(sibling).not.toContainText('Requires');

        // Secondary: every visible node (and the framework) also shows its URL.
        await tier('Secondary').click();
        await expect(tier('Secondary')).toHaveClass(/has-text-primary/);
        for (const id of ids) await expect(nodeRow(page, id).getByText(id).first()).toBeVisible();
        await expect(frameworkHeader(page).getByText(fw.id).first()).toBeVisible();
        await expect(sibling).not.toContainText('Requires');

        // Tertiary: relations as well.
        await tier('Tertiary').click();
        await expect(tier('Tertiary')).toHaveClass(/has-text-primary/);
        for (const id of ids) await expect(nodeRow(page, id).getByText(id).first()).toBeVisible();
        await expect(sibling).toContainText(/Requires\s*Tier parent/);

        // And back.
        await tier('Primary').click();
        await expect(tier('Primary')).toHaveClass(/has-text-primary/);
        for (const id of ids) await expect(nodeRow(page, id).getByText(id)).toHaveCount(0);
        await expect(sibling).not.toContainText('Requires');
        await expect(nodeRow(page, fw.competencies['Tier parent'])).toContainText('Primary description');
    });

    test('FW-10 multi-select and Edit Multiple @P1', async ({ app, page, account }) => {
        await app.login(account);
        const fw = await app.seedFramework({ name: unique('FW-10'), competencies: ['Multi one', 'Multi two', 'Multi untouched'] });
        const [one, two, untouched] = ['Multi one', 'Multi two', 'Multi untouched'].map((n) => fw.competencies[n]);
        await openFramework(app, page, fw);

        await check(page, one);
        await check(page, two);
        await hierarchyButtons(page).getByText('Edit multiple', { exact: true }).click();
        const modal = dialog(page, 'Edit Multiple Competencies');
        await expect(modal).toBeVisible();
        // Regression: the body renders the property editor, not a blank modal.
        await expect(modal.getByText('Adding property')).toBeVisible();
        const value = unique('FW-10 classification');
        await addTextProperty(modal, 'Classification', value);

        // The processing spinner replaces the body only briefly (the modal closes once the edits are
        // queued, before the saves finish), so record whether it was ever rendered.
        await page.evaluate(() => {
            window.__e2eSawMultiEditSpinner = false;
            const seen = () => [...document.querySelectorAll('.cass-editor___modal.is-active')]
                .some((m) => m.textContent.includes('Edit Multiple Competencies') && m.querySelector('.modal-card-body .fa-spinner'));
            new MutationObserver(() => { if (seen()) window.__e2eSawMultiEditSpinner = true; })
                .observe(document.body, { subtree: true, childList: true, attributes: true });
        });
        await modal.getByRole('button', { name: /Apply to multiple/i }).click();
        await expect(modal).toHaveCount(0);
        expect(await page.evaluate(() => window.__e2eSawMultiEditSpinner)).toBe(true);

        await expect(nodeRow(page, one)).toContainText(value);
        await expect(nodeRow(page, two)).toContainText(value);
        await expect(nodeRow(page, untouched)).not.toContainText(value);
        for (const id of [one, two]) {
            await expect.poll(async () => text((await app.fetchObject(id))?.['https://schema.cassproject.org/0.4/classification'] ?? (await app.fetchObject(id))?.classification)).toBe(value);
        }
        const other = await app.fetchObject(untouched);
        expect(JSON.stringify(other)).not.toContain(value);
    });

    test('FW-11 comments: add, reply, edit, delete @P2', async ({ app, page, account }) => {
        await app.login(account);
        // Comments are offered once the user's person record has loaded.
        await expect.poll(() => page.evaluate(() => window.app.$pinia._s.get('user').loggedOnPerson?.id ?? null)).not.toBeNull();
        const fw = await app.seedFramework({ name: unique('FW-11'), competencies: ['Commented'] });
        const id = fw.competencies.Commented;
        await openFramework(app, page, fw);

        // Add.
        const row = nodeRow(page, id);
        await expect(row).toBeVisible();
        await row.hover();
        await row.locator('.comment-button').click();
        let modal = dialog(page, 'New Comment');
        await expect(modal).toContainText('Commenting on');
        await expect(modal).toContainText('Commented');
        const first = unique('FW-11 first comment');
        await modal.locator('textarea').fill(first);
        await modal.getByRole('button', { name: 'Save comment' }).click();
        await expect(modal).toHaveCount(0);
        const sidebar = page.locator('#right-side-bar__comments');
        await expect(sidebar.getByText(first)).toBeVisible();
        const thread = sidebar.locator('.comment-list').filter({ hasText: first });

        // Reply.
        await thread.getByTitle('reply').click();
        modal = dialog(page, 'New Comment');
        await expect(modal).toContainText('Replying to comments about');
        const reply = unique('FW-11 reply');
        await modal.locator('textarea').fill(reply);
        await modal.getByRole('button', { name: 'Save comment' }).click();
        await expect(modal).toHaveCount(0);
        await expect(thread.getByText(reply)).toBeVisible();
        await expect.poll(() => storedComments(page, fw.id)).toEqual([first, reply].sort());

        // Edit the reply.
        const replyItem = thread.locator('.comment-list-item').filter({ hasText: reply }).last();
        await replyItem.locator('.dropdown-trigger button').click();
        const frameworkUrl = page.url();
        await replyItem.locator('.dropdown-item', { hasText: 'edit' }).click();
        modal = dialog(page, 'Edit Comment');
        await expect(modal.locator('textarea')).toHaveValue(reply);
        // Editing happens in place: the editor stays on the framework.
        expect(page.url()).toBe(frameworkUrl);
        await expect(frameworkHeader(page).getByText(fw.name).first()).toBeVisible();
        const edited = unique('FW-11 edited reply');
        await modal.locator('textarea').fill(edited);
        await modal.getByRole('button', { name: 'Save comment' }).click();
        await expect(modal).toHaveCount(0);
        await expect(thread.getByText(edited)).toBeVisible();
        await expect(thread.getByText(reply, { exact: true })).toHaveCount(0);
        await expect(thread).toContainText('*Edited');
        expect(page.url()).toBe(frameworkUrl);
        await expect(frameworkHeader(page).getByText(fw.name).first()).toBeVisible();
        await expect.poll(() => storedComments(page, fw.id)).toEqual([first, edited].sort());

        // Delete the reply: asks for confirmation; cancel keeps it, confirm removes it.
        const editedItem = thread.locator('.comment-list-item').filter({ hasText: edited }).last();
        await editedItem.locator('.dropdown-trigger button').click();
        await editedItem.locator('.dropdown-item', { hasText: 'delete' }).click();
        modal = dialog(page, /Delete comment/);
        await expect(modal).toContainText('Are you sure');
        await modal.getByRole('button', { name: 'Cancel' }).click();
        await expect(thread.getByText(edited)).toBeVisible();
        await editedItem.locator('.dropdown-trigger button').click();
        await editedItem.locator('.dropdown-item', { hasText: 'delete' }).click();
        await dialog(page, /Delete comment/).getByRole('button', { name: 'Confirm' }).click();
        await expect(sidebar.getByText(edited)).toHaveCount(0);
        await expect(sidebar.getByText(first)).toBeVisible();
        await expect.poll(() => storedComments(page, fw.id)).toEqual([first]);
    });
});
