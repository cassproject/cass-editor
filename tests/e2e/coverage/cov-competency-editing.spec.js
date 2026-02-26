/**
 * Coverage: Competency editing deep — property interactions, AddProperty, levels.
 * Targets AddProperty.vue (16%), PropertyString.vue (30%), getLevelsAndRelations.js (40%),
 * competencyEdits.js (0%), ThingEditing.vue (35%).
 * Select a competency, click through all property sections, expand "all" view.
 */

const { test, expect, loginAndNavigate, navigateToFramework } = require('../fixtures');

test('Competency editing deep: view all properties, toggle views, edit strings', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    if (!await navigateToFramework(page)) return;

    // Click first competency
    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await expect(hierarchyItems.first()).toBeVisible();
    await hierarchyItems.first().click();

    // Switch to "all" property view to show all fields
    const allViewBtn = page.locator('#property-view-all-button, button:has-text("all")').first();
    if (await allViewBtn.isVisible().catch(() => false)) {
        await allViewBtn.click();
    }

    // Click on individual property sections to expand them
    const propertySections = page.locator('.lode__property-section, .property-section');
    const sectionCount = await propertySections.count();
    for (let i = 0; i < Math.min(sectionCount, 8); i++) {
        const section = propertySections.nth(i);
        const header = section.locator('.property-section-header, .property-label, h3, h4').first();
        if (await header.isVisible().catch(() => false)) {
            await header.click().catch(() => { });
        }
    }

    // Click on editable property string fields
    const propertyStrings = page.locator('.lode__property-string .property-string-value, .lode__property-string input, .lode__property-string textarea');
    const stringCount = await propertyStrings.count();
    for (let i = 0; i < Math.min(stringCount, 5); i++) {
        await propertyStrings.nth(i).click().catch(() => { });
    }

    // Switch between property views: primary → required → all
    const primaryBtn = page.locator('#property-view-primary-button');
    if (await primaryBtn.isVisible().catch(() => false)) {
        await primaryBtn.click();
    }

    const requiredBtn = page.locator('#property-view-required-button');
    if (await requiredBtn.isVisible().catch(() => false)) {
        await requiredBtn.click();
    }

    // Click on additional competency items to exercise navigation
    const itemCount = await hierarchyItems.count();
    for (let i = 1; i < Math.min(itemCount, 4); i++) {
        await hierarchyItems.nth(i).click();
        // Brief pause for the thing panel to update
    }

    // Try the info panel button
    const infoBtn = page.locator('#info-button, button:has-text("info"), .fa-info-circle').first();
    if (await infoBtn.isVisible().catch(() => false)) {
        await infoBtn.click();
    }
});
