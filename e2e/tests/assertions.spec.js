// TEST-CASES.md §11 Assertions (ASSN-01 … ASSN-05).
import { test, expect, unique, problems } from '../support/fixtures.js';
import { randomId } from '../support/app.js';
import { asUser, assertionEditor, assertionsAbout, publicKeyOf, readAssertion, seedAssertion, startManagingAssertions } from '../support/assertions.js';
import { openSeededFramework } from '../support/sharing.js';

const canButton = (editor) => editor.locator('[data-id="positiveAssertionButton"]');
const cantButton = (editor) => editor.locator('[data-id="negativeAssertionButton"]');
const evidenceInput = (editor) => editor.locator('.assertions-input input');

/** Seeds a framework with the given competencies, opens it and turns on "manage assertions". */
async function openManagedFramework(app, page, competencies) {
    const fw = await app.seedFramework({ name: unique('Assertions'), competencies });
    await openSeededFramework(app, page, fw.id, competencies[0]);
    await startManagingAssertions(page);
    return fw;
}

/**
 * Shares the logged-in user's assertions about themselves with recipient through the Share
 * Assertions modal (side navigation) and waits for "Success!". Returns the modal.
 */
async function shareMyAssertions(page, me, recipient) {
    await page.locator('#app a[data-id="share-assertions-button"]').click();
    const modal = page.locator('.modal.is-active').filter({ hasText: 'Share Assertions' });
    await expect(modal).toBeVisible();
    const shareButton = modal.locator('button[data-id="share-assertions-button"]');
    await expect(shareButton).toBeDisabled();

    // About: myself. Send to: the recipient.
    await modal.locator('[data-id="share-assertions-subject-search"]').fill(me.name);
    await modal.locator('[data-id="share-assertions-subject-option"]', { hasText: me.name }).click();
    await modal.locator('[data-id="share-assertions-target-search"]').fill(recipient.name);
    await modal.locator('[data-id="share-assertions-target-option"]', { hasText: recipient.name }).click();
    await expect(modal.locator('.assertion-share-count')).toHaveText(['1 selected', '1 selected']);
    // The logged-in user is not offered as a recipient.
    await modal.locator('[data-id="share-assertions-target-search"]').fill(me.name);
    await expect(modal.locator('[data-id="share-assertions-target-option"]')).toHaveCount(0);
    await expect(shareButton).toBeEnabled();
    await shareButton.click();
    // Share re-encrypts every assertion of the user, one RSA operation at a time.
    await expect(modal.getByText('Success!')).toBeVisible({ timeout: 60_000 });
    await expect(modal.locator('[data-id="share-more-assertions-button"]')).toBeVisible();
    return modal;
}

test.describe('Assertions', () => {
    test('ASSN-01 "I can" / "I can\'t" @P0', async ({ app, page, account, console }) => {
        // Opens the framework twice and saves, deletes and re-saves assertions (RSA work in the page).
        test.slow();
        await app.login(account);
        const me = await app.publicKey();
        const fw = await openManagedFramework(app, page, ['Can do this', 'Cannot do this']);
        const canId = fw.competencies['Can do this'];
        const cantId = fw.competencies['Cannot do this'];

        // "Manage Assertions for:" starts on the logged-in user.
        await expect(page.locator('.assertion-subject-select-button')).toHaveText(/myself/i);

        const first = assertionEditor(page, canId);
        await expect(canButton(first)).toHaveText(/i can$/i);
        // Native buttons, not pseudo-buttons.
        await expect(canButton(first)).toHaveJSProperty('tagName', 'BUTTON');
        await expect(cantButton(first)).toHaveJSProperty('tagName', 'BUTTON');
        await expect(canButton(first)).not.toHaveClass(/\bactive\b/);
        await expect(evidenceInput(first)).toHaveCount(0);

        await canButton(first).click();
        await expect(canButton(first)).toHaveClass(/\bactive\b/);
        await expect(canButton(first).locator('i')).toHaveClass(/fa-check-circle/);
        await expect(canButton(first)).toBeEnabled();
        await expect(evidenceInput(first)).toBeVisible();
        await expect(evidenceInput(first)).toHaveAttribute('placeholder', 'do this because I...');
        await expect(cantButton(first)).not.toHaveClass(/\bactive\b/);

        const second = assertionEditor(page, cantId);
        await expect(cantButton(second)).toHaveText(/i can't$/i);
        await cantButton(second).click();
        await expect(cantButton(second)).toHaveClass(/\bactive\b/);
        await expect(cantButton(second).locator('i')).toHaveClass(/fa-check-square/);
        await expect(evidenceInput(second)).toBeVisible();
        await expect(canButton(second)).not.toHaveClass(/\bactive\b/);

        // Stored for "myself": subject and agent are the logged-in user.
        const [can] = await assertionsAbout(page, canId);
        expect(can).toMatchObject({ subject: me, agent: me, negative: false });
        expect(can.owner).toContain(me);
        const [cant] = await assertionsAbout(page, cantId);
        expect(cant).toMatchObject({ subject: me, agent: me, negative: true });

        // They persist: a fresh load shows both states again.
        await openSeededFramework(app, page, fw.id, 'Can do this');
        await startManagingAssertions(page);
        await expect(canButton(assertionEditor(page, canId))).toHaveClass(/\bactive\b/);
        await expect(cantButton(assertionEditor(page, cantId))).toHaveClass(/\bactive\b/);
        await expect(canButton(assertionEditor(page, cantId))).not.toHaveClass(/\bactive\b/);

        expect(problems(console)).toEqual([]);
        // Switching "i can't" to "i can" replaces the negative assertion.
        await canButton(assertionEditor(page, cantId)).click();
        await expect(canButton(assertionEditor(page, cantId))).toHaveClass(/\bactive\b/);
        await expect(cantButton(assertionEditor(page, cantId))).not.toHaveClass(/\bactive\b/);
        await expect.poll(async () => (await assertionsAbout(page, cantId, { min: 0 })).map((a) => a.negative))
            .toEqual([false]);

        expect(problems(console)).toEqual([]);
    });

    test('ASSN-02 evidence and badge @P1', async ({ app, page, browser, account, otherAccount, console }) => {
        // Two logins, a reload, the timeline and a share of all the user's assertions.
        test.slow();
        const otherPk = await publicKeyOf(browser, otherAccount);
        await app.login(account);
        const me = await app.publicKey();
        const fw = await openManagedFramework(app, page, ['Evidenced competency']);
        const id = fw.competencies['Evidenced competency'];
        const editor = assertionEditor(page, id);

        await canButton(editor).click();
        await expect(canButton(editor)).toHaveClass(/\bactive\b/);

        // Evidence: type a reason and press Enter.
        const reason = unique('built a working prototype');
        await evidenceInput(editor).fill(reason);
        await evidenceInput(editor).press('Enter');
        await expect(evidenceInput(editor)).toHaveValue('');
        const evidenceList = editor.locator('[data-id="evidenceElement"]');
        await expect(evidenceList).toHaveCount(1);
        await expect(evidenceList.first()).toContainText(`"${reason}"`);
        await expect.poll(async () => (await assertionsAbout(page, id))[0].evidence).toEqual([reason]);

        // Badge: the server publishes a badge key (/badge/pk), so "+ add badge" issues one.
        const badgeButton = editor.locator('[data-id="badgeButton"]');
        await expect(badgeButton).toHaveJSProperty('tagName', 'BUTTON');
        await expect(badgeButton).toHaveText(/\+\s*add badge/i);
        await badgeButton.click();
        await expect(badgeButton).toHaveText(/-\s*remove badge/i);
        const viewBadge = editor.locator('[data-id="viewBadgeButton"]');
        await expect(viewBadge).toBeVisible();
        const badgePk = await page.evaluate(async () => EcPk.fromPem(await (await fetch(window.repo.selectedServer + 'badge/pk')).text()).toPem());
        const [stored] = await assertionsAbout(page, id);
        await expect.poll(async () => (await readAssertion(page, stored.id)).reader).toContain(badgePk);
        // Evidence survives the badge save.
        expect((await readAssertion(page, stored.id)).evidence).toEqual([reason]);

        // "view badge" opens the server's badge for this assertion.
        const popupPromise = page.waitForEvent('popup');
        await viewBadge.click();
        const popup = await popupPromise;
        expect(popup.url()).toContain(`badge/assertion/${stored.id.split('/').pop()}`);
        await popup.close();

        // Removing the evidence and the badge works too.
        await editor.locator('[data-id="removeEvidenceButton"]').click();
        await expect(evidenceList).toHaveCount(0);
        await badgeButton.click();
        await expect(badgeButton).toHaveText(/\+\s*add badge/i);
        await expect.poll(async () => (await readAssertion(page, stored.id)).evidence).toEqual([]);
        // The removal is saved: the badge key is no longer a reader ...
        await expect.poll(async () => (await readAssertion(page, stored.id)).reader).not.toContain(badgePk);
        // ... and the assertion is still readable by its owner.
        expect(await readAssertion(page, stored.id)).toMatchObject({ subject: me, agent: me, negative: false, evidence: [] });

        // After a reload the button offers "Add Badge" again.
        await openSeededFramework(app, page, fw.id, 'Evidenced competency');
        await startManagingAssertions(page);
        await expect(canButton(assertionEditor(page, id))).toHaveClass(/\bactive\b/);
        await expect(assertionEditor(page, id).locator('[data-id="badgeButton"]')).toHaveText(/\+\s*add badge/i);
        await expect(assertionEditor(page, id).locator('[data-id="viewBadgeButton"]')).toHaveCount(0);

        // The timeline still shows the claim ...
        await page.locator('a[href*="#/timeline"]').first().click();
        await expect(page).toHaveURL(/#\/timeline/);
        await expect(page.locator('#loadingAssertionTimeline')).toHaveCount(0);
        await expect(page.locator('.timeline .timelineElement', { hasText: 'Evidenced competency' }).first().locator('.positiveClaim')).toHaveText('could');
        // ... and Share Assertions can still process it.
        await shareMyAssertions(page, account, otherAccount);
        await expect.poll(async () => (await readAssertion(page, stored.id)).reader).toContain(otherPk);
        expect(problems(console)).toEqual([]);
    });

    test('ASSN-03 assertion timeline @P1', async ({ app, page, console }) => {
        // Creates an account, then three assertions (each several RSA operations) and the timeline.
        test.slow();
        // A user of its own, so the timeline holds only this test's claims.
        const id = Date.now().toString(36) + randomId(4);
        await app.createAccount({ name: `E2E timeline ${id}`, email: `e2e-timeline-${id}@example.com`, username: `e2etimeline${id}`, password: `Pw-${id}-timeline!` });
        const account = { name: `E2E timeline ${id}` };
        const fw = await openManagedFramework(app, page, ['Oldest claim', 'Older claim', 'Newer claim']);
        // The editor records no framework on its assertions; one made elsewhere may name it.
        await seedAssertion(page, { competency: fw.competencies['Oldest claim'], framework: fw.id });
        const older = assertionEditor(page, fw.competencies['Older claim']);
        const newer = assertionEditor(page, fw.competencies['Newer claim']);
        await canButton(older).click();
        await expect(canButton(older)).toHaveClass(/\bactive\b/);
        await cantButton(newer).click();
        await expect(cantButton(newer)).toHaveClass(/\bactive\b/);
        await assertionsAbout(page, fw.competencies['Newer claim']);

        // Hold the assertion search so the progress bar can be seen.
        let release;
        const gate = new Promise((resolve) => { release = resolve; });
        await page.route(/sky\/repo\/search/, async (route) => {
            await gate;
            await route.continue();
        });
        await page.locator('a[href*="#/timeline"]').first().click();
        await expect(page).toHaveURL(/#\/timeline/);
        await expect(page.getByRole('heading', { name: 'Assertion Timeline' })).toBeVisible();
        await expect(page.locator('#loadingAssertionTimeline progress')).toBeVisible();
        release(); // The handler stays installed but no longer holds anything back.
        await expect(page.locator('#loadingAssertionTimeline')).toHaveCount(0);

        const elements = page.locator('.timeline .timelineElement');
        await expect(elements.first()).toContainText('Newer claim');
        await expect(elements.first().locator('.negativeClaim')).toHaveText('could not');
        await expect(elements.nth(1)).toContainText('Older claim');
        await expect(elements.nth(1).locator('.positiveClaim')).toHaveText('could');
        await expect(elements.first().locator('.agentName')).toHaveText(account.name);
        // An assertion naming its framework shows the subject area; the others do not.
        await expect(elements.nth(2)).toContainText('Oldest claim');
        await expect(elements.nth(2).locator('.competencyLink')).toContainText(`in the subject area ${fw.name}`);
        await expect(elements).toHaveCount(3);
        await expect(elements.nth(0)).not.toContainText('in the subject area');
        await expect(elements.nth(1)).not.toContainText('in the subject area');
        await expect(page.locator('#noAssertionsMessage')).toHaveCount(0);
        expect(problems(console)).toEqual([]);
    });

    test('ASSN-03 assertion timeline shows "None." without assertions @P1', async ({ app, page }) => {
        // A brand-new user has no assertions.
        const id = Date.now().toString(36) + randomId(4);
        const fresh = { name: `E2E fresh ${id}`, email: `e2e-fresh-${id}@example.com`, username: `e2efresh${id}`, password: `Pw-${id}-fresh!` };
        await app.createAccount(fresh);
        await app.go('/timeline');
        await expect(page.getByRole('heading', { name: 'Assertion Timeline' })).toBeVisible();
        await expect(page.locator('#noAssertionsMessage')).toHaveText('None.');
        await expect(page.locator('.timeline .timelineElement')).toHaveCount(0);
    });

    test('ASSN-04 manage assertions for someone else @P2', async ({ app, page, browser, account, otherAccount, console }) => {
        // Three logins (two in separate contexts) plus the subject searches.
        test.slow();
        const otherPk = await publicKeyOf(browser, otherAccount);
        await app.login(account);
        const me = await app.publicKey();
        const fw = await openManagedFramework(app, page, ['Their skill', 'Their gap']);

        const subjectButton = page.locator('.assertion-subject-select-button');
        await expect(subjectButton).toHaveText(/myself/i);
        await subjectButton.click();
        const modal = page.locator('.modal.is-active').filter({ hasText: 'Select Subject' });
        await expect(modal).toBeVisible();
        await modal.getByPlaceholder('search for person...').fill(otherAccount.name);
        await modal.locator('tbody tr', { hasText: otherAccount.name }).click();
        await expect(modal).toHaveCount(0);
        // The subject display resolves to the person's name.
        await expect(subjectButton).toHaveText(otherAccount.name);

        const skill = assertionEditor(page, fw.competencies['Their skill']);
        const gap = assertionEditor(page, fw.competencies['Their gap']);
        await expect(canButton(skill)).toHaveText(/they can$/i);
        await expect(cantButton(skill)).toHaveText(/they can't$/i);
        await canButton(skill).click();
        await expect(canButton(skill)).toHaveClass(/\bactive\b/);
        await expect(evidenceInput(skill)).toHaveAttribute('placeholder', 'do this because they...');
        await cantButton(gap).click();
        await expect(cantButton(gap)).toHaveClass(/\bactive\b/);

        const [can] = await assertionsAbout(page, fw.competencies['Their skill']);
        expect(can).toMatchObject({ subject: otherPk, agent: me, negative: false });
        const [cant] = await assertionsAbout(page, fw.competencies['Their gap']);
        expect(cant).toMatchObject({ subject: otherPk, agent: me, negative: true });

        // Back to "myself": the claims about the other person do not show as mine.
        await subjectButton.click();
        await expect(modal).toBeVisible();
        await modal.getByPlaceholder('search for person...').fill(account.name);
        await modal.locator('tbody tr', { hasText: account.name }).click();
        await expect(subjectButton).toHaveText(/myself/i);
        await expect(canButton(skill)).toHaveText(/i can$/i);
        await expect(canButton(skill)).not.toHaveClass(/\bactive\b/);
        await expect(cantButton(gap)).not.toHaveClass(/\bactive\b/);

        // The subject can read the claim made about them.
        const seenBySubject = await asUser(browser, otherAccount, async (app2, page2) => {
            const a = await readAssertion(page2, can.id);
            return { subject: a.subject, agent: a.agent };
        });
        expect(seenBySubject).toEqual({ subject: otherPk, agent: me });

        expect(problems(console)).toEqual([]);
    });

    test('ASSN-05 share assertions @P2', async ({ app, page, browser, account, otherAccount, console }) => {
        // Two logins in other contexts, and the share re-encrypts every assertion the user has.
        test.slow();
        const otherPk = await publicKeyOf(browser, otherAccount);
        // The worker's shared user: Share processes all of their assertions, including those other
        // tests left behind (e.g. ASSN-02's assertion with a removed badge).
        await app.login(account);
        const me = await app.publicKey();
        const fw = await openManagedFramework(app, page, ['Shared claim']);
        const id = fw.competencies['Shared claim'];
        await canButton(assertionEditor(page, id)).click();
        await expect(canButton(assertionEditor(page, id))).toHaveClass(/\bactive\b/);
        const [claim] = await assertionsAbout(page, id);
        expect(claim.reader).not.toContain(otherPk);

        await shareMyAssertions(page, account, otherAccount);
        expect(problems(console)).toEqual([]);

        // The recipient became a reader of the assertion and can decrypt it.
        await expect.poll(async () => (await readAssertion(page, claim.id)).reader).toContain(otherPk);
        const seenByRecipient = await asUser(browser, otherAccount, async (app2, page2) => {
            const a = await readAssertion(page2, claim.id);
            return { subject: a.subject, agent: a.agent, negative: a.negative };
        });
        expect(seenByRecipient).toEqual({ subject: me, agent: me, negative: false });
    });
});
