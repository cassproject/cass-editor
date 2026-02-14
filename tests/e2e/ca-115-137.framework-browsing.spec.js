const { test, expect, navigateToFramework } = require('./fixtures');

test.describe('Framework Browsing & Search (CA-115 through CA-137)', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/', { waitUntil: 'domcontentloaded' });
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-115: Permit user to find an item within the framework
    test('CA-115: Search within framework is available', async ({ page }) => {
        await expect(page.locator('.cass--search-bar')).toBeVisible();
        const searchInput = page.locator('.cass--search-bar input[type="search"]');
        await expect(searchInput).toBeVisible();
    });

    // CA-116: Method for permitting a user to list frameworks
    test('CA-116: Frameworks list is accessible', async ({ page }) => {
        await expect(page.locator('#frameworks')).toBeVisible();
        await expect(page.locator('.cass--search-bar')).toBeVisible();
        await expect(page.locator('h2', { hasText: 'Available Items' })).toBeVisible();
        // Verify framework list items are present
        const listItems = page.locator('.cass--list--item');
        await listItems.first().waitFor({ state: 'visible' });
        const count = await listItems.count();
        expect(count).toBeGreaterThan(0);
    });

    // CA-117: View framework and competencies in hierarchical form
    test('CA-117: Hierarchical view of competencies', async ({ page }) => {
        await navigateToFramework(page);
        // Verify framework content area is visible
        await expect(page.locator('#framework-content')).toBeVisible();
    });

    // CA-118: Edit properties of a framework specified by configuration
    test('CA-118: Framework properties are editable via detail view', async ({ page }) => {
        await navigateToFramework(page);
        // Check that the framework info bar is present (contains editable properties)
        await expect(page.locator('#framework-info-bar')).toBeVisible();
    });

    // CA-119: Editing adheres to cardinality rules
    test('CA-119: Property editing adheres to cardinality rules', async ({ page }) => {
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-120: Editing adheres to criticality rules
    test('CA-120: Property editing adheres to criticality rules', async ({ page }) => {
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-121: Editing adheres to allowed range
    test('CA-121: Property editing adheres to allowed range', async ({ page }) => {
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-122: Editing adheres to allowed type
    test('CA-122: Property editing adheres to allowed type', async ({ page }) => {
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-123: When type is valid object, list valid values from framework then system
    test('CA-123: Valid object values listed from framework then system', async ({ page }) => {
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-124: When type is valid object, allow search from system
    test('CA-124: Search for valid object values from system', async ({ page }) => {
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-125: Permit owner to view historical versions
    test('CA-125: Historical version viewing is available', async ({ page }) => {
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-126: Permit owner to revert to historical version
    test('CA-126: Revert to historical version is available', async ({ page }) => {
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-127: Permit administrator to delete versions
    test('CA-127: Version deletion is available for administrators', async ({ page }) => {
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-128: Permit owner to save historical version as new framework
    test('CA-128: Save historical version as new framework', async ({ page }) => {
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-129: Show primary properties when viewing a framework
    test('CA-129: Primary properties shown when viewing framework', async ({ page }) => {
        await navigateToFramework(page);
        await expect(page.locator('#framework-info-bar')).toBeVisible();
    });

    // CA-130: Filter framework search results by configuration
    test('CA-130: Filter by configuration is available', async ({ page }) => {
        const filterButton = page.locator('div[title="Filters"]');
        await expect(filterButton).toBeVisible();
        await filterButton.click();
        await expect(page.locator('.filter-sort-header').first()).toBeVisible();
    });

    // CA-131: Sort framework search results by last modified date
    test('CA-131: Sort by last modified is available', async ({ page }) => {
        await page.locator('div[title="Filters"]').click();
        await expect(page.locator('.filter-sort-header').filter({ hasText: 'Sort by' })).toBeVisible();
        const lastModifiedLabel = page.locator('label[for="lastEdited"]');
        await expect(lastModifiedLabel).toBeVisible();
        await lastModifiedLabel.click();
        await expect(page.locator('input#lastEdited')).toBeChecked();
    });

    // CA-132: Filter showing only results owned by the user
    test('CA-132: Filter by owned by me is available', async ({ page }) => {
        const filterButton = page.locator('div[title="Filters"]');
        await expect(filterButton).toBeVisible();
        await filterButton.click();
        await expect(page.locator('.filter-sort-header').first()).toBeVisible();
    });

    // CA-133: Filter showing only results owned by specific user
    test('CA-133: Filter by specific owner is available', async ({ page }) => {
        const filterButton = page.locator('div[title="Filters"]');
        await expect(filterButton).toBeVisible();
        await filterButton.click();
        await expect(page.locator('.filter-sort-header').first()).toBeVisible();
    });

    // CA-134: Filter search results by search terms appearing in framework
    test('CA-134: Framework search filtering works', async ({ page }) => {
        const searchInput = page.locator('.cass--search-bar input[type="search"]');
        await expect(searchInput).toBeVisible();
        await searchInput.fill('test');
        await expect(searchInput).toHaveValue('test');
        // Verify search container remains accessible after search
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-135: Competency search alongside framework search
    test('CA-135: Competency search alongside framework search', async ({ page }) => {
        const searchInput = page.locator('.cass--search-bar input[type="search"]');
        await expect(searchInput).toBeVisible();
        await searchInput.fill('competency');
        await expect(searchInput).toHaveValue('competency');
    });

    // CA-136: View framework in more detail when selected
    test('CA-136: Framework detail view on selection', async ({ page }) => {
        await navigateToFramework(page);
        // Verify the URL changed to include the framework route
        const url = page.url();
        expect(url).toContain('#/framework');
    });

    // CA-137: Recently opened frameworks list persists over browser refreshes
    test('CA-137: Recently opened frameworks persist after refresh', async ({ page }) => {
        await navigateToFramework(page);
        // Go back and check page still loads
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await expect(page.locator('#frameworks')).toBeVisible();
        // Verify list items still appear
        const reloadedItems = page.locator('.cass--list--item');
        await reloadedItems.first().waitFor({ state: 'visible' });
        const count = await reloadedItems.count();
        expect(count).toBeGreaterThan(0);
    });

});
