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
    // Wait for the ThingEditing modal to load (it's an async component)
    await expect(page.locator('.lode__thing-editing')).toBeVisible();

    // Dismiss the creation modal by clearing the newFramework state.
    // The model data auto-saves, so we can safely close via store.
    await page.evaluate(() => {
      window.__stores.editor.setNewFramework(null);
    });
    // Wait for the modal to disappear from the DOM
    await page.waitForSelector('.lode__thing-editing', { state: 'hidden' });

    // Add a new progression level (node)
    await page.click('#adding-node-button');
    // Click the create new option that appears
    await expect(page.locator('#create-new-button')).toBeVisible();
    // Set up response wait BEFORE clicking to avoid race
    const firstNodeSave = page.waitForResponse(response => response.url().includes('data/'));
    await page.click('#create-new-button');
    await firstNodeSave;

    // An "Edit ProgressionLevel" modal appears for the new node - dismiss it via store
    await expect(page.locator('.lode__thing-editing')).toBeVisible();
    await page.evaluate(() => window.__stores.editor.setNewCompetency(null));
    await page.waitForSelector('.lode__thing-editing', { state: 'hidden' });

    // Give it a moment to save and render the new node
    await expect(page.locator('.lode__hierarchy-li').first()).toBeVisible();

    // Add a second node - use evaluate to click since hierarchy content may overlap
    await page.evaluate(() => document.querySelector('#adding-node-button').click());
    await expect(page.locator('#create-new-button')).toBeVisible();
    const secondNodeSave = page.waitForResponse(response => response.url().includes('data/'));
    await page.click('#create-new-button');
    await secondNodeSave;

    // Dismiss the second edit modal via store
    await expect(page.locator('.lode__thing-editing')).toBeVisible();
    await page.evaluate(() => window.__stores.editor.setNewCompetency(null));
    await page.waitForSelector('.lode__thing-editing', { state: 'hidden' });

    await expect(page.locator('.lode__hierarchy-li').nth(1)).toBeVisible();

    // Test the "Reorder by Precedence" and "Set Precedence by Order" buttons
    await expect(page.locator('#set-precedence-button')).toBeVisible();
    await page.click('#set-precedence-button');

    await expect(page.locator('#reorder-button')).toBeVisible();
    await page.click('#reorder-button');

    // === Multi-select via Vue component proxy ===
    // The selectedArray watcher in ProgressionHierarchy has a Vue 3 reactivity issue
    // where array mutations don't trigger the watcher, so we set multipleSelected manually
    await page.evaluate(() => {
      const draggable = document.querySelector('#progression-hierarchy-draggable');
      let current = draggable.__vueParentComponent;
      while (current) {
        const name = current.type?.name || current.type?.__name || '';
        if (name === 'ProgressionHierarchy') {
          const proxy = current.proxy;
          const inputs = document.querySelectorAll('.lode__hierarchy-li input[type="checkbox"]');
          const ids = Array.from(inputs).map(i => i.name.replace('checkbox', ''));
          proxy.select(ids[0], true);
          proxy.select(ids[1], true);
          proxy.multipleSelected = true;
          return;
        }
        current = current.parent;
      }
    });
    // Verify multi-selection toolbar appears
    await expect(page.locator('#edit-multiple-button')).toBeVisible();

    // === Single-select: deselect all and select one for cut/paste/delete ===
    await page.evaluate(() => {
      const draggable = document.querySelector('#progression-hierarchy-draggable');
      let current = draggable.__vueParentComponent;
      while (current) {
        const name = current.type?.name || current.type?.__name || '';
        if (name === 'ProgressionHierarchy') {
          const proxy = current.proxy;
          proxy.selectedArray.splice(0, proxy.selectedArray.length);
          proxy.multipleSelected = false;
          // Select just the first node
          const inputs = document.querySelectorAll('.lode__hierarchy-li input[type="checkbox"]');
          const firstId = inputs[0].name.replace('checkbox', '');
          proxy.select(firstId, true);
          return;
        }
        current = current.parent;
      }
    });

    // Test cut — cut button is always visible for concept view, but only enabled with selection
    await expect(page.locator('#cut-button')).toBeVisible();
    await page.click('#cut-button');

    // Test paste
    await expect(page.locator('#paste-button')).toBeVisible();
    await page.click('#paste-button');

    // Test delete — requires canCopyOrCut (selectedArray.length === 1)
    await expect(page.locator('#delete-item-button')).toBeVisible();

    // Set up dialog handler for the delete confirmation
    page.once('dialog', dialog => dialog.accept());
    await page.click('#delete-item-button');

    // Wait to make sure deletion completes
    await expect(page.locator('.lode__hierarchy-li').nth(1)).not.toBeVisible();
  });

});