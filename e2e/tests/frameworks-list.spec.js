// TEST-CASES.md §2 Frameworks list (FWL-01 … FWL-05).
import { test, expect, problems } from '../support/fixtures.js';
import { App } from '../support/app.js';
import {
    token, seedFramework, seedDirectory, seedConfiguration, waitIndexedCount,
    searchInput, listRows, row, rightAside, search, openFilterAndSort, toggleOption, rowOrder, namedRow, waitForSchemata,
} from '../support/frameworks-list.js';


// Rendering a framework compacts every object as JSON-LD (contexts come from the dev server); the
// first render can take longer than the default expect timeout.
const SLOW = 45_000;

const directoryItems = (page, t) => page.locator('#directory .cass--list--item').filter({ hasText: t });

/** From the frameworks list, searches for t and double-clicks the directory's row to open it. */
async function enterDirectory(page, t, dirName) {
    await search(page, t);
    const dirRow = await namedRow(page, dirName);
    // The list can re-render the row right after the search settles, swallowing a double-click on
    // the old element; double-click again until the directory opens.
    await expect(async () => {
        await dirRow.locator('.lode__thing').first().dblclick();
        await expect(page).toHaveURL(/#\/directory/, { timeout: 5_000 });
    }).toPass({ timeout: 30_000 });
    await expect(page.locator('.breadcrumb')).toContainText(dirName);
}

const fmt = (iso) => new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).replace(',', '');

test.describe('Frameworks list', () => {
    test('FWL-01 list renders with metadata @P0', async ({ app, page, account, console }) => {
        await app.login(account);
        const t = token('fwlone');
        const created = '2024-03-05T10:00:00.000Z';
        const modified = '2024-06-07T10:00:00.000Z';
        const withPublisher = await seedFramework(page, {
            name: `FWL-01 published ${t}`,
            competencies: ['One', 'Two', 'Three'],
            extra: { 'schema:dateCreated': created, 'schema:dateModified': modified, 'schema:publisher': `Publisher ${t}` },
        });
        const plain = await seedFramework(page, { name: `FWL-01 plain ${t}` });
        await waitIndexedCount(page, `@type:Framework AND ${t}`, 2);

        await app.open('/frameworks');
        await expect(listRows(page).first()).toBeVisible();
        await search(page, t);

        const published = row(page, withPublisher.name);
        await expect(published).toBeVisible();
        await expect(listRows(page)).toHaveCount(2);
        await expect(published.locator('.framework-details')).toContainText(/Items:\s*3/);
        await expect(published.locator('.framework-details')).toContainText(new RegExp(`Created\\s*:\\s*${fmt(created)}`));
        await expect(published.locator('.framework-details')).toContainText(/Last modified\s*:\s*\w{3} \d{1,2} \d{4}/);
        await expect(published.locator('.framework-details')).toContainText(`Publisher: Publisher ${t}`);

        const plainRow = row(page, plain.name);
        await expect(plainRow).toBeVisible();
        await expect(plainRow.locator('.framework-details')).toContainText(/Items:\s*0/);
        await expect(plainRow.locator('.framework-details')).not.toContainText('Publisher');

        // Regression: names must not be blank (jsonld documentLoader not installed).
        for (const name of await listRows(page).allInnerTexts()) expect(name.trim()).not.toBe('');
        expect(problems(console)).toEqual([]);
    });

    test('FWL-02 search filters the list and clearing restores it @P1', async ({ app, page, account, console }) => {
        await app.login(account);
        const t = token('fwltwo');
        const match = await seedFramework(page, { name: `FWL-02 alpha ${t}` });
        const other = await seedFramework(page, { name: `FWL-02 beta ${token('fwltwoother')}` });
        await waitIndexedCount(page, `@type:Framework AND ${t}`, 1);

        await app.open('/frameworks');
        await expect(listRows(page).first()).toBeVisible();
        const unfiltered = await listRows(page).count();
        expect(unfiltered).toBeGreaterThan(1);

        // Part of the name is enough (the editor searches for "<term>*").
        await search(page, t.slice(0, -2));
        await expect(row(page, match.name)).toBeVisible();
        await expect(listRows(page)).toHaveCount(1);
        await expect(row(page, other.name)).toHaveCount(0);

        // Clearing the search restores the unfiltered list.
        await search(page, '');
        await expect(searchInput(page)).toHaveValue('');
        await expect.poll(() => listRows(page).count()).toBeGreaterThanOrEqual(unfiltered);
        await expect(listRows(page).filter({ hasNotText: t }).first()).toBeVisible();
        expect(problems(console)).toEqual([]);
    });

    test.describe('FWL-03 filters and sort', () => {
        test('FWL-03 owned-by-me and not-owned-by-me quick filters @P1', async ({ app, page, account, console }) => {
            await app.login(account);
            const t = token('fwlown');
            const mine = await seedFramework(page, { name: `FWL-03 mine ${t}` });
            const theirs = await seedFramework(page, { name: `FWL-03 theirs ${t}`, foreign: true });
            await waitIndexedCount(page, `@type:Framework AND ${t}`, 2);

            await app.open('/frameworks');
            await search(page, t);
            await expect(listRows(page)).toHaveCount(2);

            const panel = await openFilterAndSort(page);

            await toggleOption(panel, 'ownedByMe');
            await expect(page.locator('#ownedByMe')).toBeChecked();
            await expect(row(page, theirs.name)).toHaveCount(0);
            await expect(row(page, mine.name)).toBeVisible();
            await expect(listRows(page)).toHaveCount(1);

            await toggleOption(panel, 'ownedByMe');
            await expect(listRows(page)).toHaveCount(2);

            await toggleOption(panel, 'notOwnedByMe');
            await expect(row(page, mine.name)).toHaveCount(0);
            await expect(row(page, theirs.name)).toBeVisible();
            await expect(listRows(page)).toHaveCount(1);

            await toggleOption(panel, 'notOwnedByMe');
            await expect(listRows(page)).toHaveCount(2);
            await expect(row(page, mine.name)).toBeVisible();
            await expect(row(page, theirs.name)).toBeVisible();
            expect(problems(console)).toEqual([]);
        });

        test('FWL-03 configuration-matches-default quick filter @P1', async ({ app, page, account, console }) => {
            await app.login(account);
            const t = token('fwlcfg');
            const configId = await seedConfiguration(page, `FWL-03 config ${t}`);
            const configured = await seedFramework(page, { name: `FWL-03 configured ${t}`, extra: { configuration: configId } });
            const unconfigured = await seedFramework(page, { name: `FWL-03 unconfigured ${t}` });
            await waitIndexedCount(page, `@type:Framework AND ${t}`, 2);

            // Make the new configuration this browser's default (what "set as browser default" does).
            await page.evaluate((id) => localStorage.setItem('cassAuthoringToolDefaultBrowserConfigId', id), configId);
            await app.open('/frameworks');
            await search(page, t);
            await expect(listRows(page)).toHaveCount(2);

            const panel = await openFilterAndSort(page);
            await toggleOption(panel, 'configMatchDefault');
            await expect(page.locator('#configMatchDefault')).toBeChecked();
            await expect(row(page, unconfigured.name)).toHaveCount(0);
            await expect(row(page, configured.name)).toBeVisible();
            await expect(listRows(page)).toHaveCount(1);

            await toggleOption(panel, 'configMatchDefault');
            await expect(listRows(page)).toHaveCount(2);
            expect(problems(console)).toEqual([]);
        });

        test('FWL-03 sort alphabetical, created date and last modified @P1', async ({ app, page, otherAccount, console }) => {
            // otherAccount owns nothing but these frameworks, so "Owned by me" shows only them and
            // the sort (which the editor drops while a search term is set) applies to a short list.
            await app.login(otherAccount);
            const t = token('fwlsort');
            const day = (d) => `2025-01-${String(d).padStart(2, '0')}T12:00:00.000Z`;
            const a = await seedFramework(page, { name: `FWL-03 sort A ${t}`, extra: { 'schema:dateCreated': day(2), 'schema:dateModified': day(20) } });
            const b = await seedFramework(page, { name: `FWL-03 sort B ${t}`, extra: { 'schema:dateCreated': day(3), 'schema:dateModified': day(10) } });
            const c = await seedFramework(page, { name: `FWL-03 sort C ${t}`, extra: { 'schema:dateCreated': day(1), 'schema:dateModified': day(30) } });
            await waitIndexedCount(page, `@type:Framework AND ${t}`, 3);

            await app.open('/frameworks');
            await waitForSchemata(page);
            const panel = await openFilterAndSort(page);
            await toggleOption(panel, 'ownedByMe');
            await expect(page.locator('#ownedByMe')).toBeChecked();
            await namedRow(page, c.name);

            const expectOrder = async (expected) => {
                await expect.poll(async () => {
                    const pos = await rowOrder(page, expected);
                    return pos.every((p) => p >= 0) && pos.every((p, i) => i === 0 || p > pos[i - 1]);
                }).toBe(true);
            };

            await expectOrder([a.name, b.name, c.name]); // Alphabetical is the default.

            await toggleOption(panel, 'lastEdited');
            await expect(page.locator('#lastEdited')).toBeChecked();
            await expectOrder([c.name, a.name, b.name]); // Most recently modified first.

            await toggleOption(panel, 'dateCreated');
            await expect(page.locator('#dateCreated')).toBeChecked();
            await expectOrder([b.name, a.name, c.name]); // Newest first.

            await toggleOption(panel, 'alphabetical');
            await expect(page.locator('#alphabetical')).toBeChecked();
            await expectOrder([a.name, b.name, c.name]);
            expect(problems(console)).toEqual([]);
        });

        test('FWL-03 Filter & sort opened right after page load works @P1', async ({ app, page, account, console }) => {
            await app.login(account);
            const t = token('fwlearly');
            const mine = await seedFramework(page, { name: `FWL-03 early mine ${t}` });
            const theirs = await seedFramework(page, { name: `FWL-03 early theirs ${t}`, foreign: true });
            await waitIndexedCount(page, `@type:Framework AND ${t}`, 2);

            // Hold back the CaSS schema (which the editor loads at startup and with the first rendered
            // row) until the panel is open, so the panel is certainly opened before the schema arrives.
            let release;
            const gate = new Promise((resolve) => { release = resolve; });
            await page.route(/schema\.cassproject\.org\/0\.4(\/index\.json-ld)?$/, async (route) => {
                await gate;
                await route.continue().catch(() => {});
            });
            await app.open('/frameworks');
            const panel = await openFilterAndSort(page);
            expect(await page.evaluate(() => window.app.$pinia.state.value.lode.rawSchemata['https://schema.cassproject.org/0.4'] ?? null)).toBeNull();
            release();
            await waitForSchemata(page);

            // The panel works once the list is there.
            await search(page, t);
            await expect(listRows(page)).toHaveCount(2);
            await toggleOption(panel, 'ownedByMe');
            await expect(page.locator('#ownedByMe')).toBeChecked();
            await expect(row(page, theirs.name)).toHaveCount(0);
            await expect(row(page, mine.name)).toBeVisible();
            await toggleOption(panel, 'ownedByMe');
            await expect(listRows(page)).toHaveCount(2);
            expect(problems(console)).toEqual([]);
        });

        test('FWL-03 owned-by-me toggle in a directory does not throw @P1', async ({ app, page, account, console }) => {
            await app.login(account);
            const t = token('fwldir');
            const dirName = `FWL-03 directory ${t}`;
            const dirId = await seedDirectory(page, dirName);
            const mine = await seedFramework(page, { name: `FWL-03 dir mine ${t}`, extra: { directory: dirId } });
            const theirs = await seedFramework(page, { name: `FWL-03 dir theirs ${t}`, extra: { directory: dirId }, foreign: true });
            await waitIndexedCount(page, `@type:Directory AND ${t}`, 1);
            await waitIndexedCount(page, `@type:Framework AND ${t}`, 2);

            await app.open('/frameworks');
            await enterDirectory(page, t, dirName);

            // Directory.vue's own "Show only mine" checkbox: see the known-bug test below.
            const items = directoryItems(page, t);
            await expect(items.filter({ hasText: theirs.name })).toBeVisible();
            await expect(items.filter({ hasText: mine.name })).toBeVisible();

            const panel = await openFilterAndSort(page);
            await toggleOption(panel, 'ownedByMe');
            await expect(page.locator('#ownedByMe')).toBeChecked();
            await expect(items.filter({ hasText: theirs.name })).toHaveCount(0);
            await expect(items.filter({ hasText: mine.name })).toBeVisible();

            await toggleOption(panel, 'ownedByMe');
            await expect(page.locator('#ownedByMe')).not.toBeChecked();
            await expect(items.filter({ hasText: theirs.name })).toBeVisible();
            await expect(items.filter({ hasText: mine.name })).toBeVisible();
            // Covers the double-click that opened the directory too (it used to log "URL is null").
            expect(problems(console)).toEqual([]);
        });

        test('FWL-03 configuration-matches-default quick filter in a directory @P1', async ({ app, page, account, console }) => {
            await app.login(account);
            const t = token('fwldircfg');
            const dirName = `FWL-03 cfg directory ${t}`;
            const dirId = await seedDirectory(page, dirName);
            const configId = await seedConfiguration(page, `FWL-03 dir config ${t}`);
            const configured = await seedFramework(page, { name: `FWL-03 dir configured ${t}`, extra: { directory: dirId, configuration: configId } });
            const unconfigured = await seedFramework(page, { name: `FWL-03 dir unconfigured ${t}`, extra: { directory: dirId } });
            await waitIndexedCount(page, `@type:Directory AND ${t}`, 1);
            await waitIndexedCount(page, `@type:Framework AND ${t}`, 2);

            // Make the new configuration this browser's default (what "set as browser default" does).
            await page.evaluate((id) => localStorage.setItem('cassAuthoringToolDefaultBrowserConfigId', id), configId);
            await app.open('/frameworks');
            await enterDirectory(page, t, dirName);

            const items = directoryItems(page, t);
            await expect(items.filter({ hasText: configured.name })).toBeVisible();
            await expect(items.filter({ hasText: unconfigured.name })).toBeVisible();

            const panel = await openFilterAndSort(page);
            await toggleOption(panel, 'configMatchDefault');
            await expect(page.locator('#configMatchDefault')).toBeChecked();
            await expect(items.filter({ hasText: unconfigured.name })).toHaveCount(0);
            await expect(items.filter({ hasText: configured.name })).toBeVisible();

            await toggleOption(panel, 'configMatchDefault');
            await expect(page.locator('#configMatchDefault')).not.toBeChecked();
            await expect(items.filter({ hasText: unconfigured.name })).toBeVisible();
            await expect(items.filter({ hasText: configured.name })).toBeVisible();
            expect(problems(console)).toEqual([]);
        });

        test('FWL-03 "Show only mine" in a directory toggles my frameworks (known bug: checkbox never renders) @P2', async ({ app, page, account }) => {
            test.fail(true, 'Directory.vue puts the "Show only mine" checkbox in MainLayout\'s default slot, which MainLayout does not render; see e2e/FINDINGS.md');
            // ?ownedByMe=true is what makes Directory.vue offer the checkbox (and starts it checked).
            await app.login(account, '/frameworks', { ownedByMe: 'true' });
            const t = token('fwlshowmine');
            const dirName = `FWL-03 show mine ${t}`;
            const dirId = await seedDirectory(page, dirName);
            const mine = await seedFramework(page, { name: `FWL-03 show mine own ${t}`, extra: { directory: dirId } });
            const theirs = await seedFramework(page, { name: `FWL-03 show mine theirs ${t}`, extra: { directory: dirId }, foreign: true });
            await waitIndexedCount(page, `@type:Directory AND ${t}`, 1);
            await waitIndexedCount(page, `@type:Framework AND ${t}`, 2);

            await enterDirectory(page, t, dirName);
            const items = directoryItems(page, t);
            const showMine = page.locator('#directory label[for="showMine"]');
            await expect(showMine).toBeVisible({ timeout: 5_000 });
            await expect(page.locator('#showMine')).toBeChecked();
            await expect(items.filter({ hasText: mine.name })).toBeVisible();
            await expect(items.filter({ hasText: theirs.name })).toHaveCount(0);
            await showMine.click();
            await expect(page.locator('#showMine')).not.toBeChecked();
            await expect(items.filter({ hasText: theirs.name })).toBeVisible();
        });
    });

    test('FWL-04 info side panel @P1', async ({ app, page, account, console }) => {
        await app.login(account);
        const t = token('fwlinfo');
        const created = '2024-02-03T10:00:00.000Z';
        const fw = await seedFramework(page, { name: `FWL-04 info ${t}`, competencies: ['First', 'Second'], extra: { 'schema:dateCreated': created } });
        await waitIndexedCount(page, `@type:Framework AND ${t}`, 1);

        await app.open('/frameworks');
        await search(page, t);
        await (await namedRow(page, fw.name)).click();

        const aside = rightAside(page);
        await expect(aside).toBeVisible();
        await expect(aside.locator('.cass--right-aside--title')).toHaveText('Information');
        await expect(aside.locator('.right-aside-bar--title-text')).toHaveText(fw.name);
        await expect(aside.getByRole('button', { name: /Details/ })).toBeVisible();
        const details = aside.locator('.cass__right-side--accordion-panel.details').first();
        await expect(details).toBeVisible();
        await expect(details).toContainText(/Last Modified:\s*\w{3} \d{1,2} \d{4}/);
        await expect(details).toContainText(new RegExp(`Date Created:\\s*${fmt(created)}`));
        await expect(details).toContainText(/Item Count:\s*2/);
        await expect(aside.getByText(/open framework/i)).toBeVisible();

        await aside.locator('button.delete').click();
        await expect(aside).toHaveCount(0);
        expect(problems(console)).toEqual([]);
    });

    test.describe('FWL-05 open framework and deep link', () => {
        test('FWL-05 open framework from the info panel and from its URL @P0', async ({ app, page, account, context, console }) => {
            await app.login(account);
            const t = token('fwlopen');
            const fw = await seedFramework(page, { name: `FWL-05 open ${t}`, competencies: ['Alpha competency', 'Beta competency'] });
            await waitIndexedCount(page, `@type:Framework AND ${t}`, 1);

            await app.open('/frameworks');
            await search(page, t);
            await (await namedRow(page, fw.name)).click();
            await rightAside(page).getByText(/open framework/i).click();
            await expect(page).toHaveURL(/#\/framework\//);
            const framework = page.locator('#framework');
            await expect(framework.getByText(fw.name).first()).toBeVisible({ timeout: SLOW });
            await expect(framework.getByText('Alpha competency')).toBeVisible();
            await expect(framework.getByText('Beta competency')).toBeVisible();
            const content = await framework.locator('.lode__Competency').allInnerTexts();
            expect(content.length).toBe(2);
            const url = page.url();

            // The same URL in a new tab.
            const second = await context.newPage();
            await second.goto(url);
            await new App(second).ready();
            const framework2 = second.locator('#framework');
            await expect(framework2.getByText(fw.name).first()).toBeVisible({ timeout: SLOW });
            await expect(framework2.getByText('Beta competency')).toBeVisible();
            await expect.poll(() => framework2.locator('.lode__Competency').allInnerTexts()).toEqual(content);
            await second.close();
            expect(problems(console)).toEqual([]);
        });

        test('FWL-05 route tolerates the version segment of the id @P0', async ({ app, page, account, console }) => {
            await app.login(account);
            const t = token('fwlver');
            const fw = await seedFramework(page, { name: `FWL-05 version ${t}`, competencies: ['Versioned competency'] });
            expect(fw.versionedId.startsWith(fw.id + '/')).toBe(true);

            for (const id of [fw.versionedId, fw.id]) {
                await app.open(`/framework/${encodeURIComponent(id)}`);
                await expect(page.locator('#framework').getByText(fw.name).first()).toBeVisible({ timeout: SLOW });
                await expect(page.locator('#framework').getByText('Versioned competency')).toBeVisible();
            }
            expect(problems(console)).toEqual([]);
        });
    });
});
