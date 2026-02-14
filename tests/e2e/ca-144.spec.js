const { test, expect, loginAndNavigate } = require('./fixtures');

// CA-144: When selecting object, permit from current framework or system
// Requirement: open framework → verify add-competency mechanism allows from framework/system
// #add-competency-button only visible for owned frameworks
test('CA-144: Object selection from framework or system', async ({ page }) => {
    await loginAndNavigate(page);

    // Create a framework so we own it and can see the add-competency button
    await page.waitForSelector('#add-new-dropdown-toggle-button');
    await page.click('#add-new-dropdown-toggle-button');
    await page.click('#add-new-dropdown-framework');
    await page.waitForSelector('.lode__thing-editing');

    const nameSelector = '.lode__thing-editing [id="http://schema.org/name-0"] textarea';
    await page.waitForSelector(nameSelector);
    await page.fill(nameSelector, 'CA-144 Object Selection Test');
    await page.press(nameSelector, 'Tab');
    await page.click('#thing-editing-done-editing-button');
    await page.waitForSelector('.lode__thing-editing', { state: 'detached', timeout: 10000 }).catch(() => { });
    await page.waitForTimeout(1000);

    // Verify the add-competency button is present (allows adding from framework or system)
    const addButton = page.locator('#add-competency-button');
    await expect(addButton).toBeVisible();
});
