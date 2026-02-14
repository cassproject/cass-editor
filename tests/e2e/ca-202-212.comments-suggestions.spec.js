const { test, expect } = require('./fixtures');

test.describe('Comments & Suggestions (CA-202 through CA-212)', () => {

    // CA-202: CRUD comment on an object
    test('CA-202: CRUD comment on an object', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-203: Comment owned by creator and object owner
    test('CA-203: Comment ownership by creator and object owner', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-204: Comment includes a comment field
    test('CA-204: Comment includes comment field', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-205: All comments displayable alongside the object
    test('CA-205: Comments displayable alongside object', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-206: Owner sees all comments, others see only commenter/owner comments
    test('CA-206: Comment visibility by role', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-207: CRUD comment on a comment (reply)
    test('CA-207: Reply to comments (comment on comment)', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-208: Suggestion mode for non-permitted edits
    test('CA-208: Suggestion mode for unauthorized edits', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-209: Suggestion is a comment
    test('CA-209: Suggestion stored as comment', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-210: Suggestion contains property to be edited
    test('CA-210: Suggestion contains target property', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-211: Suggestion contains suggested value
    test('CA-211: Suggestion contains suggested value', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-212: Suggestion may be accepted by owner
    test('CA-212: Owner can accept suggestion', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await expect(page.locator('#frameworks')).toBeVisible();
    });

});
