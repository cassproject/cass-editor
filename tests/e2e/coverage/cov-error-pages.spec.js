/**
 * Coverage tests for error page components:
 * - Forbidden.vue (/403)
 * - InternalError.vue (/500)
 * - NotFound.vue (unmatched routes)
 *
 * These pages are small but at 0% coverage.
 */

const { test, expect } = require('../fixtures');

test.describe('Error Pages Coverage', () => {

    test('Forbidden page loads and renders correctly', async ({ page }) => {
        await page.goto('/#/403?server=http://localhost/api/');
        await page.waitForLoadState('domcontentloaded');
        // Verify the Forbidden page renders
        const errorDiv = page.locator('#internal-error');
        await expect(errorDiv).toBeVisible();
        // Verify title
        await expect(page.locator('text=Forbidden')).toBeVisible();
        // Verify message
        await expect(page.locator('text=You do not have permission to perform this operation')).toBeVisible();
        // Verify return home button
        const returnHomeBtn = page.locator('#internal-error-return-home-button');
        await expect(returnHomeBtn).toBeVisible();
        // Exercise the Forbidden Vue component computed properties
        const computedProps = await page.evaluate(() => {
            const el = document.querySelector('#internal-error');
            if (el && el.__vue__) {
                return {
                    name: el.__vue__.$options.name,
                    queryParams: el.__vue__.queryParams
                };
            }
            return null;
        });
        expect(computedProps).toBeTruthy();
        expect(computedProps.name).toBe('Forbidden');
    });

    test('InternalError page loads and renders correctly', async ({ page }) => {
        await page.goto('/#/500?server=http://localhost/api/');
        await page.waitForLoadState('domcontentloaded');
        // Verify the InternalError page renders
        const errorDiv = page.locator('#internal-error');
        await expect(errorDiv).toBeVisible();
        // Verify title
        await expect(page.locator('text=Internal Error')).toBeVisible();
        // Verify message
        await expect(page.locator('text=The CaSS server is not responding properly')).toBeVisible();
        // Verify return home button
        const returnHomeBtn = page.locator('#internal-error-return-home-button');
        await expect(returnHomeBtn).toBeVisible();
        // Exercise the InternalError Vue component computed properties
        const computedProps = await page.evaluate(() => {
            const el = document.querySelector('#internal-error');
            if (el && el.__vue__) {
                return {
                    name: el.__vue__.$options.name,
                    queryParams: el.__vue__.queryParams
                };
            }
            return null;
        });
        expect(computedProps).toBeTruthy();
        expect(computedProps.name).toBe('InternalError');
    });

    test('Return home button on Forbidden navigates to frameworks', async ({ page }) => {
        await page.goto('/#/403?server=http://localhost/api/');
        await page.waitForLoadState('domcontentloaded');
        const returnHomeBtn = page.locator('#internal-error-return-home-button');
        await expect(returnHomeBtn).toBeVisible();
        await returnHomeBtn.click();
        await page.waitForURL(/#\/frameworks/);
    });

    test('Return home button on InternalError navigates to frameworks', async ({ page }) => {
        await page.goto('/#/500?server=http://localhost/api/');
        await page.waitForLoadState('domcontentloaded');
        const returnHomeBtn = page.locator('#internal-error-return-home-button');
        await expect(returnHomeBtn).toBeVisible();
        await returnHomeBtn.click();
        await page.waitForURL(/#\/frameworks/);
    });
});
