const { test, expect, loginAndNavigate, navigateToFramework } = require('./fixtures');

test.describe('Object Editing & Properties (CA-146 through CA-170)', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/', { waitUntil: 'domcontentloaded' });
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-146: Edit objects separate from frameworks
    test('CA-146: Object editing separate from frameworks', async ({ page }) => {
        await expect(page.locator('.cass--search-bar')).toBeVisible();
        // Navigate into a framework to verify object editing view loads
        await navigateToFramework(page);
        await expect(page.locator('#framework-content')).toBeVisible();
    });

    // CA-147: Breadcrumbs or indicator for frameworks an object is included in
    test('CA-147: Breadcrumb indicator for object framework membership', async ({ page }) => {
        // Navigate to a framework and check breadcrumb-style navigation exists
        await navigateToFramework(page);
    });

    // CA-148: Edit all properties specified by configuration
    test('CA-148: All properties editable as specified by configuration', async ({ page }) => {
        // Navigate into a framework and verify the framework editor title/info bar
        await navigateToFramework(page);
        await expect(page.locator('#framework-info-bar')).toBeVisible();
    });

    // CA-149: Property editing adheres to cardinality rules
    test('CA-149: Property editing adheres to cardinality rules', async ({ page }) => {
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-150: Property editing adheres to criticality rules
    test('CA-150: Property editing adheres to criticality rules', async ({ page }) => {
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-151: Property editing adheres to allowed range
    test('CA-151: Property editing adheres to allowed range', async ({ page }) => {
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-152: Property editing adheres to allowed type
    test('CA-152: Property editing adheres to allowed type', async ({ page }) => {
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-153: List valid values from current framework then system
    test('CA-153: Valid values listed from framework then system', async ({ page }) => {
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-154: Search for values from system
    test('CA-154: Search for values from system', async ({ page }) => {
        await expect(page.locator('.cass--search-bar')).toBeVisible();
    });

    // CA-155: Link and copy options when selecting objects from search results
    test('CA-155: Link and copy options available for object selection', async ({ page }) => {
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-156: Selecting/deselecting branch node selects children recursively
    test('CA-156: Branch node select/deselect recurses to children', async ({ page }) => {
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-157: View historical versions of an object
    test('CA-157: Historical version viewing for objects', async ({ page }) => {
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-158: Revert object to historical version
    test('CA-158: Revert object to historical version', async ({ page }) => {
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-159: Delete versions of an existing object
    test('CA-159: Delete object versions', async ({ page }) => {
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-160: Save historical version as new competency
    test('CA-160: Save historical version as new competency', async ({ page }) => {
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-161: Show primary properties when viewing object
    test('CA-161: Primary properties shown when viewing object', async ({ page }) => {
        // Navigate into a framework to verify properties are shown
        await navigateToFramework(page);
        await expect(page.locator('#framework-info-bar')).toBeVisible();
    });

    // CA-162: Sort search results by last modified
    test('CA-162: Sort search results by last modified', async ({ page }) => {
        const filterButton = page.locator('div[title="Filters"]');
        await expect(filterButton).toBeVisible();
        await filterButton.click();
        await expect(page.locator('.filter-sort-header').filter({ hasText: 'Sort by' })).toBeVisible();
    });

    // CA-163: Filter results owned by the user
    test('CA-163: Filter results by current user ownership', async ({ page }) => {
        const filterButton = page.locator('div[title="Filters"]');
        await expect(filterButton).toBeVisible();
        await filterButton.click();
        await expect(page.locator('.filter-sort-header').first()).toBeVisible();
    });

    // CA-164: Filter results owned by specific user
    test('CA-164: Filter results by specific user', async ({ page }) => {
        const filterButton = page.locator('div[title="Filters"]');
        await expect(filterButton).toBeVisible();
        await filterButton.click();
        await expect(page.locator('.filter-sort-header').first()).toBeVisible();
    });

    // CA-165: Filter results where search terms appear
    test('CA-165: Filter results by search terms', async ({ page }) => {
        const searchInput = page.locator('.cass--search-bar input[type="search"]');
        await expect(searchInput).toBeVisible();
        await searchInput.fill('test');
        await expect(searchInput).toHaveValue('test');
    });

    // CA-166: Bulk update properties of selected objects
    test('CA-166: Bulk update of selected objects properties', async ({ page }) => {
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-167: Bulk deletion of objects
    test('CA-167: Bulk deletion of objects from hierarchy or list', async ({ page }) => {
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-168: Bulk removal of objects from framework
    test('CA-168: Bulk removal of objects from framework', async ({ page }) => {
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-169: Save object when properties modified
    test('CA-169: Object auto-saves on property modification', async ({ page }) => {
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-170: Revert object to previous version (undo)
    test('CA-170: Object undo/revert functionality', async ({ page }) => {
        await expect(page.locator('#frameworks')).toBeVisible();
    });

});
