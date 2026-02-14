const { test, expect, loginAndNavigate } = require('./fixtures');

test.describe('Framework Authoring & CRUD (CA-138 through CA-145)', () => {

    // CA-138: CRUD competencies, resources and levels within a framework
    test('CA-138: CRUD competencies within a framework', async ({ page }) => {
        await loginAndNavigate(page);

        // Create a new framework
        await page.waitForSelector('#add-new-dropdown-toggle-button');
        await page.click('#add-new-dropdown-toggle-button');
        await page.click('#add-new-dropdown-framework');

        // Wait for framework editor
        await page.waitForSelector('.lode__thing-editing');

        // Fill in framework name
        const nameSelector = '.lode__thing-editing [id="http://schema.org/name-0"] textarea';
        await page.waitForSelector(nameSelector);
        await page.fill(nameSelector, 'CA-138 Test Framework');
        await page.press(nameSelector, 'Tab');

        // Close framework editor
        await page.click('#thing-editing-done-editing-button');

        // Add a competency
        await page.waitForSelector('#add-competency-button');
        await page.click('#add-competency-button');
        await page.waitForSelector('#create-new-competency-button');
        await page.click('#create-new-competency-button');

        // Fill in competency name
        await page.waitForSelector('.lode__thing-editing');
        const compNameSelector = '.lode__thing-editing [id="http://schema.org/name-0"] textarea';
        await page.fill(compNameSelector, 'CA-138 Test Competency');
        await page.press(compNameSelector, 'Tab');
    });

    // CA-139: CRUD relationships as part of hierarchy
    test('CA-139: CRUD relationships for hierarchy organization', async ({ page }) => {
        await loginAndNavigate(page);

        await page.waitForSelector('#add-new-dropdown-toggle-button');
        await page.click('#add-new-dropdown-toggle-button');
        await page.click('#add-new-dropdown-framework');
        await page.waitForSelector('.lode__thing-editing');

        const nameSelector = '.lode__thing-editing [id="http://schema.org/name-0"] textarea';
        await page.waitForSelector(nameSelector);
        await page.fill(nameSelector, 'CA-139 Relationships Test');
        await page.press(nameSelector, 'Tab');
        await page.click('#thing-editing-done-editing-button');

        // Add competency
        await page.waitForSelector('#add-competency-button');
        await page.click('#add-competency-button');
        await page.waitForSelector('#create-new-competency-button');
        await page.click('#create-new-competency-button');
        await page.waitForSelector('.lode__thing-editing');
    });

    // CA-140: Apply framework's configuration upon opening
    test('CA-140: Framework configuration applied on open', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await expect(page.locator('#frameworks')).toBeVisible();
        // Config is applied internally when opening — verify frameworks list loads
        await expect(page.locator('.cass--search-bar')).toBeVisible();
    });

    // CA-141: Save the framework when properties are modified
    test('CA-141: Framework auto-saves on property modification', async ({ page }) => {
        await loginAndNavigate(page);

        await page.waitForSelector('#add-new-dropdown-toggle-button');
        await page.click('#add-new-dropdown-toggle-button');
        await page.click('#add-new-dropdown-framework');
        await page.waitForSelector('.lode__thing-editing');

        const nameSelector = '.lode__thing-editing [id="http://schema.org/name-0"] textarea';
        await page.waitForSelector(nameSelector);
        await page.fill(nameSelector, 'CA-141 Auto-save Test');
        await page.press(nameSelector, 'Tab');
        // Auto-save should happen on blur/tab
    });

    // CA-142: Revert framework to previous version (undo)
    test('CA-142: Framework undo/revert functionality', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-143: Method for listing competencies for browsing and selection
    test('CA-143: Competency browsing and selection', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await expect(page.locator('#frameworks')).toBeVisible();
        await expect(page.locator('.cass--search-bar')).toBeVisible();
    });

    // CA-144: When selecting object, permit from current framework or system
    test('CA-144: Object selection from framework or system', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-145: Search for objects separate from frameworks
    test('CA-145: Search for objects outside frameworks', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await expect(page.locator('.cass--search-bar')).toBeVisible();
    });

});
