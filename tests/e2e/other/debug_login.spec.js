const { test, expect } = require('@playwright/test');

test('Debug Login Page', async ({ page }) => {
    console.log('Navigating to legacy login...');
    await page.goto('/legacyLogin?server=http://localhost/api/');

    // Wait for a moment to let things settle
    await page.waitForTimeout(2000);

    // Force apiLoginEnabled to false to show the Create Account button
    try {
        await page.evaluate(() => {
            if (window.app && window.app.$store) {
                console.log('Forcing apiLoginEnabled to false');
                window.app.$store.commit('featuresEnabled/apiLoginEnabled', false);
            } else {
                console.log('window.app or store not found');
            }
        });
    } catch (e) {
        console.log('Error evaluating page script:', e);
    }

    await page.waitForTimeout(3000);

    const spinnerVisible = await page.isVisible('.fa-spinner');
    const createButtonVisible = await page.isVisible('#legacy-login-create-account-button');
    const returnToStandardVisible = await page.isVisible('#legacy-login-return-to-standard-login');
    const loginBusyClass = await page.evaluate(() => {
        const modal = document.querySelector('.modal');
        return modal ? modal.classList.contains('is-active') : 'modal not found';
    });

    console.log(`Spinner Visible: ${spinnerVisible}`);
    console.log(`Create Button Visible: ${createButtonVisible}`);
    console.log(`Return to Standard Login Visible: ${returnToStandardVisible}`);
    console.log(`Modal Active Class: ${loginBusyClass}`);

    if (!createButtonVisible) {
        console.log('Dumping page content:');
        const content = await page.content();
        console.log(content);
    }
});
