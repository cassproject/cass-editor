// TEST-CASES.md §8 Taxonomies (concept schemes) & progression models (TAX-01, TAX-02, PROG-01).
import { test, expect, unique } from '../support/fixtures.js';
import {
    seedConceptScheme, stored, expectStored, langValue, idList,
    editor, nodeLi, nodeRow, uiTree, storedTree, dragNode, openScheme, renameInEditor, idFromRoute,
    consoleProblems as knownConsoleProblems,
} from '../support/taxonomies.js';

/**
 * APP BUG (reported): the concept / level hierarchies bind vuedraggable's v-model to a computed
 * property without a setter, so every drag logs this Vue warning (and a node moved up does not
 * land where dropped, see the "moving a ... up" known-bug tests).
 */
const READONLY_HIERARCHY_WARNING = /Write operation failed: computed property "hierarchy" is readonly/;

/** Console errors and Vue warnings minus the known ones (assertion sort; readonly hierarchy while dragging). */
const consoleProblems = (log, { dragging = false } = {}) => knownConsoleProblems(log)
    .filter((text) => !(dragging && READONLY_HIERARCHY_WARNING.test(text)));

const hierarchyButtons = (page) => page.locator('.lode__hierarchy .hierarchy-buttons');

/**
 * Adds a concept / level through "add …" -> "create new", renames it in the editor that opens and
 * returns its id. The new node opens as defaultLabel.
 */
async function addNode(page, label, { button, defaultLabel }) {
    await hierarchyButtons(page).getByText(button).click();
    await hierarchyButtons(page).getByText(/create new/i).click();
    await expect(editor(page).locator('textarea').first()).toHaveValue(defaultLabel);
    const id = await editor(page).evaluate((el) => el.closest('li[id]').id);
    // While it is new, the node is the scroll target and renders as a new thing.
    await expect(page.locator('#scroll-newCompetency')).toHaveCount(1);
    await renameInEditor(page, label);
    await expect(nodeRow(page, id).getByText(label, { exact: true })).toBeVisible();
    // "done" (HierarchyNode onDoneEditingNode) ends the new-node state: no scroll target, no
    // "new thing" rendering, and the store forgets the new node.
    await expect(page.locator('#scroll-newCompetency')).toHaveCount(0);
    await expect(nodeRow(page, id).locator('.new-thing')).toHaveCount(0);
    expect(await page.evaluate(() => window.app.$pinia._s.get('editor').newCompetency)).toBeNull();
    return id;
}

/** Tree of { id, children } -> tree of { name, children } for readable assertions. */
const named = (tree, names) => tree.map((n) => ({ name: names[n.id] ?? n.id, children: named(n.children, names) }));
const invert = (map) => Object.fromEntries(Object.entries(map).map(([k, v]) => [v, k]));
const leaf = (name) => ({ name, children: [] });

/**
 * Reloads the page until `shown` is visible: the hierarchy of a fresh page load occasionally
 * does not render at all (empty list), so reload again then.
 */
async function reloadUntil(page, app, shown) {
    await expect(async () => {
        await page.reload();
        await app.ready();
        await expect(shown).toBeVisible({ timeout: 20_000 });
    }).toPass({ timeout: 90_000 });
}

/**
 * Opens a scheme for dragging. The first visit of a scheme / model in a page session cannot be
 * dragged (APP BUG, see the "first visit" known-bug test), so this opens it, leaves and opens it
 * again.
 */
async function openForDragging(app, id, ids, route = 'conceptScheme') {
    const page = app.page;
    // The hierarchy occasionally fails to render on a navigation; go away and back again.
    await expect(async () => {
        await openScheme(app, id, { route });
        for (const n of ids) await expect(nodeRow(page, n)).toBeVisible({ timeout: 15_000 });
        await app.go(route === 'conceptScheme' ? '/concepts' : '/progressionLevels');
        await expect(page.locator('#framework_drag')).toHaveCount(0, { timeout: 15_000 });
        await openScheme(app, id, { route });
        for (const n of ids) await expect(nodeRow(page, n)).toBeVisible({ timeout: 15_000 });
    }).toPass({ timeout: 120_000 });
}

/** After a drag: CaSS must store `expected`, and the page must show it. */
async function expectTreeAfterDrag(app, schemeId, names, expected) {
    const page = app.page;
    await expect.poll(async () => named(await storedTree(page, schemeId), names), { message: 'hierarchy stored', timeout: 30_000 }).toEqual(expected);
    await expect.poll(async () => named(await uiTree(page), names), { message: 'hierarchy shown' }).toEqual(expected);
}

test.describe('TAX-01 create and edit a concept scheme @P1', () => {
    test('create through "new", rename, add and nest concepts', async ({ app, page, account, console: log }) => {
        await app.login(account, '/concepts');
        await page.getByRole('button', { name: /new/i }).first().click();
        await page.locator('.dropdown-item', { hasText: /^\s*Taxonomy\s*$/ }).click();
        await expect(page).toHaveURL(/#\/conceptScheme\//, { timeout: 60_000 }); // navigates once the new scheme is saved
        const schemeId = idFromRoute(page.url(), 'conceptScheme');

        // The create editor opens with the default name and the scheme is already saved, owned by the user.
        await expect(editor(page).locator('> header .modal-card-title')).toContainText('Create Taxonomy');
        await expect(editor(page).getByText(/last saved/i)).toBeVisible();
        await expect(editor(page).locator('textarea').first()).toHaveValue('New Taxonomy');
        const pem = await app.publicKey();
        await expectStored(app, schemeId, (s) => langValue(s['dcterms:title']) === 'New Taxonomy' && idList(s.owner).includes(pem));

        // Rename it.
        const name = unique('Taxonomy');
        await renameInEditor(page, name);
        await expect(page.locator('#framework_drag').getByText(name)).toBeVisible();
        await expectStored(app, schemeId, (s) => langValue(s['dcterms:title']) === name);

        // Add two top-level concepts.
        const concept = { button: /add concept/i, defaultLabel: 'New Concept' };
        const first = await addNode(page, 'First concept', concept);
        const second = await addNode(page, 'Second concept', concept);
        await expectStored(app, schemeId, (s) => JSON.stringify(idList(s['skos:hasTopConcept'])) === JSON.stringify([first, second]));
        await expectStored(app, first, (c) => langValue(c['skos:prefLabel']) === 'First concept' && c['skos:topConceptOf'] === schemeId && c['skos:inScheme'] === schemeId);
        await expectStored(app, second, (c) => langValue(c['skos:prefLabel']) === 'Second concept');

        // Nest: with a concept selected, "add concept" becomes "add child".
        await nodeRow(page, first).locator('.check-radio-column label').click();
        const child = await addNode(page, 'Child concept', { ...concept, button: /add child/i });
        await expectStored(app, first, (c) => idList(c['skos:narrower']).includes(child));
        await expectStored(app, child, (c) => idList(c['skos:broader']).includes(first) && c['skos:topConceptOf'] == null);

        // Everything persists after a reload, with the child under its parent.
        await reloadUntil(page, app, nodeRow(page, child));
        await expect(page.locator('#framework_drag').getByText(name)).toBeVisible();
        await expect.poll(() => uiTree(page)).toEqual([
            { id: first, children: [{ id: child, children: [] }] },
            { id: second, children: [] },
        ]);
        // The caret collapses and expands the parent.
        await nodeRow(page, first).locator('.expand-column .fa-caret-down').click();
        await expect(nodeRow(page, child)).toBeHidden();
        await nodeRow(page, first).locator('.expand-column .fa-caret-right').click();
        await expect(nodeRow(page, child)).toBeVisible();
        expect(consoleProblems(log)).toEqual([]);
    });

    test('edit a concept: rename and add, update and delete a property', async ({ app, page, account, console: log }) => {
        await app.login(account);
        const s = await seedConceptScheme(app, { concepts: ['Alpha', 'Beta'] });
        const alpha = s.concepts.Alpha;
        await openScheme(app, s.id);
        const row = nodeRow(page, alpha);
        await row.hover();
        await row.locator('.edit-button').click();
        await expect(editor(page).locator('> header')).toContainText('Edit Concept');

        // Rename (saved on blur).
        const label = editor(page).locator('textarea').first();
        await label.fill('Alpha renamed');
        await label.press('Tab');
        await expectStored(app, alpha, (c) => langValue(c['skos:prefLabel']) === 'Alpha renamed');

        // Add a definition.
        await editor(page).getByText(/add property/i).click();
        await editor(page).getByText('Definition', { exact: true }).click();
        await editor(page).locator('textarea').first().fill('First definition');
        await editor(page).getByText(/save property/i).click();
        const definition = editor(page).locator('.lode__Property').filter({ hasText: 'Definition' });
        await expect(definition.locator('textarea')).toHaveValue('First definition');
        await expectStored(app, alpha, (c) => langValue(c['skos:definition']) === 'First definition');

        // Update it.
        await definition.locator('textarea').fill('Second definition');
        await definition.locator('textarea').press('Tab');
        await expectStored(app, alpha, (c) => langValue(c['skos:definition']) === 'Second definition');

        // Delete it (✕ next to the value, then confirm).
        await definition.locator('.fa-times').first().click();
        const confirm = page.getByRole('button', { name: 'Confirm Remove Property' }).filter({ visible: true });
        await expect(confirm).toHaveCount(1);
        await confirm.click();
        await expect(editor(page).locator('.lode__Property').filter({ hasText: 'Definition' })).toHaveCount(0);
        await expectStored(app, alpha, (c) => c['skos:definition'] == null && langValue(c['skos:prefLabel']) === 'Alpha renamed');

        await editor(page).getByText(/^\s*done\s*$/i).click();
        await expect(editor(page)).toHaveCount(0);
        await expect(row.getByText('Alpha renamed', { exact: true })).toBeVisible();

        // Persists after a reload.
        await reloadUntil(page, app, nodeRow(page, alpha));
        await expect(nodeRow(page, alpha).getByText('Alpha renamed', { exact: true })).toBeVisible();
        expect(consoleProblems(log)).toEqual([]);
    });

    test('delete a concept from its editor, with confirmation', async ({ app, page, account, console: log }) => {
        await app.login(account);
        const s = await seedConceptScheme(app, { concepts: ['Alpha', { name: 'Beta', children: ['Gamma'] }] });
        const c = s.concepts;
        await openScheme(app, s.id);
        await expect(nodeRow(page, c.Gamma)).toBeVisible();
        await nodeRow(page, c.Beta).hover();
        await nodeRow(page, c.Beta).locator('.edit-button').click();
        await editor(page).locator('[title="Delete this concept"]').click();
        const modal = page.locator('.modal.is-active').filter({ hasText: 'Confirm Delete Concept' });
        await expect(modal).toBeVisible();
        await modal.getByRole('button', { name: 'Delete Concept' }).click();
        await expect(modal).toHaveCount(0);

        // Gone from the hierarchy and the server, with its child.
        await expect(nodeLi(page, c.Beta)).toHaveCount(0);
        await expect(nodeLi(page, c.Gamma)).toHaveCount(0);
        await expect(nodeRow(page, c.Alpha)).toBeVisible();
        await expectStored(app, s.id, (o) => JSON.stringify(idList(o['skos:hasTopConcept'])) === JSON.stringify([c.Alpha]));
        await expect.poll(() => stored(page, c.Beta), { timeout: 30_000 }).toBeNull();
        await expect.poll(() => stored(page, c.Gamma), { timeout: 30_000 }).toBeNull();
        expect(consoleProblems(log)).toEqual([]);
    });

    test('hierarchy drag and drop: reorder, nest, drop on the title', async ({ app, page, account, console: log }) => {
        test.slow(); // many drags, each followed by server round trips
        await app.login(account);
        const s = await seedConceptScheme(app, { concepts: ['Alpha', 'Bravo', { name: 'Charlie', children: ['Delta'] }] });
        const c = s.concepts;
        const names = invert(c);
        const hierarchy = page.locator('ul.lode__hierarchy-ul');
        await openForDragging(app, s.id, Object.values(c));

        // DND-01: reorder siblings (move down). Moving up: see the known-bug test below.
        expect(await dragNode(page, c.Alpha, { parent: '', index: 1 }, hierarchy)).toBe(true);
        await expectTreeAfterDrag(app, s.id, names, [leaf('Bravo'), leaf('Alpha'), { name: 'Charlie', children: [leaf('Delta')] }]);
        await expect(hierarchy.locator('li[id]')).toHaveCount(4); // no duplicated rows

        // DND-02: nest a top-level concept under another one.
        expect(await dragNode(page, c.Bravo, { parent: c.Charlie, index: 0 }, nodeLi(page, c.Charlie))).toBe(true);
        await expectTreeAfterDrag(app, s.id, names, [leaf('Alpha'), { name: 'Charlie', children: [leaf('Bravo'), leaf('Delta')] }]);
        await expectStored(app, c.Bravo, (o) => idList(o['skos:broader']).includes(c.Charlie) && o['skos:topConceptOf'] == null);
        await expect(nodeRow(page, c.Charlie).locator('.expand-column .fa-caret-down')).toBeVisible();

        // DND-03: drop a nested concept on the title header to make it top-level again.
        expect(await dragNode(page, c.Delta, { parent: 'framework_drag' }, page.locator('#framework_drag'))).toBe(true);
        await expectTreeAfterDrag(app, s.id, names, [leaf('Alpha'), { name: 'Charlie', children: [leaf('Bravo')] }, leaf('Delta')]);
        await expectStored(app, c.Delta, (o) => o['skos:topConceptOf'] === s.id && idList(o['skos:broader']).length === 0);
        // No raw JSON is rendered in the drop zone.
        await expect(page.locator('#framework_drag')).not.toContainText('{');

        // Dropping the other nested concept (now the last child) on the title as well: it becomes a
        // top concept too. (This second drop used to orphan the concept; it no longer does.)
        expect(await dragNode(page, c.Bravo, { parent: 'framework_drag' }, page.locator('#framework_drag'))).toBe(true);
        const final = [leaf('Alpha'), leaf('Charlie'), leaf('Delta'), leaf('Bravo')];
        await expectTreeAfterDrag(app, s.id, names, final);
        await expectStored(app, c.Bravo, (o) => o['skos:topConceptOf'] === s.id && idList(o['skos:broader']).length === 0);
        // Un-nesting the last child removes the parent's caret.
        await expect(nodeRow(page, c.Charlie).locator('.expand-column .fa-caret-down, .expand-column .fa-caret-right')).toHaveCount(0);

        // It persists after a reload.
        await reloadUntil(page, app, nodeRow(page, c.Delta));
        await expect.poll(async () => named(await uiTree(page), names), { message: 'hierarchy shown after reload' }).toEqual(final);
        expect(consoleProblems(log, { dragging: true })).toEqual([]);
    });

    test('TAX-01 moving a concept up lands where dropped (known bug: v-model on a readonly computed) @P1', async ({ app, page, account }) => {
        test.fail(true, 'A concept dragged up does not land where dropped (vuedraggable v-model on a computed without a setter); see e2e/FINDINGS.md');
        await app.login(account);
        const s = await seedConceptScheme(app, { concepts: ['Alpha', 'Bravo', 'Charlie'] });
        const c = s.concepts;
        const names = invert(c);
        const hierarchy = page.locator('ul.lode__hierarchy-ul');
        await openForDragging(app, s.id, Object.values(c));

        expect(await dragNode(page, c.Charlie, { parent: '', index: 0 }, hierarchy)).toBe(true);
        const expected = ['Charlie', 'Alpha', 'Bravo'].map(leaf);
        await expect.poll(async () => named(await storedTree(page, s.id), names), { message: 'hierarchy stored', timeout: 15_000 }).toEqual(expected);
        await expect.poll(async () => named(await uiTree(page), names), { message: 'hierarchy shown', timeout: 10_000 }).toEqual(expected);
    });

    test('TAX-01 dragging works on the first visit of a scheme (known bug: HierarchyNode still lazy-loading) @P1', async ({ app, page, account, console: log }) => {
        test.fail(true, 'On the first visit of a scheme in a page session dragging throws "Cannot read properties of null (reading \'element\')" and nothing moves; see e2e/FINDINGS.md');
        test.info().annotations.push({ type: 'allow-page-errors' }); // asserted below, as part of the intended behaviour
        await app.login(account);
        const s = await seedConceptScheme(app, { concepts: ['Alpha', 'Bravo', 'Charlie'] });
        const c = s.concepts;
        const names = invert(c);
        // First visit of a scheme in this page session.
        await openScheme(app, s.id);
        for (const id of Object.values(c)) await expect(nodeRow(page, id)).toBeVisible();

        await dragNode(page, c.Alpha, { parent: '', index: 1 }, page.locator('ul.lode__hierarchy-ul'), { retry: false, pickupTimeout: 10_000 }).catch(() => false);
        expect(log.pageErrors, 'uncaught errors in the page').toEqual([]);
        await expect.poll(async () => named(await storedTree(page, s.id), names), { message: 'hierarchy stored', timeout: 15_000 })
            .toEqual(['Bravo', 'Alpha', 'Charlie'].map(leaf));
    });
});

test.describe('TAX-02 concept scheme deep link @P2', () => {
    test('opening #/conceptScheme/<id> directly renders the scheme', async ({ app, page, account, console: log }) => {
        await app.login(account);
        const s = await seedConceptScheme(app, { concepts: ['Alpha', { name: 'Beta', children: ['Gamma'] }] });
        await app.open(`/conceptScheme/${encodeURIComponent(s.id)}`);
        await expect(page.locator('#framework_drag').getByText(s.name)).toBeVisible({ timeout: 60_000 });
        for (const id of Object.values(s.concepts)) await expect(nodeRow(page, id)).toBeVisible();
        expect(await uiTree(page)).toEqual([
            { id: s.concepts.Alpha, children: [] },
            { id: s.concepts.Beta, children: [{ id: s.concepts.Gamma, children: [] }] },
        ]);
        expect(consoleProblems(log)).toEqual([]);
    });

    test('a versioned id in the route is trimmed to the scheme', async ({ app, page, account, console: log }) => {
        await app.login(account);
        const s = await seedConceptScheme(app, { concepts: ['Alpha'] });
        const versioned = (await stored(page, s.id))['@id'];
        expect(versioned).not.toBe(s.id);
        expect(versioned.startsWith(`${s.id}/`)).toBe(true);
        await app.open(`/conceptScheme/${encodeURIComponent(versioned)}`);
        await expect(page.locator('#framework_drag').getByText(s.name)).toBeVisible({ timeout: 60_000 });
        await expect(nodeRow(page, s.concepts.Alpha)).toBeVisible();
        expect(await page.evaluate(() => window.app.$pinia._s.get('editor').framework.shortId())).toBe(s.id);
        expect(consoleProblems(log)).toEqual([]);
    });
});

test.describe('PROG-01 progression model create / edit @P1', () => {
    test('create a progression model and add levels', async ({ app, page, account, console: log }) => {
        test.slow(); // the required fields are filled one save at a time (see the lost-update note below)
        // Progression models are created from #/progressionLevels?ceasnDataFields=true (TEST-CASES.md PROG-01).
        await app.login(account, '/progressionLevels');
        await app.open('/progressionLevels', { ceasnDataFields: 'true' });
        await page.getByRole('button', { name: /new/i }).first().click();
        await page.locator('.dropdown.is-active .dropdown-item', { hasText: /^\s*Progression Model\s*$/ }).click();
        await expect(page).toHaveURL(/#\/progressionModel\//, { timeout: 60_000 }); // navigates once the new model is saved
        const modelId = idFromRoute(page.url(), 'progressionModel');
        await expect(editor(page).locator('> header .modal-card-title')).toContainText(/Create Progression Model/i);
        await expect(editor(page).locator('textarea').first()).toHaveValue('New Progression Model');
        await expectStored(app, modelId, (m) => m.subType === 'Progression' && langValue(m['dcterms:title']) === 'New Progression Model');

        // Name it and fill the fields the CTDL-ASN profile requires before "done" closes the editor.
        const name = unique('Progression');
        const property = (label) => editor(page).locator('.lode__Property').filter({ has: page.locator('label', { hasText: new RegExp(`^\\s*${label}\\*?\\s*$`) }) });
        // APP BUG (reported, intermittent, not reproduced deterministically): each field saves the
        // whole model on blur and every save comes back over the websocket and reloads the editor's
        // copy, so a field edited meanwhile can lose its edit, and a later field's save can revert an
        // earlier, already saved field (seen: Publisher saved, then emptied again by the Publication
        // Status save). Fill fields one at a time, and fill again whatever CaSS does not have, until
        // it has all of them.
        const fields = [
            ['Name', name],
            ['Description', 'E2E progression model'],
            ['Publisher', 'https://example.org/e2e-publisher'],
            ['Publication Status', 'Draft'],
        ];
        const has = (m, label, value) => (label === 'Publication Status'
            ? JSON.stringify(m).includes('publicationStatus/Draft')
            : JSON.stringify(m).includes(JSON.stringify(value)));
        let statusTries = 0;
        const fill = async (label, value) => {
            if (label === 'Publication Status') {
                const status = property(label).locator('select');
                await status.focus({ timeout: 5_000 });
                // On a retry, pass through another option first so selecting Draft is a real change again.
                if (statusTries++ > 0) await status.selectOption({ label: 'Published' });
                await status.selectOption({ label: 'Draft' });
                await status.press('Tab');
            } else {
                const field = property(label).locator('textarea, input[type=text], input:not([type])').first();
                await field.click({ timeout: 5_000 }); // focusing puts the property in editing mode, which saves on blur
                await field.fill(value);
                await field.press('Tab');
            }
            await expectStored(app, modelId, (m) => has(m, label, value), `${label} saved`, 10_000);
        };
        await expect(async () => {
            for (const [label, value] of fields) {
                const m = await stored(page, modelId);
                if (!has(m, label, value)) await fill(label, value);
            }
            await expectStored(app, modelId, (m) => fields.every(([label, value]) => has(m, label, value)), 'all required fields saved', 5_000);
        }).toPass({ timeout: 180_000 });
        // "done" validates the required fields; right after the last save it can still see a stale
        // value and stay open, so click it again until the editor closes.
        await expect(async () => {
            await editor(page).getByText(/^\s*done\s*$/i).click({ timeout: 5_000 });
            await expect(editor(page)).toHaveCount(0, { timeout: 10_000 });
        }).toPass({ timeout: 60_000 });
        await expect(page.locator('#framework_drag').getByText(name)).toBeVisible();
        await expectStored(app, modelId, (m) => langValue(m['dcterms:title']) === name && m.subType === 'Progression'
            && JSON.stringify(m).includes('E2E progression model') && JSON.stringify(m).includes('https://example.org/e2e-publisher'));

        const level = { button: /add level/i, defaultLabel: 'New Progression Level' };
        const l1 = await addNode(page, 'Novice', level);
        const l2 = await addNode(page, 'Competent', level);
        const l3 = await addNode(page, 'Expert', level);
        await expectStored(app, modelId, (m) => JSON.stringify(idList(m['skos:hasTopConcept'])) === JSON.stringify([l1, l2, l3]));
        // Levels point at their model with ceasn:inProgressionModel (not skos:inScheme) and are subType Progression.
        await expectStored(app, l2, (c) => langValue(c['skos:prefLabel']) === 'Competent' && c['ceasn:inProgressionModel'] === modelId
            && c['skos:topConceptOf'] === modelId && c.subType === 'Progression');

        // Persists: a fresh load of the model shows it. (Without ceasnDataFields: in that mode the
        // editor's start-up sends every page load without ?frameworkId= to the list, App.vue.)
        await app.open(`/progressionModel/${encodeURIComponent(modelId)}`);
        await expect(page.locator('#framework_drag').getByText(name)).toBeVisible();
        await expect.poll(() => uiTree(page), { timeout: 30_000 }).toEqual([l1, l2, l3].map((id) => ({ id, children: [] })));
        expect(consoleProblems(log)).toEqual([]);
    });

    test('reorder levels and drop a level on the title header', async ({ app, page, account, console: log }) => {
        test.slow(); // several drags, each followed by server round trips
        await app.login(account);
        // The progression hierarchy is flat: it shows only top-level levels (ProgressionHierarchy computeHierarchy).
        const m = await seedConceptScheme(app, { name: unique('Progression'), progression: true, concepts: ['Novice', 'Competent', 'Expert', 'Master'] });
        const c = m.concepts;
        const names = invert(c);
        const hierarchy = page.locator('ul.lode__hierarchy-ul');
        await openForDragging(app, m.id, Object.values(c), 'progressionModel');
        await expect(page.locator('#framework_drag').getByText(m.name)).toBeVisible();

        // Reorder (move down). Moving up: see the known-bug test below.
        expect(await dragNode(page, c.Novice, { parent: '', index: 1 }, hierarchy)).toBe(true);
        await expectTreeAfterDrag(app, m.id, names, ['Competent', 'Novice', 'Expert', 'Master'].map(leaf));
        await expect(hierarchy.locator('li[id]')).toHaveCount(4); // no duplicated rows
        expect(consoleProblems(log, { dragging: true })).toEqual([]);

        // Drop-to-top-level on the title header (DND-03 regression). Levels are always top-level
        // here, so this drops a top-level level on the header.
        expect(await dragNode(page, c.Expert, { parent: 'framework_drag' }, page.locator('#framework_drag'))).toBe(true);
        await expect(page.locator('#framework_drag')).not.toContainText('{'); // no raw JSON in the drop zone
        await expectStored(app, c.Expert, (o) => o['skos:topConceptOf'] === m.id && idList(o['skos:broader']).length === 0);
        await expectStored(app, m.id, (o) => o.subType === 'Progression' && idList(o['skos:hasTopConcept']).includes(c.Expert));
        // It should stay a single row, but it is duplicated (in the page and in skos:hasTopConcept),
        // so the rows are not compared here: see the known-bug test "dropping a top-level level on
        // the title". The duplicated row also makes Vue warn about duplicate keys.
        expect(consoleProblems(log, { dragging: true }).filter((t) => !/Duplicate keys found during update/.test(t))).toEqual([]);
    });

    test('PROG-01 moving a level up lands where dropped (known bug: v-model on a readonly computed) @P1', async ({ app, page, account }) => {
        test.fail(true, 'A level dragged up does not land where dropped (vuedraggable v-model on a computed without a setter); see e2e/FINDINGS.md');
        await app.login(account);
        const m = await seedConceptScheme(app, { name: unique('Progression'), progression: true, concepts: ['Novice', 'Competent', 'Expert', 'Master'] });
        const c = m.concepts;
        const names = invert(c);
        await openForDragging(app, m.id, Object.values(c), 'progressionModel');

        expect(await dragNode(page, c.Master, { parent: '', index: 0 }, page.locator('ul.lode__hierarchy-ul'))).toBe(true);
        const expected = ['Master', 'Novice', 'Competent', 'Expert'].map(leaf);
        await expect.poll(async () => named(await storedTree(page, m.id), names), { message: 'hierarchy stored', timeout: 15_000 }).toEqual(expected);
        await expect.poll(async () => named(await uiTree(page), names), { message: 'hierarchy shown', timeout: 10_000 }).toEqual(expected);
    });

    test('PROG-01 dropping a top-level level on the title keeps it a single row (known bug: duplicated in skos:hasTopConcept) @P1', async ({ app, page, account, console: log }) => {
        test.fail(true, 'Dropping an already top-level level on the model title appends it to skos:hasTopConcept again; see e2e/FINDINGS.md');
        await app.login(account);
        const m = await seedConceptScheme(app, { name: unique('Progression'), progression: true, concepts: ['Novice', 'Competent', 'Expert'] });
        const c = m.concepts;
        await openForDragging(app, m.id, Object.values(c), 'progressionModel');
        const version = async () => (await stored(page, m.id))['@id'];
        const before = await version();

        expect(await dragNode(page, c.Expert, { parent: 'framework_drag' }, page.locator('#framework_drag'))).toBe(true);
        // The drop re-saves the model (a new version); wait for that, or 10 s if a fixed editor
        // treats the drop as a no-op and saves nothing.
        await expect.poll(async () => (await version()) !== before, { timeout: 10_000 }).toBe(true).catch(() => {});
        // Expert is listed once, shown once, and Vue does not warn about duplicate keys.
        const top = idList((await stored(page, m.id))['skos:hasTopConcept']);
        expect(top.filter((id) => id === c.Expert)).toHaveLength(1);
        expect(top).toHaveLength(3);
        await expect(page.locator(`ul.lode__hierarchy-ul li[id="${c.Expert}"]`)).toHaveCount(1);
        expect(consoleProblems(log, { dragging: true })).toEqual([]);
    });
});
