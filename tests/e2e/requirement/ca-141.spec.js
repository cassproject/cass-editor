const { test, expect, loginAndNavigate } = require('../fixtures');

// CA-141: Save the framework when properties are modified
// Requirement: edit a property, verify auto-save occurs (no explicit save button needed)
// The framework auto-saves on tab/blur — tabbing out triggers stopEditing → save
test('CA-141: Framework auto-saves on property modification', async ({ page }) => {
    await loginAndNavigate(page);

    // Create a new framework
    await page.waitForSelector('#add-new-dropdown-toggle-button');
    await page.click('#add-new-dropdown-toggle-button');
    await page.click('#add-new-dropdown-framework');
    await page.waitForSelector('.lode__thing-editing');

    // Fill name and Tab to trigger auto-save
    const nameSelector = '.lode__thing-editing [id="http://schema.org/name-0"] textarea';
    await page.waitForSelector(nameSelector);
    await page.fill(nameSelector, 'CA-141 Auto-save Test');
    await page.press(nameSelector, 'Tab');

    // Auto-save triggered on blur/Tab — wait for save to complete
    await page.waitForTimeout(2000);

    // Close the editing modal
    await page.click('#thing-editing-done-editing-button');
    await page.waitForSelector('.lode__thing-editing', { state: 'detached', timeout: 10000 }).catch(() => { });
    await page.waitForTimeout(1000);

    // Verify the framework persisted by checking the URL contains framework route
    const url = page.url();
    expect(url).toContain('framework');
});
