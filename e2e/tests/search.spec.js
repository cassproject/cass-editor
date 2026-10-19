// TEST-CASES.md §14 Search & competency search modal (SRCH-01, SRCH-02).
import { test, expect, problems } from '../support/fixtures.js';
import { token, seedFramework, waitIndexedCount } from '../support/frameworks-list.js';


// Rendering a framework compacts every object as JSON-LD (contexts come from the dev server); the
// first render can take longer than the default expect timeout.
const SLOW = 45_000;

const frameworkView = (page) => page.locator('#framework');
const hierarchyButton = (page, label) => frameworkView(page).locator('.button').filter({ hasText: new RegExp(`^\\s*${label}\\s*$`, 'i') });
const searchModal = (page) => page.locator('#cass-modal.is-active').filter({ hasText: 'Search for Competency' });

/** Opens a framework the logged-in user owns and waits for its competencies. */
async function openFramework(app, page, fw, firstCompetency) {
    await app.open(`/framework/${encodeURIComponent(fw.id)}`);
    await expect(frameworkView(page).getByText(fw.name).first()).toBeVisible({ timeout: SLOW });
    await expect(frameworkView(page).getByText(firstCompetency)).toBeVisible({ timeout: SLOW });
}

/** add -> search: opens the competency search modal and searches it for term. */
async function searchFromAdd(page, term) {
    await hierarchyButton(page, 'add').click();
    await hierarchyButton(page, 'search').click();
    const modal = searchModal(page);
    await expect(modal).toBeVisible({ timeout: SLOW });
    await expect(modal.locator('.modal-card-head').first()).toContainText('Search for Competency');
    const input = modal.locator('.cass--search-bar input[type=search]');
    await expect(input).toBeEnabled();
    await input.fill(term);
    return modal;
}

test.describe('Search', () => {
    test('SRCH-01 in-framework search @P1', async ({ app, page, account, console }) => {
        await app.login(account);
        const t = token('srchone');
        const fw = await seedFramework(page, { name: `SRCH-01 ${t}`, competencies: [`Needle ${t}`, `Haystack one ${t}`, `Haystack two ${t}`] });
        await openFramework(app, page, fw, `Needle ${t}`);

        // The framework toolbar and the whole hierarchy are shown.
        await expect(page.locator('[title="Export framework"]').first()).toBeVisible();
        await expect(frameworkView(page).locator('.lode__Competency')).toHaveCount(3);

        expect(problems(console)).toEqual([]);
    });

    // Known gap: search was removed from the framework toolbar in 2020 (commit 09abde0ad) and is to come
    // back. This test describes the expected behaviour and is marked as failing until it does; when
    // search returns, it starts passing and Playwright reports it, so remove the test.fail() line.
    test('SRCH-01 in-framework search filters the hierarchy (known gap: not implemented) @P1', async ({ app, page, account }) => {
        test.fail(true, 'In-framework search is not implemented (removed in 09abde0ad); see TEST-CASES.md SRCH-01.');
        await app.login(account);
        const t = token('srchgap');
        const fw = await seedFramework(page, { name: `SRCH-01 gap ${t}`, competencies: [`Needle ${t}`, `Haystack ${t}`] });
        await openFramework(app, page, fw, `Needle ${t}`);

        const search = frameworkView(page).locator('input[type=search], input[placeholder*="earch" i]').first();
        await expect(search).toBeVisible({ timeout: 10_000 });
        await search.fill(`Needle ${t}`);
        await expect(frameworkView(page).locator('.lode__Competency').filter({ hasText: `Haystack ${t}` })).toBeHidden();
        await search.fill('');
        await expect(frameworkView(page).locator('.lode__Competency')).toHaveCount(2);
    });

    test.describe('SRCH-02 competency search modal', () => {
        test('SRCH-02 search another framework and copy a competency @P1', async ({ app, page, account, console }) => {
            await app.login(account);
            const t = token('srchcopy');
            const source = await seedFramework(page, { name: `SRCH-02 source ${t}`, competencies: [`Copied ${t}`, `Other ${t}`], foreign: true });
            const target = await seedFramework(page, { name: `SRCH-02 target ${token('srchtarget')}`, competencies: ['Existing competency'] });
            await waitIndexedCount(page, `@type:Competency AND ${t}`, 2);
            await openFramework(app, page, target, 'Existing competency');

            const modal = await searchFromAdd(page, t);
            await expect(modal.locator('.modal-card-head').first()).toContainText(target.name);
            // Cross-framework results: both competencies of the other framework.
            const results = modal.locator('.cass--list--item').filter({ hasText: t });
            await expect(results).toHaveCount(2, { timeout: SLOW });
            const copyButton = modal.getByRole('button', { name: /copy competency/i });
            await expect(copyButton).toBeDisabled();

            await results.filter({ hasText: `Copied ${t}` }).click();
            await expect(results.filter({ hasText: `Copied ${t}` }).locator('.search-selection__icon')).toBeVisible();
            await expect(copyButton).toBeEnabled();
            await copyButton.click();

            // The modal closes cleanly and the copy appears in the framework.
            await expect(searchModal(page)).toHaveCount(0);
            await expect(frameworkView(page).locator('.lode__Competency').filter({ hasText: `Copied ${t}` })).toBeVisible({ timeout: SLOW });
            await expect(frameworkView(page).locator('.lode__Competency')).toHaveCount(2);

            // CaSS: the framework holds a new competency derived from the source one; the source is untouched.
            const sourceId = source.competencies[`Copied ${t}`];
            let added;
            await expect.poll(async () => {
                const saved = await app.fetchObject(target.id);
                added = (saved.competency || []).filter((id) => id !== target.competencies['Existing competency']);
                return added.length;
            }).toBe(1);
            expect(added[0]).not.toBe(sourceId);
            const copy = await app.fetchObject(added[0]);
            expect(copy).toMatchObject({ name: expect.anything() });
            expect(JSON.stringify(copy.name)).toContain(`Copied ${t}`);
            expect(copy['ceasn:derivedFrom']).toContain(sourceId.split('/').pop());
            expect(copy.owner).toContain(await app.publicKey());
            const sourceFramework = await app.fetchObject(source.id);
            expect(sourceFramework.competency).toHaveLength(2);
            expect(problems(console)).toEqual([]);
        });

        test('SRCH-02 search another framework and link a competency @P1', async ({ app, page, account, console }) => {
            await app.login(account);
            const t = token('srchlink');
            const source = await seedFramework(page, { name: `SRCH-02 source ${t}`, competencies: [`Linked ${t}`], foreign: true });
            const target = await seedFramework(page, { name: `SRCH-02 target ${token('srchtarget')}`, competencies: ['Existing competency'] });
            await waitIndexedCount(page, `@type:Competency AND ${t}`, 1);
            await openFramework(app, page, target, 'Existing competency');

            const modal = await searchFromAdd(page, t);
            const result = modal.locator('.cass--list--item').filter({ hasText: `Linked ${t}` });
            await expect(result).toBeVisible({ timeout: SLOW });
            await result.click();
            await modal.getByRole('button', { name: /link competency/i }).click();

            await expect(searchModal(page)).toHaveCount(0);
            await expect(frameworkView(page).locator('.lode__Competency').filter({ hasText: `Linked ${t}` })).toBeVisible({ timeout: SLOW });

            // CaSS: the framework references the other framework's competency itself.
            const sourceId = source.competencies[`Linked ${t}`];
            await expect.poll(async () => (await app.fetchObject(target.id)).competency).toContain(sourceId);
            expect(problems(console)).toEqual([]);
        });

        test('SRCH-02 cancel closes the modal without changes @P1', async ({ app, page, account, console }) => {
            await app.login(account);
            const t = token('srchcancel');
            await seedFramework(page, { name: `SRCH-02 source ${t}`, competencies: [`Not added ${t}`], foreign: true });
            const target = await seedFramework(page, { name: `SRCH-02 target ${token('srchtarget')}`, competencies: ['Existing competency'] });
            await waitIndexedCount(page, `@type:Competency AND ${t}`, 1);
            await openFramework(app, page, target, 'Existing competency');

            const modal = await searchFromAdd(page, t);
            const result = modal.locator('.cass--list--item').filter({ hasText: `Not added ${t}` });
            await result.click();
            await modal.locator('.modal-card-foot').getByText('cancel', { exact: true }).click();

            await expect(searchModal(page)).toHaveCount(0);
            await expect(frameworkView(page).getByText(`Not added ${t}`)).toHaveCount(0);
            expect((await app.fetchObject(target.id)).competency).toEqual([target.competencies['Existing competency']]);
            expect(problems(console)).toEqual([]);
        });
    });
});
