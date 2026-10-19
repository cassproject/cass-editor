// TEST-CASES.md §9 Directories (DIR-01 … DIR-04).
import { test, expect, unique, problems } from '../support/fixtures.js';
import {
    seedDirectory, seedFrameworkInDirectory, selectedDirectory, openDirectory,
    directoryList, listRow, chooseNew, openNewForm,
} from '../support/directories.js';

const activeModal = (page) => page.locator('.modal.is-active');
const breadcrumb = (page) => page.locator('nav.breadcrumb');
const rightAside = (page) => page.locator('#cass__right-aside');

/** Opens the open directory's delete confirmation from its side panel; returns the modal. */
async function openDeleteDirectory(page) {
    const modal = activeModal(page).filter({ hasText: 'Are you sure?' });
    // The side panel's link is not clickable until the panel has rendered the directory.
    await expect(async () => {
        await rightAside(page).getByText('delete directory', { exact: true }).click({ timeout: 5_000 });
        await expect(modal).toBeVisible({ timeout: 5_000 });
    }).toPass({ timeout: 30_000 });
    return modal;
}

test.describe('Directories', () => {
    test('DIR-01 create a directory and a subdirectory @P1', async ({ app, page, account, console: log }) => {
        await app.login(account);
        const me = await app.publicKey();
        const parentName = unique('Dir');
        const childName = unique('Subdir');

        // Frameworks list → new → Directory.
        let modal = await openNewForm(page, 'Directory', 'Create directory');
        const create = modal.getByRole('button', { name: /^\s*Create\s*$/ });
        const createAnother = modal.getByRole('button', { name: /Create and add another/ });
        // Empty name: create is disabled.
        await expect(create).toBeDisabled();
        await expect(createAnother).toBeDisabled();
        await modal.getByPlaceholder('Name of new directory').fill(parentName);
        await expect(create).toBeEnabled();
        await create.click();

        // The new directory opens.
        await expect(page).toHaveURL(/#\/directory/);
        await expect(breadcrumb(page)).toContainText(parentName);
        await expect.poll(async () => (await selectedDirectory(page))?.name).toBe(parentName);
        const parentId = (await selectedDirectory(page)).id;
        const parent = await app.fetchObject(parentId);
        expect(parent).toMatchObject({ '@type': 'Directory', name: parentName });
        expect(parent.owner).toContain(me);
        expect(parent.parentDirectory).toBeUndefined();

        // Inside it: new → Sub directory.
        modal = await openNewForm(page, 'Sub directory', 'Create directory');
        await expect(modal.getByRole('button', { name: /^\s*Create\s*$/ })).toBeDisabled();
        await modal.getByPlaceholder('Name of new directory').fill(childName);
        await expect(modal.getByRole('button', { name: /^\s*Create\s*$/ })).toBeEnabled();
        await modal.getByRole('button', { name: /^\s*Create\s*$/ }).click();
        await expect(activeModal(page).filter({ hasText: 'Create directory' })).toHaveCount(0);

        // The subdirectory opens, under its parent in the breadcrumb trail.
        await expect.poll(async () => (await selectedDirectory(page))?.name).toBe(childName);
        const childId = (await selectedDirectory(page)).id;
        await expect(breadcrumb(page).locator('li')).toHaveText([/CaSS/, parentName, childName]);
        const child = await app.fetchObject(childId);
        expect(child).toMatchObject({ '@type': 'Directory', name: childName, parentDirectory: parentId });
        expect(child.owner).toContain(me);

        // The tree renders: the parent lists the subdirectory.
        await app.waitIndexed(`@id:"${childId}"`);
        // The parent in the breadcrumb trail opens it, staying in the directory view (regression:
        // <a href="#"> also navigated to the Welcome page).
        await breadcrumb(page).getByText(parentName, { exact: true }).click();
        await expect.poll(async () => (await selectedDirectory(page))?.id).toBe(parentId);
        await expect(page).toHaveURL(/#\/directory/);
        await expect(breadcrumb(page).locator('li')).toHaveText([/CaSS/, parentName]);
        await expect(listRow(page, childName)).toBeVisible();
        await expect(listRow(page, childName).locator('.fa-folder')).toBeVisible();
        expect(problems(log)).toEqual([]);
    });

    test('DIR-02 add a framework and a resource to a directory @P1', async ({ app, page, account, console: log }) => {
        await app.login(account);
        const me = await app.publicKey();
        const dirName = unique('Dir items');
        const dirId = await seedDirectory(page, { name: dirName });
        await openDirectory(app, dirId);

        // New → Resource: the URL is validated.
        const resourceName = unique('Resource');
        // The form opens over the directory (regression: the <a href="#"> item also navigated to Welcome).
        const modal = await openNewForm(page, 'Resource', 'Create resource');
        await expect(page).toHaveURL(/#\/directory/);
        await expect(breadcrumb(page)).toContainText(dirName);
        const create = modal.getByRole('button', { name: /^\s*Create\s*$/ });
        await expect(create).toBeDisabled();
        await modal.getByPlaceholder('Name of new resource').fill(resourceName);
        const url = modal.getByPlaceholder('Url of new resource');
        await url.fill('example.com/no-scheme');
        await expect(modal.getByText("url must start with 'http://' or 'https://'")).toBeVisible();
        await expect(create).toBeDisabled();
        // Any valid URL is accepted, whatever its scheme.
        await url.fill('ftp://example.com/e2e/file');
        await expect(modal.getByText("url must start with")).toHaveCount(0);
        await expect(create).toBeEnabled();
        await url.fill('https://example.com/e2e/resource');
        await expect(modal.getByText("url must start with")).toHaveCount(0);
        await expect(create).toBeEnabled();
        await create.click();
        // The form closes once CaSS confirms the save.
        await expect(modal).toBeHidden({ timeout: 30_000 });
        await expect(page).toHaveURL(/#\/directory/);

        // The resource is saved in the directory and listed.
        // The editor shows the new resource in the side panel.
        const asideObject = () => page.evaluate(() => {
            const o = window.app.$pinia._s.get('app').rightAsideObject;
            return o ? { id: o.shortId(), type: o.type } : null;
        });
        await expect.poll(async () => (await asideObject())?.type).toBe('CreativeWork');
        const resourceId = (await asideObject()).id;
        const resource = await app.fetchObject(resourceId);
        expect(resource).toMatchObject({ '@type': 'CreativeWork', name: resourceName, url: 'https://example.com/e2e/resource', directory: dirId });
        expect(resource.owner).toContain(me);
        await expect(listRow(page, resourceName)).toBeVisible();
        await expect(listRow(page, resourceName).locator('.fa-paperclip')).toBeVisible();

        // New → Framework creates a framework in the directory and opens it.
        await chooseNew(page, 'Framework');
        await expect(page).toHaveURL(/#\/framework\//);
        await expect(page.locator('#framework-content')).toBeVisible();
        await expect(page.getByTitle('Framework configuration')).toBeVisible();
        const frameworkId = decodeURIComponent(page.url().split('#/framework/')[1].split('?')[0]);
        await expect.poll(() => app.fetchObject(frameworkId)).not.toBeNull();
        const framework = await app.fetchObject(frameworkId);
        expect(framework).toMatchObject({ '@type': 'Framework', directory: dirId });
        expect(framework.owner).toContain(me);

        // Back in the directory, both items are listed.
        await app.waitIndexed(`@id:"${frameworkId}"`);
        await openDirectory(app, dirId);
        await expect(directoryList(page).locator('li.cass--list--item').filter({ has: page.locator('.fa-file-alt') })).toHaveCount(1);
        await expect(listRow(page, 'New Framework')).toBeVisible();
        await expect(listRow(page, resourceName)).toBeVisible();
        expect(problems(log)).toEqual([]);
    });

    test('DIR-03 owned-by-me filter in a directory @P1', async ({ app, page, account, console: log }) => {
        await app.login(account);
        const dirId = await seedDirectory(page, { name: unique('Dir filter') });
        const mine = unique('Mine');
        const theirs = unique('Theirs');
        const mineId = await seedFrameworkInDirectory(page, { name: mine, directory: dirId });
        const theirsId = await seedFrameworkInDirectory(page, { name: theirs, directory: dirId, foreign: true });
        await app.waitIndexed(`@id:"${mineId}"`);
        await app.waitIndexed(`@id:"${theirsId}"`);
        await openDirectory(app, dirId);
        await expect(listRow(page, mine)).toBeVisible();
        await expect(listRow(page, theirs)).toBeVisible();

        // Filters → Owned by me.
        await page.locator('#directory').getByTitle('Filters', { exact: true }).click();
        const ownedByMe = page.locator('.cass--right-aside--content label[for="ownedByMe"]');
        await expect(ownedByMe).toHaveText(/Owned by me/);
        await ownedByMe.click();
        await expect(page.locator('.cass--right-aside--content input#ownedByMe')).toBeChecked();
        await expect(listRow(page, theirs)).toHaveCount(0);
        await expect(listRow(page, mine)).toBeVisible();

        // Turning it off shows everything again.
        await ownedByMe.click();
        await expect(listRow(page, theirs)).toBeVisible();
        await expect(listRow(page, mine)).toBeVisible();
        // Regression (setSingleQuickFilter): no TypeError or other console errors.
        expect(problems(log)).toEqual([]);
    });

    test.describe('DIR-04 directory sharing and deletion @P2', () => {
        test('share a directory with another user', async ({ app, page, account, otherAccount, console: log }) => {
            // The other user must exist as a person CaSS can list; log in once so the editor knows its key.
            await app.login(otherAccount);
            const otherKey = await app.publicKey();

            await app.login(account);
            const me = await app.publicKey();
            const dirName = unique('Dir shared');
            const dirId = await seedDirectory(page, { name: dirName });
            await openDirectory(app, dirId);

            const aside = rightAside(page);
            await expect(aside.getByText(dirName).first()).toBeVisible();
            await aside.getByRole('button', { name: /^\s*Users/ }).click();
            await aside.getByText('Manage Permissions / Share Framework').click();
            const modal = activeModal(page).filter({ hasText: 'Share directory' });
            await expect(modal).toBeVisible();
            await expect(modal).toContainText(`Sharing settings for ${dirName}`);

            // The modal lists users: the other user can be found and added as an admin.
            const search = modal.getByPlaceholder('search');
            const option = modal.locator('.auto li', { hasText: otherAccount.email });
            await expect(async () => {
                await search.fill('');
                await search.pressSequentially(otherAccount.name.slice(0, 12));
                await expect(option).toBeVisible({ timeout: 2_000 });
            }).toPass({ timeout: 30_000 });
            await option.dispatchEvent('mousedown');
            await expect(search).toHaveValue(otherAccount.name);
            await modal.getByText('Add Selection').click();
            await expect(modal.locator('table')).toContainText(otherAccount.email, { timeout: 30_000 });

            await expect.poll(async () => (await app.fetchObject(dirId)).owner ?? []).toContain(otherKey);
            expect((await app.fetchObject(dirId)).owner).toContain(me);
            await modal.getByRole('button', { name: 'Done' }).click();
            await expect(modal).toBeHidden();
            expect(problems(log)).toEqual([]);
        });

        test('delete a directory', async ({ app, page, account, console: log }) => {
            await app.login(account);
            const dirName = unique('Dir delete');
            const dirId = await seedDirectory(page, { name: dirName });
            await seedFrameworkInDirectory(page, { name: unique('In deleted dir'), directory: dirId });
            await app.waitIndexed(`@id:"${dirId}"`);
            await openDirectory(app, dirId);

            const modal = await openDeleteDirectory(page);
            await expect(modal).toContainText(dirName);
            const confirm = modal.getByRole('button', { name: 'Delete Directory' });
            // The name must be typed to enable the delete.
            await expect(confirm).toBeDisabled();
            await modal.locator('input').fill('wrong name');
            await expect(confirm).toBeDisabled();
            await modal.locator('input').fill(dirName);
            await expect(confirm).toBeEnabled();
            await confirm.click();

            await expect(page).toHaveURL(/#\/frameworks/);
            await expect(modal).toBeHidden();
            await expect.poll(() => app.fetchObject(dirId)).toBeNull();
            // Its contents: see 'DIR-04 deleting a directory deletes its frameworks (known bug: ...)'.
            expect(problems(log)).toEqual([]);
        });

        test('DIR-04 deleting a directory deletes its frameworks (known bug: frameworks are left behind, pointing at the deleted directory) @P2', async ({ app, page, account }) => {
            test.fail(true, 'DeleteDirectoryConfirm.vue only deletes the ids listed in the directory record arrays, which the editor never fills, so frameworks with framework.directory survive; see e2e/FINDINGS.md');
            await app.login(account);
            const dirName = unique('Dir delete contents');
            const dirId = await seedDirectory(page, { name: dirName });
            const frameworkName = unique('In deleted dir');
            const frameworkId = await seedFrameworkInDirectory(page, { name: frameworkName, directory: dirId });
            await app.waitIndexed(`@id:"${frameworkId}"`);
            await openDirectory(app, dirId);
            await expect(listRow(page, frameworkName)).toBeVisible();

            // The confirm modal promises the contents go too.
            const modal = await openDeleteDirectory(page);
            await modal.locator('input').fill(dirName);
            await modal.getByRole('button', { name: 'Delete Directory' }).click();
            await expect(page).toHaveURL(/#\/frameworks/);
            await expect.poll(() => app.fetchObject(dirId)).toBeNull();
            await expect.poll(() => app.fetchObject(frameworkId), { timeout: 15_000 }).toBeNull();
        });

        test('cancel deleting a directory keeps it', async ({ app, page, account }) => {
            await app.login(account);
            const dirName = unique('Dir keep');
            const dirId = await seedDirectory(page, { name: dirName });
            await openDirectory(app, dirId);
            const modal = await openDeleteDirectory(page);
            await modal.getByRole('button', { name: 'Cancel' }).click();
            await expect(modal).toBeHidden();
            await expect(page).toHaveURL(/#\/directory/);
            expect(await app.fetchObject(dirId)).toMatchObject({ name: dirName });
        });
    });
});
