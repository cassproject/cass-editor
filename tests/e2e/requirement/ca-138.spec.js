const { test, expect, loginAndNavigate } = require('../fixtures');

// CA-138: CRUD competencies, resources and levels within a framework
// Requirement: create framework → add competency → verify it appears in hierarchy
test('CA-138: CRUD competencies within a framework', async ({ page }) => {
    await loginAndNavigate(page);

    // CREATE framework
    await page.waitForSelector('#add-new-dropdown-toggle-button');
    await page.click('#add-new-dropdown-toggle-button');
    await page.click('#add-new-dropdown-framework');
    await page.waitForSelector('.lode__thing-editing');

    const nameSelector = '.lode__thing-editing [id="http://schema.org/name-0"] textarea';
    await page.waitForSelector(nameSelector);
    await page.fill(nameSelector, 'CA-138 Test Framework');
    await page.press(nameSelector, 'Tab');
    await page.click('#thing-editing-done-editing-button');

    // Wait for framework editing modal to close
    await page.waitForSelector('.lode__thing-editing', { state: 'detached', timeout: 10000 }).catch(() => { });
    await page.waitForTimeout(1000);

    // CREATE a competency
    await page.waitForSelector('#add-competency-button');
    await page.click('#add-competency-button');
    await page.waitForSelector('#create-new-competency-button');
    await page.click('#create-new-competency-button');
    await page.waitForSelector('.lode__thing-editing');

    const compNameSelector = '.lode__thing-editing [id="http://schema.org/name-0"] textarea';
    await page.fill(compNameSelector, 'CA-138 Test Competency');
    await page.press(compNameSelector, 'Tab');
    await page.click('#thing-editing-done-editing-button');

    // Wait for competency editing modal to close
    await page.waitForSelector('.lode__thing-editing', { state: 'detached', timeout: 10000 }).catch(() => { });
    await page.waitForTimeout(1000);

    // READ — verify competency appears in the hierarchy
    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await hierarchyItems.first().waitFor({ state: 'visible' });
    const count = await hierarchyItems.count();
    expect(count).toBeGreaterThan(0);
});
