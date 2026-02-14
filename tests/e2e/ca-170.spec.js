const { test, expect, loginAndNavigate } = require('./fixtures');

// CA-170: Revert object to previous version (undo)
// Requirement: undo button is available for owned frameworks (#undo-button in EditorToolbar)
test('CA-170: Object undo/revert functionality', async ({ page }) => {
    await loginAndNavigate(page);

    // Create a framework so we own it and can see the undo button
    await page.waitForSelector('#add-new-dropdown-toggle-button');
    await page.click('#add-new-dropdown-toggle-button');
    await page.click('#add-new-dropdown-framework');
    await page.waitForSelector('.lode__thing-editing');

    const nameSelector = '.lode__thing-editing [id="http://schema.org/name-0"] textarea';
    await page.waitForSelector(nameSelector);
    await page.fill(nameSelector, 'CA-170 Undo Test');
    await page.press(nameSelector, 'Tab');
    await page.click('#thing-editing-done-editing-button');
    await page.waitForSelector('.lode__thing-editing', { state: 'detached', timeout: 10000 }).catch(() => { });
    await page.waitForTimeout(1000);

    // Verify undo button is present for owned framework
    const undoButton = page.locator('#undo-button');
    await expect(undoButton).toBeVisible();
});
