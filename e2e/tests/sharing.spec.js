// TEST-CASES.md §12 Sharing & permissions (SHARE-01 … SHARE-03).
import { test, expect, unique, problems } from '../support/fixtures.js';
import { App } from '../support/app.js';
import { publicKeyOf } from '../support/assertions.js';
import { fetchStored, openSeededFramework, openShareModal, shareWith, userRow, waitForRoles } from '../support/sharing.js';

// Controls that only appear on a framework the user may edit (as in auth.spec.js).
const addButton = (page) => page.getByText(/^\s*add\s*$/i);
const editIcon = (page) => page.locator('.fa-edit');

/** Seeds and opens a framework owned by the logged-in user. */
async function openOwnedFramework(app, page, prefix) {
    const competency = unique(`${prefix} competency`);
    const fw = await app.seedFramework({ name: unique(prefix), competencies: [competency] });
    await openSeededFramework(app, page, fw.id, competency);
    return { ...fw, competency };
}

/**
 * Opens the framework as another user (or anonymously when account is null) in a new context:
 * loads the frameworks list, then navigates to the framework inside the editor. Opening a private
 * framework by URL is broken (see the SHARE-01 known-bug test), so this navigates in-app.
 * With visibleText, waits (reloading and re-navigating if needed) until that text shows.
 */
async function openAs(browser, account, fw, { visibleText = null } = {}) {
    const context = await browser.newContext();
    const page = await context.newPage();
    const app = new App(page);
    const route = `/framework/${encodeURIComponent(fw.id)}`;
    if (account) await app.login(account, '/frameworks');
    else await app.becomeAnonymous('/frameworks');
    await app.go(route);
    if (visibleText) {
        let attempts = 0;
        await expect(async () => {
            if (attempts++ > 0) {
                // The hierarchy can stay on its placeholder rows (as in openSeededFramework); only
                // a reload helps. The editor keeps the login in localStorage across the reload.
                await app.open('/frameworks');
                if (account) await expect.poll(() => page.evaluate(() => EcIdentityManager.default.ids.length)).toBeGreaterThan(0);
                await app.go(route);
            }
            await expect(page.getByText(visibleText).first()).toBeVisible({ timeout: 30_000 });
        }).toPass({ timeout: 120_000 });
    }
    return { context, page, app };
}

const samePem = (list, pem) => (list || []).includes(pem);
/** The JSON-LD type of a stored object ('Framework', 'EncryptedValue', …). */
const storedType = (o) => o?.['@type'] ?? o?.type;

test.describe('Sharing & permissions', () => {
    test.describe('SHARE-01 add owner / reader', () => {
        test('add another user as owner @P1', async ({ app, page, browser, account, otherAccount, console }) => {
            // Two other-user logins in separate contexts, plus re-encrypting the shared objects.
            test.slow();
            const otherPk = await publicKeyOf(browser, otherAccount);
            await app.login(account);
            const me = await app.publicKey();
            const fw = await openOwnedFramework(app, page, 'Share owner');

            const modal = await openShareModal(page);
            await waitForRoles(modal, { [account.name]: 'admin' });
            await shareWith(modal, otherAccount, 'admin');
            await waitForRoles(modal, { [account.name]: 'admin', [otherAccount.name]: 'admin' });

            await expect.poll(async () => samePem((await fetchStored(page, fw.id)).owner, otherPk)).toBe(true);
            const stored = await fetchStored(page, fw.id);
            expect(stored.owner).toContain(me);
            expect(stored.reader ?? []).not.toContain(otherPk);
            // Competencies are shared along with the framework.
            expect((await fetchStored(page, fw.competencies[fw.competency])).owner).toContain(otherPk);

            // The new owner can edit it.
            const other = await openAs(browser, otherAccount, fw, { visibleText: fw.competency });
            try {
                await expect(addButton(other.page).first()).toBeVisible();
                await expect(editIcon(other.page).first()).toBeVisible();
            } finally {
                await other.context.close();
            }
            expect(problems(console)).toEqual([]);
        });

        test('add another user as reader @P1', async ({ app, page, browser, account, otherAccount, console }) => {
            // Two other-user logins in separate contexts, plus making the framework private.
            test.slow();
            const otherPk = await publicKeyOf(browser, otherAccount);
            await app.login(account);
            const fw = await openOwnedFramework(app, page, 'Share reader');

            const modal = await openShareModal(page);
            await waitForRoles(modal, { [account.name]: 'admin' });
            // "View" access is only offered for private frameworks.
            const viewOption = modal.locator('.field.is-grouped select option[value="view"]');
            await expect(viewOption).toBeDisabled();
            await expect(viewOption).toHaveAttribute('title', /private to add users\/groups with view access/);
            await modal.getByRole('button', { name: 'Private', exact: true }).click();
            await modal.getByRole('button', { name: /confirm make private/i }).click();
            await expect(modal.getByRole('button', { name: 'Private', exact: true })).not.toHaveClass(/is-outlined/);
            await expect(viewOption).toBeEnabled();

            await shareWith(modal, otherAccount, 'view');
            await waitForRoles(modal, { [account.name]: 'admin', [otherAccount.name]: 'view' });
            await expect.poll(async () => samePem((await fetchStored(page, fw.id)).reader, otherPk)).toBe(true);
            const stored = await fetchStored(page, fw.id);
            expect(stored.owner).not.toContain(otherPk);

            // The reader sees the private framework, read-only (opened in-app: by URL it fails, see
            // 'SHARE-01 a reader opens a shared private framework by its link').
            const other = await openAs(browser, otherAccount, fw, { visibleText: fw.competency });
            try {
                await expect(other.page.getByText(fw.name).first()).toBeVisible();
                await expect(addButton(other.page)).toHaveCount(0);
                await expect(editIcon(other.page)).toHaveCount(0);
            } finally {
                await other.context.close();
            }
            expect(problems(console)).toEqual([]);
        });

        test('a reader opens a shared private framework by its link (known bug: lands on the frameworks list) @P1', async ({ app, page, browser, account, otherAccount }) => {
            test.fail(true, 'Opening a private framework by URL (share link or #/framework/<id>) as its reader lands on the frameworks list; see e2e/FINDINGS.md');
            test.slow(); // Making it private, a share, and a reader login in another context.
            const otherPk = await publicKeyOf(browser, otherAccount);
            await app.login(account);
            const fw = await openOwnedFramework(app, page, 'Share link');
            const modal = await openShareModal(page);
            await waitForRoles(modal, { [account.name]: 'admin' });
            await modal.getByRole('button', { name: 'Private', exact: true }).click();
            await modal.getByRole('button', { name: /confirm make private/i }).click();
            await expect(modal.getByRole('button', { name: 'Private', exact: true })).not.toHaveClass(/is-outlined/);
            await shareWith(modal, otherAccount, 'view');
            await waitForRoles(modal, { [otherAccount.name]: 'view' });
            await expect.poll(async () => samePem((await fetchStored(page, fw.id)).reader, otherPk)).toBe(true);
            const shareLink = (await modal.locator('.share-url').textContent()).trim();
            expect(shareLink).toContain(`frameworkId=${fw.id}`);

            const context = await browser.newContext();
            try {
                const page2 = await context.newPage();
                const app2 = new App(page2);
                await app2.setSavedIdentities(otherAccount.identities);
                // The Share modal's "Shareable link" ...
                await page2.goto(shareLink);
                await app2.ready();
                await expect.poll(() => page2.evaluate(() => EcIdentityManager.default.ids.length)).toBeGreaterThan(0);
                await expect.soft(page2.getByText(fw.competency).first()).toBeVisible({ timeout: 30_000 });
                // ... and the framework's own URL (the saved login is kept across loads).
                await app2.open(`/framework/${encodeURIComponent(fw.id)}`);
                await expect.soft(page2.getByText(fw.competency).first()).toBeVisible({ timeout: 30_000 });
                await expect(page2).toHaveURL(/#\/framework\//);
            } finally {
                await context.close();
            }
        });
    });

    test.describe('SHARE-02 remove owner guard', () => {
        test('the sole owner of a private framework cannot remove themselves @P1', async ({ app, page, account }) => {
            await app.login(account);
            await openOwnedFramework(app, page, 'Owner guard private');
            const modal = await openShareModal(page);
            await modal.getByRole('button', { name: 'Private', exact: true }).click();
            await modal.getByRole('button', { name: /confirm make private/i }).click();
            await expect(modal.getByRole('button', { name: 'Private', exact: true })).not.toHaveClass(/is-outlined/);
            await waitForRoles(modal, { [account.name]: 'admin' });
            const removeMe = userRow(modal, account.name).locator('button');
            await expect(removeMe).toHaveJSProperty('tagName', 'BUTTON');
            await expect(removeMe).toBeDisabled();
        });

        test('the sole owner of a public framework may remove themselves @P1', async ({ app, page, account, console }) => {
            await app.login(account);
            const fw = await openOwnedFramework(app, page, 'Owner guard public');
            expect((await fetchStored(page, fw.id)).owner).toEqual([await app.publicKey()]);
            const modal = await openShareModal(page);
            await waitForRoles(modal, { [account.name]: 'admin' });
            const removeMe = userRow(modal, account.name).locator('button');
            await expect(removeMe).toHaveJSProperty('tagName', 'BUTTON');
            await expect(removeMe).toBeEnabled();
            await removeMe.click();
            await expect(userRow(modal, account.name)).toHaveCount(0);
            // Owned by nobody (so editable by everybody), framework and competencies alike.
            await expect.poll(async () => (await fetchStored(page, fw.id)).owner ?? []).toEqual([]);
            await expect.poll(async () => (await fetchStored(page, fw.competencies[fw.competency])).owner ?? []).toEqual([]);
            expect(storedType(await fetchStored(page, fw.id))).toBe('Framework');
            expect(problems(console)).toEqual([]);
        });

        test('removing another owner and a reader works @P1', async ({ app, page, browser, account, otherAccount, console }) => {
            // Another user's login, two shares and two removals, each re-saving the framework.
            test.slow();
            const otherPk = await publicKeyOf(browser, otherAccount);
            await app.login(account);
            const me = await app.publicKey();
            const fw = await openOwnedFramework(app, page, 'Remove others');
            const modal = await openShareModal(page);
            await waitForRoles(modal, { [account.name]: 'admin' });

            // Another owner …
            await shareWith(modal, otherAccount, 'admin');
            await waitForRoles(modal, { [account.name]: 'admin', [otherAccount.name]: 'admin' });
            await expect.poll(async () => samePem((await fetchStored(page, fw.id)).owner, otherPk)).toBe(true);
            await expect(userRow(modal, otherAccount.name).locator('button')).toBeEnabled();
            await userRow(modal, otherAccount.name).locator('button').click();
            await expect(userRow(modal, otherAccount.name)).toHaveCount(0);
            await expect.poll(async () => (await fetchStored(page, fw.id)).owner).toEqual([me]);

            // … and a reader (private frameworks only).
            await modal.getByRole('button', { name: 'Private', exact: true }).click();
            await modal.getByRole('button', { name: /confirm make private/i }).click();
            await expect(modal.getByRole('button', { name: 'Private', exact: true })).not.toHaveClass(/is-outlined/);
            await shareWith(modal, otherAccount, 'view');
            await waitForRoles(modal, { [account.name]: 'admin', [otherAccount.name]: 'view' });
            await expect.poll(async () => samePem((await fetchStored(page, fw.id)).reader, otherPk)).toBe(true);
            await userRow(modal, otherAccount.name).locator('button').click();
            await expect(userRow(modal, otherAccount.name)).toHaveCount(0);
            await expect.poll(async () => samePem((await fetchStored(page, fw.id)).reader, otherPk)).toBe(false);
            expect((await fetchStored(page, fw.id)).owner).toContain(me);
            expect(problems(console)).toEqual([]);
        });
    });

    test('SHARE-03 make public / make private @P1', async ({ app, page, browser, account, console }) => {
        // Two make-private/make-public round trips and two anonymous contexts.
        test.slow();
        await app.login(account);
        const fw = await openOwnedFramework(app, page, 'Public private');
        const modal = await openShareModal(page);
        const publicButton = modal.getByRole('button', { name: 'Public', exact: true });
        const privateButton = modal.getByRole('button', { name: 'Private', exact: true });
        await expect(publicButton).not.toHaveClass(/is-outlined/);
        await expect(privateButton).toHaveClass(/is-outlined/);

        // Cancel leaves it public.
        await privateButton.click();
        await expect(modal.getByRole('heading', { name: 'Confirm make private' })).toBeVisible();
        await modal.locator('button', { hasText: /^\s*cancel\s*$/i }).click();
        await expect(modal.getByRole('heading', { name: 'Confirm make private' })).toHaveCount(0);
        await expect(privateButton).toHaveClass(/is-outlined/);
        expect(storedType(await fetchStored(page, fw.id))).toBe('Framework');

        // Confirm: the buttons are disabled while the save is in flight.
        let release;
        const gate = new Promise((resolve) => { release = resolve; });
        await page.route(/sky\/repo\/multiPut/, async (route) => {
            await gate;
            await route.fallback();
        });
        await privateButton.click();
        const confirmPrivate = modal.getByRole('button', { name: /confirm make private/i });
        await confirmPrivate.click();
        await expect(modal.getByText('Processing request...')).toBeVisible();
        await expect(confirmPrivate).toBeDisabled();
        await expect(modal.locator('button', { hasText: /^\s*cancel\s*$/i })).toBeDisabled();
        release(); // The handler stays installed but no longer holds anything back.
        await expect(modal.getByText('Processing request...')).toHaveCount(0);
        await expect(privateButton).not.toHaveClass(/is-outlined/);
        await expect.poll(async () => storedType(await fetchStored(page, fw.id))).toBe('EncryptedValue');
        expect(storedType(await fetchStored(page, fw.competencies[fw.competency]))).toBe('EncryptedValue');

        // Anonymous visitors cannot see it.
        let anon = await openAs(browser, null, fw);
        try {
            await anon.page.waitForLoadState('networkidle');
            await expect(anon.page.getByText(fw.competency)).toHaveCount(0);
            await expect(anon.page.getByText(fw.name)).toHaveCount(0);
        } finally {
            await anon.context.close();
        }

        // Back to public, through the "make public" confirmation.
        await publicButton.click();
        await expect(modal.getByRole('heading', { name: 'Confirm make public' })).toBeVisible();
        await modal.locator('button', { hasText: /^\s*cancel\s*$/i }).click();
        await expect(modal.getByRole('heading', { name: 'Confirm make public' })).toHaveCount(0);
        await expect(publicButton).toHaveClass(/is-outlined/);
        await publicButton.click();
        await modal.getByRole('button', { name: /confirm make public/i }).click();
        await expect(modal.getByRole('heading', { name: 'Confirm make public' })).toHaveCount(0);
        await expect(publicButton).not.toHaveClass(/is-outlined/);
        await expect.poll(async () => storedType(await fetchStored(page, fw.id))).toBe('Framework');
        await expect.poll(async () => storedType(await fetchStored(page, fw.competencies[fw.competency]))).toBe('Competency');

        // Anonymous visitors can see it again (read-only).
        anon = await openAs(browser, null, fw, { visibleText: fw.competency });
        try {
            await expect(addButton(anon.page)).toHaveCount(0);
        } finally {
            await anon.context.close();
        }
        expect(problems(console)).toEqual([]);
    });
});
