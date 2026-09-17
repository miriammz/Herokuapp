import { test, expect } from './fixtures/herokuapp-test';
import { MultipleWindowsPage } from './pages/multipleWindowsPage';

async function goToSection(multipleWindowsPAge: MultipleWindowsPage) {
    await multipleWindowsPAge.link.click();
    await expect(multipleWindowsPAge.page).toHaveURL(/windows/);
}

test.describe('Herokuapp Multiple Windows', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('go to multiple windows', async({multipleWindowsPage}) => {
        await goToSection(multipleWindowsPage);
        await expect(multipleWindowsPage.title).toBeVisible();
        await expect(multipleWindowsPage.title).toHaveText('Opening a new window');
        await expect(multipleWindowsPage.windowLink).toBeVisible();
        await expect(multipleWindowsPage.windowLink).toHaveText('Click Here');
    });

    test('open a new window', async({multipleWindowsPage}) => {
        await goToSection(multipleWindowsPage);
        const newWindowPromise =  multipleWindowsPage.page.waitForEvent('popup');
        await multipleWindowsPage.windowLink.click();
        const newWindow = await newWindowPromise;
        await expect(newWindow).toHaveURL(/new/);
        await expect(newWindow.getByRole('heading', { name: 'New Window' })).toBeVisible();
        await expect(newWindow.getByRole('heading', { name: 'New Window' })).toHaveText('New Window');
    });
});