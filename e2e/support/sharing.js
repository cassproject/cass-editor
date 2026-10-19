// Helpers for the Share modal (src/components/modalContent/Share.vue), used by sharing.spec.js and
// groups.spec.js.
import { expect } from '@playwright/test';

/** Opens the Share modal from the framework toolbar ("Manage users") and returns it. */
export async function openShareModal(page) {
    await page.locator('[title="Manage users"]').click();
    const modal = page.locator('.modal.is-active').filter({ hasText: 'Sharing settings for' });
    await expect(modal).toBeVisible();
    return modal;
}

/** The row of a user (or group) in the modal's access tables. */
export const userRow = (modal, name) => modal.locator('tbody tr').filter({ has: modal.page().locator('td', { hasText: name }) });

/**
 * Adds a user or group (matched by its unique name) with role 'admin' (Edit/Share) or 'view'.
 * The modal loads the candidates a few seconds after it opens, so the search is retried.
 */
export async function shareWith(modal, nameOrAccount, role) {
    const name = typeof nameOrAccount === 'string' ? nameOrAccount : nameOrAccount.name;
    const search = modal.locator('input.share');
    const suggestion = modal.locator('.auto li', { hasText: name });
    await expect(async () => {
        await search.fill('');
        await search.fill(name);
        await expect(suggestion).toBeVisible({ timeout: 2_000 });
    }).toPass({ timeout: 30_000 });
    await suggestion.dispatchEvent('mousedown');
    await expect(search).toHaveValue(name);
    await modal.locator('.field.is-grouped select').selectOption(role);
    await modal.getByText('Add Selection', { exact: true }).click();
}

/**
 * Reads an object as CaSS stored it, as the page's logged-in user. Unlike app.fetchObject this
 * bypasses the editor's in-memory cache, which the Share modal updates before (and whether or not)
 * the save reaches the server. Returns the raw JSON (an EncryptedValue for private objects), or null.
 */
export async function fetchStored(page, id) {
    return await page.evaluate(async (id) => {
        const caching = EcRepository.caching;
        EcRepository.caching = false;
        try {
            const o = await EcRepository.get(id);
            return o == null ? null : JSON.parse(o.toJson());
        } finally {
            EcRepository.caching = caching;
        }
    }, id);
}

/** Waits until the access tables list exactly these names with these roles ('admin' / 'view'). */
export async function waitForRoles(modal, roles) {
    for (const [name, role] of Object.entries(roles)) {
        await expect(userRow(modal, name).locator('select')).toHaveValue(role, { timeout: 30_000 });
    }
}

/**
 * Opens a framework the test just seeded and waits until `text` (e.g. a competency name) shows.
 * Right after seeding, the framework view sometimes never finishes loading its competencies (the
 * hierarchy stays on its grey placeholder rows); a reload fixes it, so this reloads until the
 * text shows. Seen only for objects saved moments before; see the report.
 */
export async function openSeededFramework(app, page, frameworkId, text) {
    await app.waitIndexed(`@id:"${frameworkId}"`);
    await expect(async () => {
        // Navigate inside the loaded editor, as a user does from the list: after a deep link the
        // editor computes edit rights before the saved login loads, so the owner gets no
        // "Manage users" or edit controls (known bug, see DND-03 in e2e/FINDINGS.md).
        await app.open('/frameworks');
        await expect.poll(() => page.evaluate(() => EcIdentityManager.default.ids.length)).toBeGreaterThan(0);
        await page.evaluate((id) => window.app.$router.push({ name: 'framework', params: { frameworkId: id } }), frameworkId);
        await expect(page.getByText(text).first()).toBeVisible({ timeout: 40_000 });
    }).toPass({ timeout: 150_000 });
}
