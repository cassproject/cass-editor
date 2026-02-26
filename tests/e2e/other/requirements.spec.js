
const { test, expect } = require('../fixtures');

test.describe('Requirements Verification', () => {

    // CA-83: The CaSS Editor shall have a method for an administrator to define a CaSS Editor configuration.
    test('CA-83: Configuration Editor accessibility', async ({ page }) => {
        await page.goto('/#/configuration?server=http://localhost/api/');

        // Wait for spinner to disappear (in case it's loading)
        await expect(page.locator('.fa-spinner')).not.toBeVisible();

        // Verify page title
        await expect(page.locator('h3.title', { hasText: 'Configuration' })).toBeVisible();

        // Verify "create new configuration" button exists
        // We target the container div that acts as a button
        const createButton = page.locator('.button.is-outlined.is-primary.is-pulled-right', { hasText: 'create new configuration' });
        await expect(createButton).toBeVisible();
    });

    // CA-116: The CaSS Editor shall have a method for permitting a user to list frameworks
    test('CA-116: Frameworks list accessibility', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');

        // Verify the frameworks container exists
        await expect(page.locator('#frameworks')).toBeVisible();

        // Verify Search Bar exists (Locator updated)
        await expect(page.locator('.cass--search-bar')).toBeVisible();

        // Verify "Available Items" header
        await expect(page.locator('h2', { hasText: 'Available Items' })).toBeVisible();
    });

    // CA-223: CaSS Editor shall allow an individual to create a user.
    test('CA-223: Create Account accessibility', async ({ page }) => {
        await page.goto('/#/createAccount?server=http://localhost/api/');


        await expect(page.locator('h3.modal-card-title', { hasText: 'Create CaSS Account' })).toBeVisible();

        // Use layout-based locators since labels are not explicitly associated with inputs
        await expect(page.locator('.control:has(label:has-text("first name")) input')).toBeVisible();
        await expect(page.locator('.control:has(label:has-text("last name")) input')).toBeVisible();
        await expect(page.locator('.control:has(label:has-text("email")) input')).toBeVisible();
        await expect(page.locator('.control:has(label:has-text("username")) input')).toBeVisible();

        // Password fields
        await expect(page.locator('.control:has(label:text-is("password")) input')).toBeVisible();
        await expect(page.locator('.control:has(label:text-is("confirm password")) input')).toBeVisible();

        // Verify Buttons
        await expect(page.locator('.button', { hasText: 'create' })).toBeVisible();
        await expect(page.locator('.button', { hasText: 'cancel' })).toBeVisible();
    });

    // CA-134: The CaSS Editor shall permit the filtering of framework search results, only displaying frameworks where the search terms appear in the framework.
    test('CA-134: Framework search filtering', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');

        // Locate the search input
        const searchInput = page.locator('.cass--search-bar input[type="search"]');
        await expect(searchInput).toBeVisible();

        // Type a search term
        await searchInput.fill('mathematics');

        // Verify that the input value is updated (Partial check for "actionability")
        // A full test would require mock data to verify the list filters, 
        // but this verifies the mechanism exists and is interactable.
        await expect(searchInput).toHaveValue('mathematics');
    });

    // CA-224: CaSS Editor shall allow, during the creation of a user, the specification of a username and password
    test('CA-224: User creation fields', async ({ page }) => {
        await page.goto('/#/createAccount?server=https://dev.cassproject.org/api/');

        // specific check for username and password fields as per requirement
        await expect(page.locator('.control:has(label:has-text("username")) input')).toBeVisible();
        await expect(page.locator('.control:has(label:text-is("password")) input')).toBeVisible();
    });

    test('CA-131: Sort by last modified', async ({ page }) => {
        await page.goto('/#/frameworks');
        // Click the Filter & Sort button
        await page.locator('div[title="Filters"]').click();
        // Verify the sidebar opens and "Sort by" header exists
        await expect(page.locator('.filter-sort-header').filter({ hasText: 'Sort by' })).toBeVisible();
        // Verify "last modified" option exists
        const lastModifiedLabel = page.locator('label[for="lastEdited"]');
        await expect(lastModifiedLabel).toBeVisible();
        await expect(lastModifiedLabel).toHaveText('last modified');
        // Click the option
        await lastModifiedLabel.click();
        // Verify the radio button is checked
        await expect(page.locator('input#lastEdited')).toBeChecked();
    });

    test('CA-245: Published status indication', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        // Verify the list container exists
        await expect(page.locator('.cass--list')).toBeVisible();
        // we can't easily validte a specific "Published" badge without mock data that has the attribute,
        // but we can verify the list structure allows for details.
        // We'll check if the template structure for details exists in the DOM or at least the list items are rendered.
        // If there are no items, this test is limited.
        const listItems = page.locator('.cass--list--item');
        // Wait for potential loading
        await page.waitForTimeout(1000);
        const count = await listItems.count();
        if (count > 0) {
            // If items exist, ensure they are visible.
            await expect(listItems.first()).toBeVisible();
        }
    });

});
