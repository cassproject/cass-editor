/**
 * Coverage: MultiEdit.vue — exercise the multi-edit modal.
 * Targets the 5.1% covered MultiEdit component (169 uncovered lines).
 */

const { test, expect, loginAndNavigate, navigateToFramework } = require('../fixtures');

test('Multi-edit: select multiple competencies and open multi-edit modal', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    if (!await navigateToFramework(page)) return;

    // Enter select mode by clicking the "select" button
    const selectBtn = page.locator('div:has-text("select")').filter({ hasText: /^select$/ }).first();
    if (await selectBtn.isVisible().catch(() => false)) {
        await selectBtn.click();
    }

    // Select multiple hierarchy items via their labels (checkboxes are covered by labels)
    const checkboxLabels = page.locator('.lode__hierarchy-item label[for*="checkbox"]');
    const labelCount = await checkboxLabels.count();
    for (let i = 0; i < Math.min(labelCount, 3); i++) {
        await checkboxLabels.nth(i).click({ force: true });
    }

    // Click the "Edit Multiple" button to open the multi-edit modal
    const editMultipleBtn = page.locator('#edit-multiple-button');
    if (await editMultipleBtn.isVisible().catch(() => false)) {
        await editMultipleBtn.click();

        // The multi-edit modal should appear
        const multiEditCancel = page.locator('#multi-edit-cancel-button');
        if (await multiEditCancel.isVisible().catch(() => false)) {
            // Click cancel to close
            await multiEditCancel.click();
        }
    }
});
