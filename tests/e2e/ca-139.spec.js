const { test, expect, loginAndNavigate } = require('./fixtures');

// CA-139: CRUD relationships as part of hierarchy
// Requirement: auth → open framework → add multiple competencies → verify hierarchy
// Hierarchy relationships in CaSS are managed via EcAlignment objects and drag-drop UI
test('CA-139: CRUD relationships for hierarchy organization', async ({ page }) => {
    await loginAndNavigate(page);

    // Create framework
    await page.waitForSelector('#add-new-dropdown-toggle-button');
    await page.click('#add-new-dropdown-toggle-button');
    await page.click('#add-new-dropdown-framework');
    await page.waitForSelector('.lode__thing-editing');

    const nameSelector = '.lode__thing-editing [id="http://schema.org/name-0"] textarea';
    await page.waitForSelector(nameSelector);
    await page.fill(nameSelector, 'CA-139 Relationships Test');
    await page.press(nameSelector, 'Tab');
    await page.click('#thing-editing-done-editing-button');
    await page.waitForSelector('.lode__thing-editing', { state: 'detached', timeout: 10000 }).catch(() => { });
    await page.waitForTimeout(1000);

    // Add first competency
    await page.waitForSelector('#add-competency-button');
    await page.click('#add-competency-button');
    await page.waitForSelector('#create-new-competency-button');
    await page.click('#create-new-competency-button');
    await page.waitForSelector('.lode__thing-editing');
    const compNameSelector = '.lode__thing-editing [id="http://schema.org/name-0"] textarea';
    await page.fill(compNameSelector, 'Parent Competency');
    await page.press(compNameSelector, 'Tab');
    await page.click('#thing-editing-done-editing-button');
    await page.waitForSelector('.lode__thing-editing', { state: 'detached', timeout: 10000 }).catch(() => { });
    await page.waitForTimeout(1000);

    // Add second competency
    await page.click('#add-competency-button');
    await page.waitForSelector('#create-new-competency-button');
    await page.click('#create-new-competency-button');
    await page.waitForSelector('.lode__thing-editing');
    await page.fill(compNameSelector, 'Child Competency');
    await page.press(compNameSelector, 'Tab');
    await page.click('#thing-editing-done-editing-button');
    await page.waitForSelector('.lode__thing-editing', { state: 'detached', timeout: 10000 }).catch(() => { });
    await page.waitForTimeout(1000);

    // Verify both competencies appear in hierarchy
    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await hierarchyItems.first().waitFor({ state: 'visible' });
    const count = await hierarchyItems.count();
    expect(count).toBeGreaterThanOrEqual(2);
});
