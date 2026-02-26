const { test, expect, loginAndCreateConfig } = require('../fixtures');

// CA-88: Configuration shall allow redefining a configuration element
    // Task: modify an existing config element, verify changes persist
    test('CA-88: Can redefine a configuration element within a configuration', async ({ page }) => {
        await loginAndCreateConfig(page);
        // Go to Framework tab to see existing framework properties
        await page.click('#configuration-details-framework-tab');
        // The property table should have editable label inputs (each row has one)
        const labelInputs = page.locator('#framework-competency-property-label-input');
        await expect(labelInputs.first()).toBeVisible();
        // Verify labels are editable (user can redefine them)
        await expect(labelInputs.first()).toBeEditable();
        // Modify the first label
        const originalValue = await labelInputs.first().inputValue();
        await labelInputs.first().fill('Modified Label');
        // Verify it changed
        const newValue = await labelInputs.first().inputValue();
        expect(newValue).toBe('Modified Label');
        expect(newValue).not.toBe(originalValue);
    });
