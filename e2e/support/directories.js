// Helpers for the directories spec (TEST-CASES.md §9).
import { expect } from '@playwright/test';

/**
 * Creates a directory owned by the logged-in user (or by a throwaway key with foreign: true),
 * optionally inside parent (a directory id). Returns its id.
 */
export async function seedDirectory(page, { name, parent = null, foreign = false }) {
    return await page.evaluate(async ({ name, parent, foreign }) => {
        const owner = foreign ? EcPpk.generateKey() : EcIdentityManager.default.ids[0].ppk;
        const eim = new EcIdentityManager();
        const identity = new EcIdentity();
        identity.ppk = owner;
        eim.addIdentity(identity);
        const dir = new EcDirectory();
        dir.name = name;
        dir.generateId(repo.selectedServer);
        if (parent) dir.parentDirectory = parent;
        dir.addOwner(owner.toPk());
        dir['schema:dateCreated'] = new Date().toISOString();
        dir['schema:dateModified'] = new Date().toISOString();
        await repo.multiput([dir], null, null, eim);
        return dir.shortId();
    }, { name, parent, foreign });
}

/** Creates a framework inside a directory (as the editor does: framework.directory = id). */
export async function seedFrameworkInDirectory(page, { name, directory, foreign = false }) {
    return await page.evaluate(async ({ name, directory, foreign }) => {
        const owner = foreign ? EcPpk.generateKey() : EcIdentityManager.default.ids[0].ppk;
        const eim = new EcIdentityManager();
        const identity = new EcIdentity();
        identity.ppk = owner;
        eim.addIdentity(identity);
        const f = new EcFramework();
        f.generateId(repo.selectedServer);
        f.setName(name);
        f.directory = directory;
        f.addOwner(owner.toPk());
        f['schema:dateCreated'] = new Date().toISOString();
        f['schema:dateModified'] = new Date().toISOString();
        await repo.multiput([f], null, null, eim);
        return f.shortId();
    }, { name, directory, foreign });
}

/** The directory the editor has selected (app store), as { id, name } or null. */
export async function selectedDirectory(page) {
    return await page.evaluate(() => {
        const d = window.app.$pinia._s.get('app').directories.selectedDirectory;
        return d ? { id: d.shortId(), name: d.name } : null;
    });
}

/** Opens a directory through the ?directoryId= deep link and waits for its view. */
export async function openDirectory(app, id) {
    // The deep link is handled once the editor has loaded the saved identities and occasionally
    // loses that race, so reload and try again.
    await expect(async () => {
        await app.open('/frameworks', { directoryId: id });
        await expect(app.page).toHaveURL(/#\/directory/, { timeout: 30_000 });
    }).toPass({ timeout: 120_000 });
    await expect.poll(async () => (await selectedDirectory(app.page))?.id).toBe(id);
}

/** The directory contents list (DirectoryList). */
export const directoryList = (page) => page.locator('#directoryList');

/** A row of the directory list containing text. */
export const listRow = (page, text) => directoryList(page).locator('li.cass--list--item', { hasText: text });

/** Opens the "New" dropdown of the frameworks list or directory view and clicks the item named label. */
export async function chooseNew(page, label) {
    await page.locator('.dropdown').filter({ has: page.locator('#directory-add-dropdown') })
        .locator('button.is-hidden-touch').filter({ hasText: /new/i }).first().click();
    const item = page.locator('#directory-add-dropdown .dropdown-item', { hasText: new RegExp(`^\\s*${label}\\s*$`, 'i') }).first();
    await item.click();
}

/** Searches CaSS for objects (as the logged-in user); returns their short ids. */
export async function searchIds(page, query) {
    return await page.evaluate(async (q) => (await repo.searchWithParams(q, { size: 50 })).map((o) => o.shortId()), query);
}

/**
 * Chooses a "New" item that opens a form (Directory, Sub directory, Resource) and returns the form's
 * modal (titled title). A click that lands while the list is still re-rendering is lost, so choose
 * again until the form opens (choosing these items twice is harmless; Framework is not, use chooseNew).
 */
export async function openNewForm(page, label, title) {
    const modal = page.locator('.modal.is-active').filter({ hasText: title });
    await expect(async () => {
        if (!(await modal.isVisible())) await chooseNew(page, label);
        await expect(modal).toBeVisible({ timeout: 5_000 });
    }).toPass({ timeout: 30_000 });
    return modal;
}
