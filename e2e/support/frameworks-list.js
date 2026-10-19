// Helpers for the frameworks list (TEST-CASES.md §2) and search (§14) specs.
import { expect } from '@playwright/test';
import { randomId } from './app.js';
import { seedConfiguration as seedFullConfiguration } from './configurations.js';

/** A short alphanumeric token no other test uses; safe to search for as a single word. */
export const token = (prefix = 'tok') => `${prefix}${Date.now().toString(36)}${randomId(6)}`;

/**
 * Creates a framework with extra top-level properties (e.g. schema:dateModified, configuration,
 * directory, schema:publisher), owned by the logged-in user or, with foreign: true, by a
 * throwaway key. competencies: names. Returns { id, versionedId, name, competencies: { name: id } }.
 */
export async function seedFramework(page, { name, competencies = [], extra = {}, foreign = false }) {
    return await page.evaluate(async ({ name, competencies, extra, foreign }) => {
        const owner = foreign ? EcPpk.generateKey() : EcIdentityManager.default.ids[0].ppk;
        const eim = new EcIdentityManager();
        const identity = new EcIdentity();
        identity.ppk = owner;
        eim.addIdentity(identity);
        const toSave = [];
        const f = new EcFramework();
        f.generateId(repo.selectedServer);
        f.setName(name);
        f.addOwner(owner.toPk());
        Object.assign(f, extra);
        const ids = {};
        for (const cname of competencies) {
            const c = new EcCompetency();
            c.generateId(repo.selectedServer);
            c.setName(cname);
            c.addOwner(owner.toPk());
            f.addCompetency(c.shortId());
            toSave.push(c);
            ids[cname] = c.shortId();
        }
        toSave.push(f);
        await repo.multiput(toSave, null, null, eim);
        return { id: f.shortId(), versionedId: f.id, name, competencies: ids };
    }, { name, competencies, extra, foreign });
}

/** Creates a directory owned by the logged-in user; returns its id. */
export async function seedDirectory(page, name) {
    return await page.evaluate(async (name) => {
        const dir = new EcDirectory();
        dir.name = name;
        dir.generateId(repo.selectedServer);
        dir.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
        dir['schema:dateCreated'] = new Date().toISOString();
        dir['schema:dateModified'] = new Date().toISOString();
        await repo.multiput([dir]);
        return dir.shortId();
    }, name);
}

/**
 * Creates a complete configuration (from e2e/fixtures/configuration-template.json, as the editor saves
 * one) owned by the logged-in user. A partial configuration would crash the editor's Configurations
 * page for every other test on the server.
 */
export async function seedConfiguration(page, name) {
    return await seedFullConfiguration(page, { name });
}

/** Waits until a CaSS search returns exactly `count` hits (the index lags writes). */
export async function waitIndexedCount(page, query, count) {
    await expect.poll(async () => page.evaluate(async (q) => (await repo.searchWithParams(q, { size: 50 })).length, query), { timeout: 20_000 }).toBe(count);
}

// Frameworks list page.
export const searchInput = (page) => page.locator('.cass--search-bar input[type=search]').first();
export const listRows = (page) => page.locator('#frameworks .cass--list > li.cass--list--item:not(.no-results)');
export const row = (page, name) => listRows(page).filter({ hasText: name });
export const rightAside = (page) => page.locator('#right-side-bar');

/**
 * Waits for a row to show its name, then returns it. Names render only after the row's JSON-LD
 * has been compacted, which fetches the schema context from the dev server.
 */
export async function namedRow(page, name) {
    const r = row(page, name);
    await expect(r).toBeVisible({ timeout: 30_000 });
    return r;
}

/**
 * Waits until the editor's startup schema preload (App.vue) has processed the schemata list rows
 * need. Rows mounted before that stay nameless for good here: Thing.vue then fetches the schema from
 * the remote host, which fails offline and is not retried (FINDINGS REG-02). Call it before
 * anything that mounts the rows a test reads (a search, a filter).
 */
export async function waitForSchemata(page) {
    await expect.poll(() => page.evaluate(() => {
        const lode = window.app?.$pinia?.state.value.lode;
        return lode != null && ['https://schema.cassproject.org/0.4', 'https://schema.cassproject.org/0.4/Framework', 'https://schema.cassproject.org/0.4/Directory']
            .every((type) => lode.schemata[type] !== undefined);
    }), { timeout: 30_000 }).toBe(true);
}

/** Types into the list's search bar (once the rows it mounts can show names). */
export async function search(page, term) {
    await waitForSchemata(page);
    const input = searchInput(page);
    await expect(input).toBeEnabled();
    await input.fill(term);
    await input.press('Enter');
}

/**
 * Opens the Filter & sort side panel the way a user does: clicks the search bar's Filters button as
 * soon as it is shown (the list need not have loaded; FilterAndSort.vue waits for the schema itself).
 * APP LIMITATION: the panel decides on mount, from the identities loaded at that moment, whether to
 * offer "Owned by me" / "Not owned by me"; opened before the saved login has loaded (right after a
 * reload) it never offers them. So, logged in, first wait for the user chip as a user would.
 */
export async function openFilterAndSort(page, { loggedIn = true } = {}) {
    if (loggedIn) await expect(page.locator('.cass-editor__logged-in-user-icon')).toBeVisible();
    await page.locator('.cass--search-bar [title="Filters"]').click();
    await expect(rightAside(page).getByText('Filter and Sort')).toBeVisible();
    return rightAside(page);
}

/**
 * Toggles a Filter & sort option (quick filter or sort radio) by its id. The inputs are disabled
 * while the first search runs; a user waits for them, so wait until the input is enabled.
 */
export async function toggleOption(panel, id) {
    await expect(panel.locator(`#${id}`)).toBeEnabled();
    await panel.locator(`label[for="${id}"]`).click();
}

/** Positions (indexes) of the given names among the list rows, in display order. */
export async function rowOrder(page, names) {
    const texts = await listRows(page).allInnerTexts();
    return names.map((n) => texts.findIndex((t) => t.includes(n)));
}
