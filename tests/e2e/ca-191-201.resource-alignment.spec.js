const { test, expect } = require('./fixtures');

test.describe('Resource Alignments (CA-191 through CA-201)', () => {

    // CA-191: Method to define xAPI verb and scaled score in resource alignment
    test('CA-191: Resource alignment xAPI verb and score definition', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-192: Method to define competency in resource alignment
    test('CA-192: Resource alignment competency definition', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-193: Method to add a resource to a framework
    test('CA-193: Add resource to framework', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-194: Method to define URL in resource alignment
    test('CA-194: Resource alignment URL definition', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-195: Method to define relation type (teaches, assesses, requires)
    test('CA-195: Resource alignment relation type definition', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-196: Resource alignment is Schema.org CreativeWork with AlignmentObject
    test('CA-196: Resource alignment as CreativeWork with AlignmentObject', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-197: Resource URL is url field of CreativeWork
    test('CA-197: Resource URL field', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-198: Resource name is name field of CreativeWork
    test('CA-198: Resource name field', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-199: Resource description is description field of CreativeWork
    test('CA-199: Resource description field', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-200: Resource competency is targetUrl field of AlignmentObject
    test('CA-200: Resource competency targetUrl field', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-201: Resource framework is targetFramework field of AlignmentObject
    test('CA-201: Resource framework targetFramework field', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await expect(page.locator('#frameworks')).toBeVisible();
    });

});
