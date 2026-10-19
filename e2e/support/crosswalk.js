// Helpers for TEST-CASES.md §7 Crosswalk.
import { expect } from '@playwright/test';
import { stored } from './taxonomies.js';

export { stored };

/** The crosswalk store (Pinia) of the running editor, read in the page. */
export const crosswalkState = (page) => page.evaluate(() => {
    const s = window.app.$pinia._s.get('crosswalk');
    return JSON.parse(JSON.stringify({
        step: s.step,
        source: s.frameworkSource && s.frameworkSource.shortId(),
        target: s.frameworkTarget && s.frameworkTarget.shortId(),
        sourceRelationships: s.frameworkSourceRelationships,
        sourceState: s.sourceState,
        working: s.workingAlignmentsMap,
        toSave: s.alignmentsToSave.length,
        toDelete: s.alignmentsToDelete.length,
    }));
});

/** The framework list shown in steps A and B. */
export const stepList = (page) => page.locator('.crosswalk__list');

/** Searches the step A / B list for a framework by name and clicks it. */
export async function pickFramework(page, name) {
    const search = page.locator('.crosswalk__search input[type=search]');
    await expect(search).toBeEnabled();
    // Clear first: filling in the term the box already shows would not trigger a new search.
    await search.fill('');
    await search.fill(name);
    const row = stepList(page).locator('.cass--list--item').filter({ hasText: name });
    await expect(row.first()).toBeVisible({ timeout: 30_000 });
    await row.first().click();
}

/** Source / target columns of the double hierarchy (step "align"). */
export const sourceColumn = (page) => page.locator('.crosswalk__double-hierarchy .column.source');
export const targetColumn = (page) => page.locator('.crosswalk__double-hierarchy .column.target');

/** The row of a competency (without children) in a column. */
export const nodeRow = (column, id) => column.locator(`li[id="${id}"] > div.lode__hierarchy-item`);

/**
 * Opens #/crosswalk in the loaded editor (keeping the in-memory login). A navigation issued while
 * the frameworks list is still initialising can be superseded by its own route update, so retry.
 */
export async function goCrosswalk(app) {
    await expect(async () => {
        await app.go('/crosswalk');
        await expect(stepList(app.page)).toBeVisible({ timeout: 10_000 });
    }).toPass({ timeout: 60_000 });
}

/** Opens #/crosswalk, selects source then target framework and waits for both hierarchies. */
export async function startCrosswalk(app, source, target) {
    const page = app.page;
    await goCrosswalk(app);
    await pickFramework(page, source.name);
    await expect(page.locator('.step-item.current')).toContainText('select target');
    await pickFramework(page, target.name);
    await waitForAlign(page, source, target);
}

/** Waits until the double hierarchy shows every competency of both frameworks. */
export async function waitForAlign(page, source, target) {
    await expect(page.locator('.step-item.current')).toContainText('align frameworks');
    for (const id of Object.values(source.competencies)) await expect(nodeRow(sourceColumn(page), id)).toBeVisible();
    // The target column appears 2 s after the source finished loading.
    for (const id of Object.values(target.competencies)) await expect(nodeRow(targetColumn(page), id)).toBeVisible({ timeout: 30_000 });
}

/** The relation types offered for a source competency, as [{ value, label }] (they depend on configuration). */
export async function relationOptions(page, sourceRow) {
    return await sourceRow.locator('.crosswalk-buttons__source__select select option').evaluateAll(
        (options) => options.filter((o) => o.value).map((o) => ({ value: o.value, label: o.textContent.trim() })));
}

/** Clicks the source competency's "add" button and chooses a relation type by value. */
export async function chooseSourceRelation(page, sourceRow, relationType) {
    await sourceRow.hover(); // The "add" button shows on hover.
    await sourceRow.locator('.crosswalk-buttons__source__create').click();
    const select = sourceRow.locator('.crosswalk-buttons__source__select select');
    await expect(select).toBeVisible();
    await select.selectOption(relationType);
    await expect(sourceRow.locator('.crosswalk-buttons__source__type')).toBeVisible();
}

/** The "+" (not aligned yet) and "✓" (aligned) buttons of a target competency. */
export const plusButton = (targetRow) => targetRow.locator('.crosswalk-buttons__target .button').filter({ has: targetRow.page().locator('.fa-plus') });
export const checkButton = (targetRow) => targetRow.locator('.crosswalk-buttons__target .button').filter({ has: targetRow.page().locator('.fa-check') });

/** Topbar button by its label (the crosswalk uses span "buttons"). */
export const crosswalkButton = (page, label) => page.locator('.crosswalk__buttons .button').filter({ hasText: label });

/**
 * Creates an alignment (EcAlignment) owned by the logged-in user and lists it in the relation
 * list of each framework in frameworkIds, as a saved crosswalk would. Returns its id.
 */
export async function seedAlignment(page, { source, target, relationType, frameworkIds }) {
    return await page.evaluate(async ({ source, target, relationType, frameworkIds }) => {
        const pk = EcIdentityManager.default.ids[0].ppk.toPk();
        const a = new EcAlignment();
        a.generateId(repo.selectedServer);
        a.source = source;
        a.target = target;
        a.relationType = relationType;
        a.addOwner(pk);
        const toSave = [a];
        for (const id of frameworkIds) {
            const f = await EcFramework.get(id);
            f.addRelation(a.shortId());
            toSave.push(f);
        }
        await repo.multiput(toSave);
        return a.shortId();
    }, { source, target, relationType, frameworkIds });
}

/**
 * The alignments listed in a framework's stored relation list, read from the server, minus the
 * framework's own hierarchy (relations between two of its competencies):
 * [{ id, source, target, relationType }]; a listed id that does not exist gives { id, missing: true }.
 */
export async function storedAlignments(page, frameworkId) {
    const fw = await stored(page, frameworkId);
    const own = new Set(fw?.competency || []);
    const out = [];
    for (const id of fw?.relation || []) {
        const r = await stored(page, id);
        if (r == null) {
            out.push({ id, missing: true });
        } else if (!(own.has(r.source) && own.has(r.target))) {
            out.push({ id, source: r.source, target: r.target, relationType: r.relationType });
        }
    }
    return out;
}

/** Sorts alignments for order-independent comparison. */
export const sortAlignments = (list) => list
    .map(({ source, target, relationType }) => ({ source, target, relationType }))
    .sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
