const { test, expect } = require('./fixtures');

// CA-223: Allow an individual to create a user
    test('CA-223: Create account page is accessible', async ({ page }) => {
        await page.goto('/#/createAccount?server=http://localhost/api/');
        await expect(page.locator('h3.modal-card-title', { hasText: 'Create CaSS Account' })).toBeVisible();
        await expect(page.locator('.control:has(label:has-text("first name")) input')).toBeVisible();
        await expect(page.locator('.control:has(label:has-text("last name")) input')).toBeVisible();
        await expect(page.locator('.control:has(label:has-text("email")) input')).toBeVisible();
        await expect(page.locator('.control:has(label:has-text("username")) input')).toBeVisible();
        await expect(page.locator('.button', { hasText: 'create' })).toBeVisible();
        await expect(page.locator('.button', { hasText: 'cancel' })).toBeVisible();
    });
