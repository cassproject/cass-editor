const { test, expect, loginAndCreateConfig } = require('../fixtures');

// CA-103: Prevent saving object missing required/primary property
// Task: mark a property as required in config, leave it blank on an object, verify save is blocked
test('CA-103: Saving is prevented when properties marked required in config are missing', async ({ page }) => {
    // 1. Create a config (fills name and description)
    const uid = await loginAndCreateConfig(page);

    // Save configuration immediately so it is no longer "new"
    await page.click('#configuration-details-save-configuration-button');

    // Wait to return to the list view which means save is done
    await expect(page.locator('#create-new-configuration-button')).toBeVisible();

    // Wait for the config list to populate and click our new config (handle eventual consistency)
    const configRow = page.locator(`tr:has-text("TestConfig${uid}")`);
    await configRow.waitFor({ state: 'visible' });
    await configRow.locator('#configuration-list-item-manage-configuration-button').click();

    // Wait for details to load
    await expect(page.locator('#configuration-details')).toBeVisible();

    // 2. Set config as browser default so it applies locally
    await page.locator('label[for="browserDefaultSwitch"]').click();

    // Handle the success modal
    await expect(page.locator('#configuration-set-success-ok-button')).toBeVisible();
    await page.click('#configuration-set-success-ok-button');
    await expect(page.locator('#configuration-set-success-ok-button')).toBeHidden();

    // 3. Go to framework tab, make 'description' required
    await page.click('#configuration-details-framework-tab');
    await page.locator('label[for="descriptionframework"]').click();

    // Save configuration again
    await page.click('#configuration-details-save-configuration-button');

    // Wait to return to the list view
    await expect(page.locator('#create-new-configuration-button')).toBeVisible();

    // 4. Create a new Framework
    await page.click('#side-nav-frameworks-link');
    await page.waitForSelector('.lode__thing-heading', { state: 'visible' });
    await page.click('#add-new-dropdown-toggle-button');
    await page.click('#add-new-dropdown-framework');

    // Wait for creation modal content
    await page.waitForSelector('.lode__thing-editing', { state: 'visible' });

    // Fill Name
    const nameInput = page.locator('#name-0 textarea');
    await nameInput.waitFor({ state: 'visible' });
    await nameInput.fill(`Test Framework CA-103 ${uid}`);

    // Add the description property so we can see the validation error on it
    await page.locator('#thing-editing-add-property-button').click();
    await page.locator('#description').click();

    // Make sure the description field is present (but we leave it blank intentionally)
    await expect(page.locator('#property-string-textarea-description')).toBeVisible();

    // 5. Click 'done' without filling out the description (which is now required)
    await page.click('#thing-editing-save-property-button');

    // 6. Expected behavior: A modal should appear saying "Description is required."
    await expect(page.locator('.help')).toContainText('Value is required to save');
});
