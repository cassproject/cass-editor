// TEST-CASES.md §10 Configurations (CFG-01 … CFG-06).
import { test, expect, unique, problems } from '../support/fixtures.js';
import { randomId } from '../support/app.js';
import {
    seedConfiguration, seedFramework, configurationIdsNamed, configRow, openConfigurations,
    browserDefaultId, configurationData, addConfigurationToSearches,
} from '../support/configurations.js';

const activeModal = (page) => page.locator('.modal.is-active');
const configPage = (page) => page.locator('#configuration');
const toolbarConfig = (page) => page.getByTitle('Framework configuration');
const editorConfigurationId = (page) => page.evaluate(() => window.app.$pinia._s.get('editor').configuration?.shortId() ?? null);
const nameInput = (page) => page.locator('#configuration-details input.input').nth(0);
const descriptionInput = (page) => page.locator('#configuration-details input.input').nth(1);
const saveConfiguration = (page) => page.getByText('save configuration', { exact: true });

// Alphanumeric property names (the editor strips anything else).
const propertyName = (prefix) => `${prefix}${Date.now().toString(36)}${randomId(4)}`;
const CONTEXT = 'https://schema.cassproject.org/0.4/';
const label = (prop) => prop?.['http://www.w3.org/2000/01/rdf-schema#label']?.[0]?.['@value'];
const range = (prop) => prop?.['http://schema.org/rangeIncludes']?.[0]?.['@id'];

/** Opens the competency's editing panel and its "Add property" chooser. */
async function openAddProperty(page, competencyId) {
    const li = page.locator(`li[id="${competencyId}"]`);
    const editor = page.locator('.modal.is-active').filter({ hasText: 'Edit Competency' });
    await expect(li).toBeVisible();
    await expect(async () => {
        if (await editor.isVisible()) return;
        await li.locator('.lode__hierarchy-item').first().hover();
        await li.locator('.edit-button').first().click({ timeout: 2_000 });
        await expect(editor).toBeVisible({ timeout: 2_000 });
    }).toPass({ timeout: 30_000 });
    await editor.locator('.button', { hasText: /^\s*add property\s*$/i }).click();
    await expect(page.getByRole('heading', { name: 'Adding property' })).toBeVisible();
}
/**
 * Opens a framework through the ?frameworkId= deep link and waits for its toolbar. The deep link
 * occasionally loses a race with the editor's own redirect to the frameworks list, so reload and
 * try again.
 */
async function openFramework(app, id) {
    await expect(async () => {
        await app.open('/framework', { frameworkId: id });
        await expect(app.page).toHaveURL(/#\/framework\//, { timeout: 30_000 });
        await expect(toolbarConfig(app.page)).toBeVisible({ timeout: 30_000 });
    }).toPass({ timeout: 150_000 });
}
/**
 * Opens the Framework Configuration modal from the framework toolbar and waits until it lists the
 * configuration named name; returns the modal. A click while the framework is still loading is
 * ignored, so click again until the modal opens.
 */
async function openFrameworkConfiguration(page, name) {
    const modal = activeModal(page).filter({ hasText: 'Framework Configuration' });
    await expect(async () => {
        if (!(await modal.isVisible())) await toolbarConfig(page).click({ timeout: 10_000 });
        await expect(modal).toBeVisible({ timeout: 10_000 });
    }).toPass({ timeout: 60_000 });
    await expect(configRow(modal, name)).toBeVisible();
    return modal;
}

/**
 * Seeds a configuration with default owners, then, logged out, creates a framework and clicks
 * "set as framework default" for that configuration in its Framework Configuration modal.
 */
async function setGuardedConfigurationAsAnonymous(app, page, account) {
    await app.login(account);
    const name = unique('CFG-06 guarded');
    const configId = await seedConfiguration(page, { name, overrides: { defaultObjectOwners: [await app.publicKey()] } });
    await app.waitIndexed(`@id:"${configId}"`);

    // A logged-out user creates a framework (owned by nobody, so anyone may edit it).
    await app.becomeAnonymous('/frameworks');
    await page.getByText(/^\s*new\s*$/i).first().click();
    await page.locator('.dropdown-item', { hasText: /^\s*Framework\s*$/ }).click();
    // The editor opens the framework once CaSS has saved it.
    await expect(page).toHaveURL(/#\/framework\//, { timeout: 60_000 });
    const frameworkId = decodeURIComponent(page.url().split('#/framework/')[1].split('?')[0]);
    await expect.poll(() => app.fetchObject(frameworkId)).not.toBeNull();
    // Close the new framework's "Create framework" panel, which covers the toolbar.
    const createPanel = activeModal(page).filter({ hasText: 'Create framework' });
    await expect(createPanel).toBeVisible({ timeout: 60_000 });
    await createPanel.getByTitle('Done editing').first().click();
    await expect(createPanel).toBeHidden();

    const modal = await openFrameworkConfiguration(page, name);
    const setDefault = configRow(modal, name).getByRole('button', { name: 'set as framework default' });
    await setDefault.click();
    return { frameworkId, setDefault };
}
const propertyChoices = (page) => page.locator('.property-button p.has-text-weight-semibold');

test.describe('Configurations', () => {
    test('CFG-01 create and save a configuration @P1', async ({ app, page, account, console: log }) => {
        await app.login(account, '/configuration');
        const me = await app.publicKey();
        const name = unique('CFG-01 config');

        await configPage(page).getByText('create new configuration').click();
        await expect(nameInput(page)).toHaveValue('New Configuration');
        // The name is required (regression: scrolling to the error threw in the $scrollTo shim).
        await nameInput(page).fill('');
        await saveConfiguration(page).click();
        await expect(page.getByText('*Configuration name is required')).toBeVisible();
        // The section links scroll to their section (same shim).
        await page.locator('.panel-block', { hasText: 'Competency Settings' }).click();
        const competencyPropertiesLink = page.locator('.sub-list a.panel-block', { hasText: 'Properties' }).first();
        await competencyPropertiesLink.click();
        await expect(page.locator('#competency-properties')).toBeInViewport();
        await page.locator('.panel-block', { hasText: 'General Details' }).click();

        await nameInput(page).fill(name);
        await descriptionInput(page).fill('Made by CFG-01');
        await saveConfiguration(page).click();

        // Back on the list, under its new name (not "New Configuration").
        const row = configRow(configPage(page), name);
        await expect(row).toBeVisible();
        await expect(row).toContainText('Made by CFG-01');
        await expect.poll(() => configurationIdsNamed(page, name)).toHaveLength(1);
        const [id] = await configurationIdsNamed(page, name);
        const saved = await app.fetchObject(id);
        expect(saved).toMatchObject({ '@type': 'Configuration', name, description: 'Made by CFG-01' });
        expect(saved.owner).toContain(me);
        expect([false, 'false']).toContain(saved.isDefault);

        // The rename stuck: still listed by name after a reload.
        await openConfigurations(app, name);
        await expect(configRow(configPage(page), name).getByTitle('Manage configuration')).toBeVisible();
        expect(problems(log)).toEqual([]);
    });

    test('CFG-01 the configuration list survives a malformed configuration (known bug: one configuration without frameworkConfig @id empties the list) @P1', async ({ app, page, account, console: log }) => {
        test.fail(true, 'configuration.js buildSimpleConfigObjectFrameworkData throws on a configuration whose frameworkConfig lacks @id, and the whole list stays empty; see e2e/FINDINGS.md');
        await app.login(account);
        const name = unique('CFG-01 listed');
        const configId = await seedConfiguration(page, { name });
        await app.waitIndexed(`@id:"${configId}"`);
        // The malformed configuration is only added to this page's searches: saved on the shared
        // server it would break every other test's configuration screens.
        const malformed = await page.evaluate((data) => {
            const c = new schema.Thing();
            c.copyFrom(data);
            c.generateId(repo.selectedServer);
            delete c.frameworkConfig['@id'];
            return JSON.parse(c.toJson());
        }, configurationData({ name: unique('CFG-01 malformed') }));
        await addConfigurationToSearches(page, malformed);

        await app.open('/configuration');
        await expect(configRow(configPage(page), name)).toBeVisible({ timeout: 15_000 });
        expect(log.pageErrors).toEqual([]);
    });

    test('CFG-04 a configuration with a custom property stays listed (known bug: CaSS server, the configuration index is at its field limit) @P1', async ({ app, page, account }) => {
        test.fail(true, 'CaSS saves a configuration with a custom property but its Elasticsearch configuration index (~1000-field limit) rejects it, so search never finds it; a server bug, see e2e/FINDINGS.md');
        await app.login(account);
        const name = unique('CFG-04 custom listed');
        const prop = propertyName('fwlisted');
        const configId = await seedConfiguration(page, { name });
        await app.waitIndexed(`@id:"${configId}"`);
        // Save it again with a custom framework property, the way the editor saves a configuration
        // (repo.saveTo; a multiPut of it is silently dropped by CaSS).
        const { frameworkConfig } = configurationData({ name, frameworkProperties: [{ name: prop, label: 'E2E listed link' }] });
        await page.evaluate(async ({ id, frameworkConfig }) => {
            const c = await EcRepository.get(id);
            c.frameworkConfig = frameworkConfig;
            await new Promise((resolve, reject) => repo.saveTo(c, resolve, reject));
        }, { id: configId, frameworkConfig });
        // Saved (read straight from CaSS, not the page's cache)...
        const stored = await (await page.request.get(configId)).json();
        expect(label(stored.frameworkConfig[CONTEXT + prop])).toBe('E2E listed link');
        // ...and found by search and on the Configurations page.
        await expect.poll(() => configurationIdsNamed(page, name), { timeout: 20_000 }).toEqual([configId]);
        await app.open('/configuration');
        await expect(configRow(configPage(page), name)).toBeVisible();
    });

    test('CFG-02 set as framework default @P0', async ({ app, page, account, console: log }) => {
        // Loads the editor four times (two logins, two framework deep links).
        test.slow();
        await app.login(account);
        const name = unique('CFG-02 config');
        const configId = await seedConfiguration(page, { name });
        const framework = await seedFramework(page, { name: unique('CFG-02 framework'), competencies: ['Only'] });
        await app.waitIndexed(`@id:"${configId}"`);

        await openFramework(app, framework.id);
        const chip = toolbarConfig(page);
        await expect(chip).toBeVisible();
        await expect(chip).not.toContainText(name);

        // Toolbar → Framework Configuration modal → "set as framework default" (a real button).
        const modal = await openFrameworkConfiguration(page, name);
        const row = configRow(modal, name);
        await expect(row).toBeVisible();
        const setDefault = row.getByRole('button', { name: 'set as framework default' });
        await expect(setDefault).toBeEnabled();
        await setDefault.click();
        await expect(setDefault).toBeDisabled();

        await expect.poll(async () => (await app.fetchObject(framework.id)).configuration).toBe(configId);
        await modal.getByRole('button', { name: 'Done' }).click();
        await expect(modal).toBeHidden();
        await expect(chip).toContainText(name, { timeout: 30_000 });

        // Persists across sessions: a fresh load of the framework shows (and uses) the configuration.
        await app.login(account);
        await openFramework(app, framework.id);
        await expect(toolbarConfig(page)).toContainText(name, { timeout: 30_000 });
        await expect.poll(() => editorConfigurationId(page)).toBe(configId);
        await expect(configRow(await openFrameworkConfiguration(page, name), name).getByRole('button', { name: 'set as framework default' })).toBeDisabled();
        expect(problems(log)).toEqual([]);
    });

    test('CFG-03 set the browser default @P1', async ({ app, page, account, console: log }) => {
        // Opens the Configurations page twice and a new framework in between.
        test.slow();
        await app.login(account);
        const name = unique('CFG-03 config');
        const configId = await seedConfiguration(page, { name });
        await openConfigurations(app, name);

        // The browser-default switch on the configuration's row.
        const row = configRow(configPage(page), name);
        const switchInput = row.locator('input[type=checkbox]');
        await expect(switchInput).not.toBeChecked();
        await row.locator('label').click();
        const modal = activeModal(page).filter({ hasText: 'Configuration set as browser default' });
        await expect(modal).toBeVisible();
        await expect(modal).toContainText(`${name} has been set as your browser's default`);
        await modal.getByRole('button', { name: 'Ok' }).click();
        await expect(modal).toBeHidden();
        await expect(switchInput).toBeChecked();
        expect(await browserDefaultId(page)).toBe(configId);

        // New frameworks open with this configuration applied.
        await app.go('/frameworks');
        await page.getByText(/^\s*new\s*$/i).first().click();
        await page.locator('.dropdown-item', { hasText: /^\s*Framework\s*$/ }).click();
        await expect(page).toHaveURL(/#\/framework\//);
        await expect(toolbarConfig(page)).toContainText(name, { timeout: 30_000 });
        await expect.poll(() => editorConfigurationId(page)).toBe(configId);

        // Switching it off clears the browser default (no confirmation needed).
        await openConfigurations(app, name);
        await expect(configRow(configPage(page), name).locator('input[type=checkbox]')).toBeChecked();
        await configRow(configPage(page), name).locator('label').click();
        await expect(configRow(configPage(page), name).locator('input[type=checkbox]')).not.toBeChecked();
        expect(await browserDefaultId(page)).toBeNull();
        expect(problems(log)).toEqual([]);
    });

    test('CFG-04 custom framework and competency properties @P1', async ({ app, page, account, console: log }) => {
        await app.login(account);
        const name = unique('CFG-04 config');
        const configId = await seedConfiguration(page, { name });
        await openConfigurations(app, name);
        await configRow(configPage(page), name).getByTitle('Manage configuration').click();
        await expect(nameInput(page)).toHaveValue(name);

        const fwProp = propertyName('fwprop');
        const compProp = propertyName('compprop');
        const modal = activeModal(page);

        // Custom framework property (URL).
        await page.getByText('add custom framework property').click();
        await expect(modal).toContainText('New Framework Property');
        // The range/type list loads (regression: availableTypes state).
        const rangeSelect = modal.locator('select').nth(1);
        await expect(rangeSelect.locator('option')).toHaveText(['Lang-String', 'URL', 'Text', 'Date-Time', 'Date', 'SKOS Concept', 'Competency']);
        // Required fields are validated.
        await modal.getByRole('button', { name: /apply new property/ }).click();
        await expect(modal.getByText('Property name is required')).toBeVisible();
        await expect(modal.getByText('Label is required')).toBeVisible();
        await expect(modal.getByText('Description is required')).toBeVisible();
        const inputs = modal.locator('input.input');
        await rangeSelect.selectOption({ label: 'URL' });
        await inputs.nth(0).fill(fwProp);
        await inputs.nth(1).fill('E2E framework link');
        await inputs.nth(2).fill('A custom framework property');
        await modal.getByRole('button', { name: /apply new property/ }).click();
        await expect(modal).toBeHidden();
        await expect(page.locator('#framework-properties tr', { hasText: fwProp }).locator('input').first()).toHaveValue('E2E framework link');

        // Custom competency property (Text).
        await page.getByText('add custom competency property').click();
        await expect(modal).toContainText('New Competency Property');
        await expect(modal.locator('select').nth(1)).toHaveValue('http://schema.org/Text');
        await inputs.nth(0).fill(compProp);
        await inputs.nth(1).fill('E2E competency note');
        await inputs.nth(2).fill('A custom competency property');
        await modal.getByRole('button', { name: /apply new property/ }).click();
        await expect(modal).toBeHidden();
        await expect(page.locator('#competency-properties tr', { hasText: compProp }).locator('input').first()).toHaveValue('E2E competency note');

        await saveConfiguration(page).click();
        await expect(configPage(page).getByText('create new configuration')).toBeVisible();
        // Listing it after the save: see 'CFG-04 a configuration with a custom property stays listed (known bug: ...)'.
        // Read straight from CaSS (app.fetchObject could answer from the page's cache).
        const saved = await (await page.request.get(configId)).json();
        expect(saved.name).toBe(name);
        expect(label(saved.frameworkConfig[CONTEXT + fwProp])).toBe('E2E framework link');
        expect(range(saved.frameworkConfig[CONTEXT + fwProp])).toBe('http://schema.org/URL');
        expect(label(saved.competencyConfig[CONTEXT + compProp])).toBe('E2E competency note');
        expect(range(saved.competencyConfig[CONTEXT + compProp])).toBe('http://schema.org/Text');

        // A framework using this configuration offers the custom property; add it to a competency.
        const framework = await seedFramework(page, { name: unique('CFG-04 framework'), competencies: ['Annotated'], configuration: configId });
        await openFramework(app, framework.id);
        await expect(toolbarConfig(page)).toContainText(name, { timeout: 30_000 });
        await openAddProperty(page, framework.competencies.Annotated);
        await page.locator('.property-button', { hasText: 'E2E competency note' }).click();
        await page.locator('.add-property-field textarea').fill('Noted by CFG-04');
        await page.getByText('save property', { exact: true }).click();
        await expect(page.getByText('save property', { exact: true })).toBeHidden();
        await page.getByTitle('Done editing').first().click();

        await expect.poll(async () => {
            const competency = await app.fetchObject(framework.competencies.Annotated);
            const key = Object.keys(competency ?? {}).find((k) => k.endsWith(compProp));
            return key ? JSON.stringify(competency[key]) : null;
        }).toContain('Noted by CFG-04');
        await expect(page.locator(`li[id="${framework.competencies.Annotated}"]`)).toContainText('Noted by CFG-04');
        expect(problems(log)).toEqual([]);
    });

    test('CFG-05 manage relationship types @P2', async ({ app, page, account, console: log }) => {
        // Configuration screen, a framework and the crosswalk of two frameworks in one test.
        test.slow();
        await app.login(account);
        const name = unique('CFG-05 config');
        const configId = await seedConfiguration(page, { name });
        await openConfigurations(app, name);
        await configRow(configPage(page), name).getByTitle('Manage configuration').click();
        await expect(nameInput(page)).toHaveValue(name);

        // Disable "is related to", enable "implies".
        await page.getByText('manage relationships', { exact: true }).click();
        const modal = activeModal(page).filter({ hasText: 'Manage relationship types' });
        await expect(modal).toBeVisible();
        await expect(modal.locator('#isRelatedTomanagecass')).toBeChecked();
        await expect(modal.locator('#impliesmanagecass')).not.toBeChecked();
        await modal.locator('label[for="isRelatedTomanagecass"]').click();
        await modal.locator('label[for="impliesmanagecass"]').click();
        await expect(modal.locator('#isRelatedTomanagecass')).not.toBeChecked();
        await expect(modal.locator('#impliesmanagecass')).toBeChecked();
        await modal.getByText('ok', { exact: true }).click();
        await expect(modal).toBeHidden();
        const enabledList = page.locator('#relationship-types tbody tr:visible th');
        await expect(enabledList.filter({ hasText: /^\s*implies\s*$/ })).toHaveCount(1);
        await expect(enabledList.filter({ hasText: /^\s*isRelatedTo\s*$/ })).toHaveCount(0);
        await saveConfiguration(page).click();
        await expect(configPage(page).getByText('create new configuration')).toBeVisible();
        // (The list is not checked: enabling a relationship type the index has not seen adds fields
        // too; see the CFG-04 known-bug test.)
        const saved = await app.fetchObject(configId);
        expect(Object.keys(saved.relationshipConfig)).toContain('implies');
        expect(Object.keys(saved.relationshipConfig)).not.toContain('isRelatedTo');

        // The editor's relationship choices follow the configuration.
        const source = await seedFramework(page, { name: unique('CFG-05 source'), competencies: ['Source competency'], configuration: configId });
        const target = await seedFramework(page, { name: unique('CFG-05 target'), competencies: ['Target competency'] });
        await openFramework(app, source.id);
        await expect(toolbarConfig(page)).toContainText(name, { timeout: 30_000 });
        await openAddProperty(page, source.competencies['Source competency']);
        await page.locator('.button', { hasText: /^\s*relationships\s*$/ }).click();
        await expect(propertyChoices(page).filter({ hasText: /^\s*implies\s*$/ })).toHaveCount(1);
        await expect(propertyChoices(page).filter({ hasText: /^\s*is related to\s*$/i })).toHaveCount(0);
        await expect(propertyChoices(page).filter({ hasText: /^\s*narrows\s*$/ })).toHaveCount(1);

        // The crosswalk's relation dropdown follows the source framework's configuration.
        await app.waitIndexed(`@id:"${source.id}"`);
        await app.waitIndexed(`@id:"${target.id}"`);
        await app.open('/crosswalk');
        const search = page.locator('.cass--search-bar input[type=search]').first();
        const listItem = (text) => page.locator('.crosswalk__list li.cass--list--item', { hasText: text });
        await expect(search).toBeEnabled();
        await search.fill(`"${source.name}"`);
        await listItem(source.name).click();
        await expect(search).toBeEnabled();
        // Step B (target): picking the source clears the search box, so wait for the step, then pick.
        await expect(page.locator('.step-item.current')).toContainText('select target');
        await expect(async () => {
            await search.fill(`"${target.name}"`);
            await listItem(target.name).click({ timeout: 5_000 });
            await expect(page.locator('.crosswalk__double-hierarchy')).toBeVisible({ timeout: 5_000 });
        }).toPass({ timeout: 30_000 });
        const options = page.locator('.crosswalk-buttons__source__select select').first().locator('option');
        await expect(options.first()).toBeAttached({ timeout: 30_000 });
        await expect.poll(async () => (await options.allTextContents()).map((t) => t.trim())).toContain('implies');
        const optionTexts = (await options.allTextContents()).map((t) => t.trim());
        expect(optionTexts).not.toContain('is related to');
        expect(optionTexts).toEqual(expect.arrayContaining(['narrows', 'requires', 'desires', 'is enabled by', 'is equivalent to']));
        expect(problems(log)).toEqual([]);
    });

    test.describe('CFG-06 delete a configuration / permission guard @P2', () => {
        test('delete an owned configuration (cancel, then confirm)', async ({ app, page, account, console: log }) => {
            await app.login(account);
            const name = unique('CFG-06 delete');
            const configId = await seedConfiguration(page, { name });
            await openConfigurations(app, name);
            const row = configRow(configPage(page), name);

            await row.getByTitle('Delete configuration').click();
            const modal = activeModal(page).filter({ hasText: 'Delete Configuration' });
            await expect(modal).toBeVisible();
            await expect(modal).toContainText('This action is permanent.');
            await modal.getByRole('button', { name: 'Cancel' }).click();
            await expect(modal).toBeHidden();
            await expect(row).toBeVisible();
            expect(await app.fetchObject(configId)).toMatchObject({ name });

            await row.getByTitle('Delete configuration').click();
            await expect(modal).toBeVisible();
            await modal.getByRole('button', { name: 'Yes, Delete Configuration' }).click();
            await expect(modal).toBeHidden();
            await expect(configRow(configPage(page), name)).toHaveCount(0);
            expect(problems(log)).toEqual([]);
            await expect.poll(() => app.fetchObject(configId)).toBeNull();
        });

        test('a configuration owned by someone else is view-only', async ({ app, page, account, console: log }) => {
            await app.login(account);
            const name = unique('CFG-06 foreign');
            await seedConfiguration(page, { name, foreign: true });
            await openConfigurations(app, name);
            const row = configRow(configPage(page), name);
            await expect(row.getByTitle('View configuration')).toBeVisible();
            await expect(row.getByTitle('Manage configuration')).toHaveCount(0);
            await expect(row.getByTitle('Delete configuration')).toHaveCount(0);

            // The eye button opens the details read-only: no inputs, no save, a back button.
            await row.getByTitle('View configuration').click();
            await expect(page.locator('#configuration-details')).toContainText(name);
            await expect(page.locator('#configuration-details input.input')).toHaveCount(0);
            await expect(saveConfiguration(page)).toHaveCount(0);
            await expect(page.getByText('add custom framework property')).toHaveCount(0);
            await page.getByText('back', { exact: true }).click();
            await expect(configRow(configPage(page), name)).toBeVisible();
            expect(problems(log)).toEqual([]);
        });

        test('a logged-out user cannot apply a configuration with default owners', async ({ app, page, account, console: log }) => {
            const { frameworkId, setDefault } = await setGuardedConfigurationAsAnonymous(app, page, account);
            // The guard trips (ConfigurationList.vue flags "must be logged in")...
            await expect.poll(() => page.evaluate(() => window.app.$pinia._s.get('configuration').showMustBeLoggedInModal)).toBe(true);
            // (Its "Not permitted" modal: see the CFG-06 known-bug test below.)
            // ...and nothing is saved.
            await expect(setDefault).toBeEnabled();
            expect((await app.fetchObject(frameworkId)).configuration).toBeUndefined();
            expect(problems(log)).toEqual([]);
        });

        test('CFG-06 a logged-out user applying a configuration with default owners sees "Not permitted" (known bug: the modal only renders on the Configurations page) @P2', async ({ app, page, account }) => {
            test.fail(true, 'Only ConfigurationEditor.vue renders ConfigurationNotPermitted, so the guard on the framework page shows nothing; see e2e/FINDINGS.md');
            await setGuardedConfigurationAsAnonymous(app, page, account);
            const notPermitted = activeModal(page).filter({ hasText: 'Not permitted' });
            await expect(notPermitted).toBeVisible({ timeout: 10_000 });
            await expect(notPermitted).toContainText('Log in to access');
        });
    });
});
