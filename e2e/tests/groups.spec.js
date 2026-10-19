// TEST-CASES.md §13 Users & groups (GRP-01 … GRP-03).
import { test, expect, unique, problems } from '../support/fixtures.js';
import { App } from '../support/app.js';
import { publicKeyOf } from '../support/assertions.js';
import { fetchStored, openSeededFramework, openShareModal, shareWith, waitForRoles } from '../support/sharing.js';

const editor = (page) => page.locator('#user-groups');
// Its accessible name also holds the icon's "+"; the label itself is the button's text.
const createGroupButton = (page) => editor(page).locator('button', { hasText: 'create new group' });
const groupInList = (page, name) => editor(page).locator('.cass-left-panel a.panel-block', { hasText: name });
const actions = (page) => editor(page).locator('.cass-group--actions');
const saveButton = (page) => actions(page).locator('button[title="Save group"]');
const discardButton = (page) => actions(page).locator('button[title="Cancel group changes"]');
const nameHeading = (page) => editor(page).locator('h3.subtitle').first();
const lengthWarning = (page) => editor(page).getByText('Group name length max is 60 characters', { exact: false });
// The group's members table (not the hidden "add members" modal's table of candidates).
const memberRow = (page, name) => editor(page).locator('.pt-3 > .table-container tbody tr', { hasText: name });

/**
 * Logs in and opens the groups page from the side navigation ("Groups").
 * APP BUG (e2e/FINDINGS.md): loading #/users directly as a logged-in user can land on the welcome
 * page: App.vue's currentRoute watcher pushes '/' when the route is /users and isLoggedIn is still
 * false, which it is while the person record loads. Not reproducible on demand (a direct load
 * worked in every isolated attempt, even with a slowed /ping), so no known-bug test; this goes
 * through the side navigation instead.
 */
async function openGroups(app, page, account) {
    await app.login(account);
    // "Groups" only appears once the editor has found the user's person record, and the editor
    // treats the user as logged in (for #/users) only from then on.
    const groupsLink = page.locator('#app a[href*="#/users"]', { hasText: 'Groups' });
    await expect(groupsLink).toBeVisible({ timeout: 60_000 });
    await expect(async () => {
        await groupsLink.click();
        await expect(page).toHaveURL(/#\/users/, { timeout: 5_000 });
    }).toPass({ timeout: 60_000 });
    await groupsReady(page);
}

/** Waits until the group editor has loaded people and groups (its busy modal is gone). */
async function groupsReady(page) {
    await expect(editor(page)).toBeVisible({ timeout: 60_000 });
    await expect(page.locator('.modal.is-active', { hasText: 'Processing Request' })).toHaveCount(0, { timeout: 60_000 });
}

/** Opens the name editor and types a new name (the editor only notices key presses). */
async function typeGroupName(page, name) {
    const input = editor(page).locator('.field', { hasText: 'Group Name' }).locator('input');
    if (!(await input.isVisible())) await editor(page).locator('.users-edit-icon').click();
    await expect(input).toBeVisible();
    await input.fill('');
    await input.pressSequentially(name, { delay: 0 });
    return input;
}

/** Adds people to the open group through the "+ member" modal. role: 'member' or 'manager'. */
async function addMember(page, name, role = 'member') {
    await actions(page).locator('[title="Add group members"]').click();
    const modal = page.locator('.modal.is-active', { hasText: 'Add members to' });
    await expect(modal).toBeVisible();
    await modal.getByPlaceholder('search for person...').fill(name);
    const row = modal.locator('tbody tr', { hasText: name });
    await row.locator(`input[title="Add as ${role}"]`).check();
    await modal.locator('[title="Apply new members"]').click();
    await expect(modal).toHaveCount(0);
    await expect(memberRow(page, name)).toContainText(role);
}

/** Removes a person from the open group (unsaved). */
async function removeMember(page, name) {
    await memberRow(page, name).locator('[title="Remove member"]').click();
    await expect(memberRow(page, name)).toHaveCount(0);
}

/** Creates a group through the editor (logged-in page on #/users) and returns its stored id. */
async function createGroup(page, name, { members = [] } = {}) {
    await createGroupButton(page).click();
    await expect(nameHeading(page)).toHaveText('New User Group');
    await typeGroupName(page, name);
    await editor(page).getByRole('button', { name: 'done editing' }).click();
    for (const member of members) await addMember(page, member);
    await saveButton(page).click();
    await groupsReady(page); // The save reloads people and groups; wait for it to finish.
    await expect(groupInList(page, name)).toBeVisible({ timeout: 60_000 });
    await expect(saveButton(page)).toHaveCount(0);
    return await groupId(page, name);
}

/** The id of the (unique) group with this name, once CaSS search finds it. */
async function groupId(page, name) {
    let id = null;
    await expect.poll(async () => {
        id = await page.evaluate(async (name) => {
            const groups = await EcOrganization.search(window.repo, `"${name}"`, null, null, { size: 20 });
            return groups.find((g) => g.getName() === name)?.shortId() ?? null;
        }, name);
        return id;
    }, { timeout: 30_000 }).not.toBeNull();
    return id;
}

/** The stored group, decrypted as the logged-in user: { name, description, employee, owner, reader }. */
async function readGroup(page, id) {
    return await page.evaluate(async (id) => {
        const groups = await EcOrganization.search(window.repo, `@id:"${id}"`, null, null, { size: 5 });
        const g = groups.find((x) => x.shortId() === id);
        if (!g) return null;
        return { name: g.getName(), description: g.getDescription(), employee: g.employee || [], owner: g.owner || [], reader: g.reader || [] };
    }, id);
}

/** The id of a person record (what group.employee lists), by the person's unique name. */
async function personId(page, name) {
    return await page.evaluate(async (name) => {
        const people = await EcPerson.search(window.repo, `"${name}"`, null, null, { size: 20 });
        return people.find((p) => p.getName() === name)?.shortId() ?? null;
    }, name);
}

test.describe('Users & groups', () => {
    test('GRP-01 create group @P1', async ({ app, page, account, console }) => {
        // Logged out: no "Groups" in the side navigation, and #/users redirects to the welcome page
        // (App.vue currentRoute watcher).
        await app.becomeAnonymous('/users');
        await expect(page.locator('#app a[href*="#/users"]', { hasText: 'Groups' })).toHaveCount(0);
        await expect(page).not.toHaveURL(/#\/users/, { timeout: 60_000 });

        // Logged in: create, name and save.
        await openGroups(app, page, account);
        await expect(createGroupButton(page)).toHaveText('create new group');
        await expect(createGroupButton(page)).toBeEnabled();
        const name = unique('Group create');
        const id = await createGroup(page, name);
        await expect(nameHeading(page)).toHaveText(name);
        await expect(memberRow(page, account.name)).toContainText('manager');

        const me = await app.publicKey();
        const stored = await readGroup(page, id);
        expect(stored).toMatchObject({ name, description: 'New group of users' });
        expect(stored.owner).toContain(me);
        expect(stored.employee).toContain(await personId(page, account.name));

        // It is still listed after a reload.
        await openGroups(app, page, account);
        await expect(groupInList(page, name)).toBeVisible();
        expect(problems(console)).toEqual([]);
    });

    test.describe('GRP-02 edit group', () => {
        test('name length limit @P1', async ({ app, page, account }) => {
            await openGroups(app, page, account);
            const name = unique('Group length');
            await createGroup(page, name);

            await typeGroupName(page, 'x'.repeat(61));
            const done = editor(page).getByRole('button', { name: 'done editing' });
            await expect(lengthWarning(page)).toBeVisible();
            await expect(done).toHaveJSProperty('tagName', 'BUTTON');
            await expect(done).toBeDisabled();
            // Exactly 60 is allowed.
            await typeGroupName(page, 'y'.repeat(60));
            await expect(lengthWarning(page)).toHaveCount(0);
            await expect(done).toBeEnabled();
            await done.click();
            await expect(nameHeading(page)).toHaveText('y'.repeat(60));
            // Discard restores the saved name.
            await discardButton(page).click();
            await expect(nameHeading(page)).toHaveText(name);
        });

        test('save and discard buttons @P1', async ({ app, page, account }) => {
            await openGroups(app, page, account);
            const name = unique('Group buttons');
            const id = await createGroup(page, name);

            // Unchanged: no save / discard.
            await expect(saveButton(page)).toHaveCount(0);
            await expect(discardButton(page)).toHaveCount(0);

            // A change shows them as enabled native buttons.
            const renamed = unique('Group renamed');
            await typeGroupName(page, renamed);
            await expect(saveButton(page)).toHaveJSProperty('tagName', 'BUTTON');
            await expect(discardButton(page)).toHaveJSProperty('tagName', 'BUTTON');
            await expect(saveButton(page)).toBeEnabled();
            await expect(discardButton(page)).toBeEnabled();

            // Discard throws the change away.
            await discardButton(page).click();
            await expect(nameHeading(page)).toHaveText(name);
            await expect(saveButton(page)).toHaveCount(0);
            expect((await readGroup(page, id)).name).toBe(name);

            // Save keeps it.
            await typeGroupName(page, renamed);
            await editor(page).getByRole('button', { name: 'done editing' }).click();
            await saveButton(page).click();
            await expect(saveButton(page)).toHaveCount(0, { timeout: 60_000 });
            await groupsReady(page); // The save reloads people and groups; wait for it to finish.
            await expect(nameHeading(page)).toHaveText(renamed);
            await expect(groupInList(page, renamed)).toBeVisible();
            await expect.poll(async () => (await readGroup(page, id))?.name).toBe(renamed);
        });

        test('add and remove members @P1', async ({ app, page, browser, account, otherAccount, console }) => {
            // Three group saves (each reloads all people and groups) and a login in another context.
            test.slow();
            const otherPk = await publicKeyOf(browser, otherAccount);
            await openGroups(app, page, account);
            const name = unique('Group members');
            const id = await createGroup(page, name);
            const otherId = await personId(page, otherAccount.name);

            await addMember(page, otherAccount.name);
            await expect(saveButton(page)).toBeEnabled();
            await saveButton(page).click();
            await expect(saveButton(page)).toHaveCount(0, { timeout: 60_000 });
            await groupsReady(page); // The save reloads people and groups; wait for it to finish.
            await expect(memberRow(page, otherAccount.name)).toContainText('member');
            await expect.poll(async () => (await readGroup(page, id))?.employee).toContain(otherId);
            let stored = await readGroup(page, id);
            expect(stored.reader).toContain(otherPk);
            expect(stored.owner).not.toContain(otherPk);

            // Remove, then discard: the member comes back.
            await removeMember(page, otherAccount.name);
            await discardButton(page).click();
            await expect(memberRow(page, otherAccount.name)).toContainText('member');

            // Remove and save.
            await removeMember(page, otherAccount.name);
            await saveButton(page).click();
            await expect(saveButton(page)).toHaveCount(0, { timeout: 60_000 });
            await groupsReady(page); // The save reloads people and groups; wait for it to finish.
            await expect.poll(async () => (await readGroup(page, id))?.employee ?? [], { timeout: 60_000 }).not.toContain(otherId);
            stored = await readGroup(page, id);
            expect(stored.reader).not.toContain(otherPk);
            // A fresh load of the groups page no longer lists them.
            await openGroups(app, page, account);
            await groupInList(page, name).locator('span').first().click();
            await expect(nameHeading(page)).toHaveText(name);
            await expect(memberRow(page, otherAccount.name)).toHaveCount(0);
            expect(problems(console)).toEqual([]);
        });
    });

    test('GRP-03 group permissions on content @P2', async ({ app, page, browser, account, otherAccount, console }) => {
        // A group save, a share with the group and a second user whose group keys load after login.
        test.slow();
        await openGroups(app, page, account);
        const groupName = unique('Group share');
        await createGroup(page, groupName, { members: [otherAccount.name] });

        // Share a framework with the group (Edit/Share).
        const competency = unique('Group competency');
        const fw = await app.seedFramework({ name: unique('Group framework'), competencies: [competency] });
        await openSeededFramework(app, page, fw.id, competency);
        const modal = await openShareModal(page);
        await waitForRoles(modal, { [account.name]: 'admin' });
        await shareWith(modal, groupName, 'admin');
        await waitForRoles(modal, { [groupName]: 'admin' });
        const groupPk = await page.evaluate(async (name) => {
            const groups = await EcOrganization.search(window.repo, `"${name}"`, null, null, { size: 20 });
            const g = groups.find((x) => x.getName() === name);
            return (await g.getCurrentOrgKey()).toPk().toPem();
        }, groupName);
        await expect.poll(async () => (await fetchStored(page, fw.id)).owner).toContain(groupPk);
        expect(problems(console)).toEqual([]);

        // A group member (not an owner themselves) can edit it.
        const context = await browser.newContext();
        try {
            const page2 = await context.newPage();
            const app2 = new App(page2);
            const route = `/framework/${encodeURIComponent(fw.id)}`;
            await app2.login(otherAccount, '/frameworks');
            const otherPk = await app2.publicKey();
            expect((await fetchStored(page, fw.id)).owner).not.toContain(otherPk);
            // The member's group keys are added after login; open the framework inside the editor
            // (see openAs in sharing.spec.js) until it is editable.
            await expect(async () => {
                await app2.go('/frameworks');
                await app2.go(route);
                await expect(page2.getByText(competency).first()).toBeVisible({ timeout: 20_000 });
                await expect(page2.getByText(/^\s*add\s*$/i).first()).toBeVisible({ timeout: 20_000 });
            }).toPass({ timeout: 90_000 });
            await expect(page2.locator('.fa-edit').first()).toBeVisible();
        } finally {
            await context.close();
        }
    });
});
