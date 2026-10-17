// TEST-CASES.md §1 Authentication (AUTH-01 … AUTH-05).
import { test, expect, unique } from '../support/fixtures.js';

const userChip = (page) => page.locator('.cass-editor__logged-in-user-icon');
const sideNavLogin = (page) => page.locator('#app').getByText('login', { exact: true }).first();
const newButton = (page) => page.getByText(/^\s*new\s*$/i);
// Controls that only appear on a framework the user may edit.
const addButton = (page) => page.getByText(/^\s*add\s*$/i);
const editIcon = (page) => page.locator('.fa-edit');

test.describe('Authentication', () => {
    test('AUTH-01 create account via legacy login logs the user in @P0', async ({ app, page }) => {
        const id = Date.now().toString(36);
        const account = { name: 'Ada Lovelace', email: `ada-${id}@example.com`, username: `ada${id}`, password: `Pw-${id}!` };
        await app.createAccount(account);
        await expect(page).toHaveURL(/#\/frameworks/);
        await expect(userChip(page)).toBeVisible();
        // The chip shows the first two characters of the email (TEST-CASES.md says "initials").
        await expect(userChip(page)).toHaveText('ad');
        await expect(userChip(page).locator('span').first()).toHaveAttribute('title', 'Signed in as: Ada Lovelace');
    });

    test('AUTH-02 login and logout @P0', async ({ app, page, account }) => {
        await app.loginViaForm(account);
        await expect(userChip(page)).toBeVisible();
        await expect(newButton(page).first()).toBeVisible();

        await app.logout();
        await expect(page.locator('.modal.is-active, .modal-card').filter({ hasText: /log(ged)? ?out/i }).first()).toBeVisible();
        await app.go('/frameworks');
        await expect(userChip(page)).toHaveCount(0);
        await expect(sideNavLogin(page)).toBeVisible();
        // Logged-out users can still create frameworks (owned by nobody).
        await expect(newButton(page).first()).toBeVisible();
    });

    test('AUTH-03 login with a wrong password shows an error and keeps the form usable @P1', async ({ app, page, account }) => {
        await app.open('/legacyLogin');
        const inputs = page.locator('#login input');
        await inputs.nth(0).fill(account.username);
        await inputs.nth(1).fill('not the password');
        await page.locator('#login').getByText('login', { exact: true }).click();
        await expect(page.locator('#login').getByText(/login failed|does not exist|invalid/i).first()).toBeVisible();
        await expect(page).toHaveURL(/legacyLogin/);

        // The form still works.
        await inputs.nth(1).fill(account.password);
        await page.locator('#login').getByText('login', { exact: true }).click();
        await expect(page).toHaveURL(/#\/frameworks/, { timeout: 60_000 });
    });

    test.describe('AUTH-04 account-creation validation @P1', () => {
        const openCreate = async (app, page) => {
            await app.open('/legacyLogin');
            const inputs = page.locator('#login input');
            await expect(async () => {
                await page.getByText('create account', { exact: true }).click({ timeout: 5_000 });
                await expect(inputs).toHaveCount(5, { timeout: 2_000 });
            }).toPass({ timeout: 45_000 });
            return inputs;
        };
        const create = (page) => page.locator('#login').getByText('create', { exact: true }).click();
        const errors = (page) => page.locator('#login .has-text-danger');

        test('empty fields', async ({ app, page }) => {
            await openCreate(app, page);
            await create(page);
            await expect(errors(page).first()).toBeVisible();
            await expect(page).toHaveURL(/legacyLogin/);
        });

        test('mismatched passwords', async ({ app, page }) => {
            const inputs = await openCreate(app, page);
            const id = Date.now().toString(36);
            await inputs.nth(0).fill('Mismatch User');
            await inputs.nth(1).fill(`mismatch-${id}@example.com`);
            await inputs.nth(2).fill(`mismatch${id}`);
            await inputs.nth(3).fill('Password-One-1');
            await inputs.nth(4).fill('Password-Two-2');
            await create(page);
            await expect(page.locator('#login').getByText(/match/i).first()).toBeVisible();
            await expect(page).toHaveURL(/legacyLogin/);
        });

        test('taken username', async ({ app, page, account }) => {
            const inputs = await openCreate(app, page);
            await inputs.nth(0).fill('Duplicate User');
            await inputs.nth(1).fill(`dup-${Date.now()}@example.com`);
            await inputs.nth(2).fill(account.username);
            await inputs.nth(3).fill('Another-Pw-1');
            await inputs.nth(4).fill('Another-Pw-1');
            await create(page);
            await expect(page.locator('#login').getByText(/unavailable|taken|exists/i).first()).toBeVisible();
            await expect(page).toHaveURL(/legacyLogin/);
        });
    });

    test.describe('AUTH-05 anonymous (logged-out) users @P1', () => {
        test('frameworks someone owns are read-only', async ({ app, page, account }) => {
            await app.login(account);
            const framework = await app.seedFramework({ name: unique('Anonymous view'), competencies: ['Visible competency'] });
            await app.waitIndexed(`@id:"${framework.id}"`);

            await app.becomeAnonymous('/frameworks');
            await expect(userChip(page)).toHaveCount(0);

            await app.open('/framework', { frameworkId: framework.id });
            await expect(page.getByText('Visible competency').first()).toBeVisible();
            await expect(addButton(page)).toHaveCount(0);
            await expect(editIcon(page)).toHaveCount(0);
        });

        // Known bug: the toolbar's copy / cut / paste / clipboard buttons still show on a framework the
        // user cannot edit. This test describes the expected behaviour and is marked as failing until the
        // editor hides them; when it starts passing, remove the test.fail() line.
        test('frameworks someone owns hide the copy/cut/paste toolbar (known bug: still shown)', async ({ app, page, account }) => {
            test.fail(true, 'Copy/cut/paste/clipboard toolbar buttons are shown on frameworks the user cannot edit; see TEST-CASES.md AUTH-05.');
            await app.login(account);
            const framework = await app.seedFramework({ name: unique('Anonymous toolbar'), competencies: ['Toolbar competency'] });
            await app.waitIndexed(`@id:"${framework.id}"`);
            await app.becomeAnonymous('/frameworks');
            await app.open('/framework', { frameworkId: framework.id });
            await expect(page.getByText('Toolbar competency').first()).toBeVisible();
            await expect(page.locator('#framework .fa-copy, #framework .fa-cut, #framework .fa-paste, #framework .fa-clipboard')).toHaveCount(0, { timeout: 5_000 });
        });

        test('a framework created while logged out is owned by nobody and editable by everybody', async ({ app, page, account }) => {
            await app.becomeAnonymous('/frameworks');
            await newButton(page).first().click();
            await page.locator('.dropdown-item', { hasText: /^\s*Framework\s*$/ }).click();
            await expect(page).toHaveURL(/#\/framework\//);
            const frameworkUrl = page.url();
            const id = decodeURIComponent(frameworkUrl.split('#/framework/')[1].split('?')[0]);
            await expect.poll(() => app.fetchObject(id)).not.toBeNull();
            const saved = await app.fetchObject(id);
            expect(saved.owner ?? []).toEqual([]);

            // Anyone who logs in can edit it.
            await app.login(account);
            await page.goto(frameworkUrl);
            await app.ready();
            await expect(page.getByText('New Framework').first()).toBeVisible();
            await expect(addButton(page).first()).toBeVisible();
            await expect(editIcon(page).first()).toBeVisible();
        });
    });
});
