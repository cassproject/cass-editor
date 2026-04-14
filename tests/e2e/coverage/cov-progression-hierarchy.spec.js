const { test, expect, loginAndNavigate } = require('../fixtures');

test.describe.serial('Coverage: ProgressionHierarchy component', () => {

  test('Creates a Progression Model and exercises hierarchy tools', async ({ page }) => {
    // Log in and go to Progression Levels (Progression Models) route
    await loginAndNavigate(page);
    // Set progression mode before navigation to ensure correct rendering immediately
    await page.evaluate(() => {
      window.__stores.editor.setProgressionMode( true);
      window.__stores.editor.setConceptMode( false);
      window.__stores.editor.setQueryParams({ ceasnDataFields: 'true', server: 'http://localhost/api/' });
    });
    
    await page.goto('/#/progressionLevels?ceasnDataFields=true&server=http://localhost/api/');
    await page.waitForLoadState('domcontentloaded');

    // Ensure we are interacting with the dropdown in the progression mode container
    await page.waitForSelector('.concept-buttons #add-new-dropdown-toggle-button');
    await page.click('.concept-buttons #add-new-dropdown-toggle-button');
    await expect(page.locator('#add-new-dropdown-progression-model')).toBeVisible();
    await page.click('#add-new-dropdown-progression-model');

    // It should route to the progression model view which contains the hierarchy
    await expect(page.locator('.framework-content')).toBeVisible();
    //Set description field

    await page.fill('[id$="description-0"] textarea', 'Test Progression Model');
    await page.press('[id$="description-0"] textarea', 'Tab');

    // Finish creating the model via the modal
    await page.click('#thing-editing-done-editing-button');
    // Wait for modal to disappear
    await page.waitForSelector('.lode__thing-editing', { state: 'hidden' });

    // Add a new progression level (node)
    await page.click('#adding-node-button');
    // Click the create new option that appears
    await expect(page.locator('#create-new-button')).toBeVisible();
    await page.click('#create-new-button');

    // Give it a moment to save and render the new node
    await expect(page.locator('.lode__hierarchy-li').first()).toBeVisible();

    // Add a second node
    await page.click('#adding-node-button');
    await page.click('#create-new-button');
    await expect(page.locator('.lode__hierarchy-li').nth(1)).toBeVisible();

    // Test the "Reorder by Precedence" and "Set Precedence by Order" buttons
    await expect(page.locator('#set-precedence-button')).toBeVisible();
    // Wait for save overlay to disappear before clicking
    await page.waitForResponse(response => response.url().includes('data/'));
    await page.click('#set-precedence-button');

    await expect(page.locator('#reorder-button')).toBeVisible();
    await page.waitForResponse(response => response.url().includes('data/'));
    await page.click('#reorder-button');

    // Select the first node using the checkbox in the hierarchy node (we might need to select all)
    // Let's use the select all checkbox in the hierarchy toolbar
    const selectAllCheckboxLabel = page.locator('label[for="selectAllCheckbox"]');
    if (await selectAllCheckboxLabel.isVisible()) {
      await selectAllCheckboxLabel.click();
    }

    // Wait for selection to process (button should change from "delete item" to "edit multiple" when multiple selected)
    await expect(page.locator('#edit-multiple-button')).toBeVisible();

    // Try Edit Multiple functionality (opens modal)
    await page.click('#edit-multiple-button');
    await expect(page.locator('#modal-component-MultiEdit')).toBeVisible();

    // Cancel the modal
    await page.locator('#modal-component-MultiEdit').locator('#close-modal-button').click();

    // Now deselect all, and select just one item to test cut/paste
    if (await selectAllCheckboxLabel.isVisible()) {
      await selectAllCheckboxLabel.click();
    }

    // Wait for deselection
    await expect(page.locator('#adding-node-button')).toBeVisible();

    // Select just the first item
    await page.locator('.lode__hierarchy-li').first().locator('label[for^="selectAllCheckbox"]').first().click();

    // Wait for single selection tool bar
    await expect(page.locator('#cut-button')).toBeVisible();
    await page.click('#cut-button');

    // Click Paste
    await expect(page.locator('#paste-button')).toBeVisible();
    await page.click('#paste-button');

    // Test delete item
    await expect(page.locator('#delete-item-button')).toBeVisible();

    // Set up dialog handler for the delete confirmation
    page.once('dialog', dialog => dialog.accept());
    await page.click('#delete-item-button');

    // Wait to make sure deletion completes
    await expect(page.locator('.lode__hierarchy-li').nth(1)).not.toBeVisible();
  });

});